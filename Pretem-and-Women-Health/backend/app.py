from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import traceback
import os

app = Flask(__name__)
CORS(app)

# Get the absolute path to the current directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load SVM model, encoders, and scaler
try:
    svm_model = joblib.load(os.path.join(BASE_DIR, "svm_model.joblib"))
    print("[OK] Loaded svm_model.joblib")
    svm_encoders = joblib.load(os.path.join(BASE_DIR, "svm_encoders.joblib"))
    print("[OK] Loaded svm_encoders.joblib")
    svm_scaler = joblib.load(os.path.join(BASE_DIR, "svm_scaler.joblib"))
    print("[OK] Loaded svm_scaler.joblib")
except Exception as e:
    print("Error loading SVM model, encoders, or scaler:", e)
    svm_model = svm_encoders = svm_scaler = None

# Load KNN model, encoders, and scaler
try:
    knn_model = joblib.load(os.path.join(BASE_DIR, "knn_model.joblib"))
    print("[OK] Loaded knn_model.joblib")
    knn_encoders = joblib.load(os.path.join(BASE_DIR, "knn_encoders.joblib"))
    print("[OK] Loaded knn_encoders.joblib")
    knn_scaler = joblib.load(os.path.join(BASE_DIR, "knn_scaler.joblib"))
    print("[OK] Loaded knn_scaler.joblib")
except Exception as e:
    print("Error loading KNN model, encoders, or scaler:", e)
    knn_model = knn_encoders = knn_scaler = None

# Helper to process input
def preprocess_input(data, encoders):
    df = pd.DataFrame([data])

    df["previous_births"] = df["previous_births"].replace({
        "None": 0,
        "One": 1,
        "Two": 2,
        "Three or More": 3,
        "One, Two, Three or More": 3
    }).fillna(0).astype(int)

    categorical_columns = ["age_group", "reported_race_ethnicity", "tobacco_use_during_pregnancy", "adequate_prenatal_care"]
    for col in categorical_columns:
        if col in df.columns and col in encoders:
            df[col] = encoders[col].transform([df[col].values[0]])

    return df

@app.route("/predict", methods=["POST"])
def predict():
    try:
        input_data = request.json
        model_type = input_data.get("model", "svm")  # 'svm' or 'knn'
        features = input_data.get("features")

        if not features:
            return jsonify({"error": "Missing input features."}), 400

        if model_type == "svm":
            if svm_model is None or svm_encoders is None or svm_scaler is None:
                return jsonify({"error": "SVM model or scaler not loaded."}), 500

            df = preprocess_input(features, svm_encoders)
            scaled = svm_scaler.transform(df)
            prediction = svm_model.predict(scaled)[0]
            return jsonify({"model": "svm", "prediction": int(prediction)})

        elif model_type == "knn":
            if knn_model is None or knn_encoders is None or knn_scaler is None:
                return jsonify({"error": "KNN model or scaler not loaded."}), 500

            df = preprocess_input(features, knn_encoders)
            scaled = knn_scaler.transform(df)
            prediction = knn_model.predict(scaled)[0]
            return jsonify({"model": "knn", "prediction": int(prediction)})

        else:
            return jsonify({"error": "Invalid model type."}), 400

    except Exception as e:
        return jsonify({"error": str(e), "trace": traceback.format_exc()}), 500

if __name__ == "__main__":
    app.run(debug=True)
