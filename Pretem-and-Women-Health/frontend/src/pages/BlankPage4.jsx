// src/pages/BlankPage4.jsx
import React, { useState } from 'react';

function BlankPage4() {
  const [formData, setFormData] = useState({
    age_group: '0',
    race: '0',
    tobacco: '0',
    prenatal: '0',
    births: '0',
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock logic: pretend to "predict" based on input
      const sum = Object.values(formData).reduce((acc, val) => acc + parseInt(val), 0);
      const riskLevel = sum > 5 ? "High Risk" : "Low Risk";
      const accuracy = Math.random() * 0.2 + 0.8; // 80% to 100%

      setResult({
        prediction: riskLevel,
        accuracy: accuracy.toFixed(2),
      });
    } catch (err) {
      console.error(err);
      setError('Failed to process prediction.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg,#1c598f,#437aaa,#be8ea0,#982f56)'
    }}>
      <div style={{
        flex: 1,
        paddingTop: '500px',
        paddingBottom: '10px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          background: '#fff',
          padding: '40px 30px',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          maxWidth: '700px',
          width: '100%',
          color: '#000'
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#1c598f' }}>
            Preterm Risk Assessment
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Age Group */}
            <div style={{ marginBottom: '20px' }}>
              <label><strong>Age Group:</strong></label><br />
              {['Under 20', '20-34', '35 and above'].map((label, idx) => (
                <label key={idx}>
                  <input
                    type="radio"
                    name="age_group"
                    value={idx}
                    checked={formData.age_group === `${idx}`}
                    onChange={handleChange}
                  /> {label}
                  <br />
                </label>
              ))}
            </div>

            {/* Race/Ethnicity */}
            <div style={{ marginBottom: '20px' }}>
              <label><strong>Race/Ethnicity:</strong></label><br />
              {['White', 'Black', 'Hispanic'].map((label, idx) => (
                <label key={idx}>
                  <input
                    type="radio"
                    name="race"
                    value={idx}
                    checked={formData.race === `${idx}`}
                    onChange={handleChange}
                  /> {label}
                  <br />
                </label>
              ))}
            </div>

            {/* Tobacco Use */}
            <div style={{ marginBottom: '20px' }}>
              <label><strong>Tobacco Use During Pregnancy:</strong></label><br />
              {['No', 'Yes'].map((label, idx) => (
                <label key={idx}>
                  <input
                    type="radio"
                    name="tobacco"
                    value={idx}
                    checked={formData.tobacco === `${idx}`}
                    onChange={handleChange}
                  /> {label}
                  <br />
                </label>
              ))}
            </div>

            {/* Prenatal Care */}
            <div style={{ marginBottom: '20px' }}>
              <label><strong>Adequate Prenatal Care:</strong></label><br />
              {['No', 'Yes'].map((label, idx) => (
                <label key={idx}>
                  <input
                    type="radio"
                    name="prenatal"
                    value={idx}
                    checked={formData.prenatal === `${idx}`}
                    onChange={handleChange}
                  /> {label}
                  <br />
                </label>
              ))}
            </div>

            {/* Previous Births */}
            <div style={{ marginBottom: '20px' }}>
              <label><strong>Previous Births:</strong></label><br />
              {['None', 'One', 'Two', 'Three or More'].map((label, idx) => (
                <label key={idx}>
                  <input
                    type="radio"
                    name="births"
                    value={idx}
                    checked={formData.births === `${idx}`}
                    onChange={handleChange}
                  /> {label}
                  <br />
                </label>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: '20px',
                padding: '10px 25px',
                backgroundColor: '#437aaa',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Submitting…' : 'Submit'}
            </button>
          </form>

          {error && (
            <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
              {error}
            </p>
          )}
          {result && (
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <h3>Prediction Result</h3>
              <p><strong>Prediction:</strong> {result.prediction}</p>
              <p><strong>Accuracy:</strong> {result.accuracy}</p>
            </div>
          )}
        </div>
      </div>

      <footer className="site-footer" style={{
        backgroundColor: '#39536e',
        color: '#ffffff',
        textAlign: 'center',
        padding: '20px 0'
      }}>
        <p>&copy; {new Date().getFullYear()} Preterm and Women Health. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default BlankPage4;
