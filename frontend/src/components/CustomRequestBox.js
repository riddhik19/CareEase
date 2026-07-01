import { useState } from 'react';
import { createRequest } from '../api';

function CustomRequestBox() {
  const userName = localStorage.getItem('userName') || 'Guest';
  const [customText, setCustomText] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit() {
    if (!customText.trim()) {
      setMessage('❌ Please describe what you need help with.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await createRequest({
        serviceName: 'Custom Request',
        description: customText,
      });

      setMessage('✅ Your custom request was submitted!');
      setCustomText('');
    } catch (error) {
      setMessage(`❌ Failed to submit: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Need something else? 🙋</h2>
      <p style={styles.subtext}>Type any task you need help with</p>
      <textarea
        style={styles.textarea}
        placeholder="e.g. I need someone to water my plants"
        value={customText}
        onChange={(e) => setCustomText(e.target.value)}
        rows={4}
      />
      {message && <p style={styles.message}>{message}</p>}
      <button
        style={styles.button}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Request'}
      </button>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '32px',
    maxWidth: '600px',
    margin: '40px auto 0 auto',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  heading: {
    fontSize: '20px',
    color: '#2d3748',
    margin: 0,
  },
  subtext: {
    color: '#718096',
    fontSize: '14px',
    margin: 0,
  },
  textarea: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e0',
    fontSize: '14px',
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  button: {
    backgroundColor: '#4A90D9',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '15px',
    cursor: 'pointer',
  },
  message: {
    fontSize: '14px',
    color: '#2d3748',
    margin: 0,
  },
};

export default CustomRequestBox;