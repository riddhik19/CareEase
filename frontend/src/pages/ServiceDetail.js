import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createRequest } from '../api';

function ServiceDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // guard — if someone navigates here directly without a service
  if (!state || !state.service) {
    return (
      <div style={styles.center}>
        <p>No service selected.</p>
        <button onClick={() => navigate('/dashboard')} style={styles.backButton}>
          Go to Dashboard
        </button>
      </div>
    );
  }

  const { service } = state;

  async function handleConfirm() {
    setLoading(true);
    setError('');

    try {
      await createRequest({
        serviceName: service.serviceName,
        description: service.description,
        price: service.price,
      });
      navigate('/my-requests');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <div style={styles.iconWrapper}>
          <span style={styles.icon}>{service.icon}</span>
        </div>

        <h1 style={styles.serviceName}>{service.serviceName}</h1>
        <p style={styles.description}>{service.description}</p>

        <div style={styles.divider} />

        <div style={styles.priceSection}>
          <p style={styles.priceLabel}>Service Fee</p>
          <p style={styles.price}>₹{service.price}</p>
        </div>

        <div style={styles.noteBox}>
          <p style={styles.noteText}>
            💡 Payment is collected after the service is completed. 
            You will receive a confirmation email once your request is submitted.
          </p>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button
          style={styles.confirmButton}
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Confirm & Request ✓'}
        </button>

        <button
          style={styles.backButton}
          onClick={() => navigate('/dashboard')}
        >
          ← Back to Dashboard
        </button>

      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '40px',
    width: '100%',
    maxWidth: '480px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  iconWrapper: {
    backgroundColor: '#ebf4ff',
    borderRadius: '50%',
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: '40px',
  },
  serviceName: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#2d3748',
    margin: 0,
    textAlign: 'center',
  },
  description: {
    fontSize: '15px',
    color: '#718096',
    textAlign: 'center',
    margin: 0,
  },
  divider: {
    width: '100%',
    height: '1px',
    backgroundColor: '#e2e8f0',
  },
  priceSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f7fafc',
    borderRadius: '8px',
    padding: '16px 20px',
  },
  priceLabel: {
    fontSize: '15px',
    color: '#4a5568',
    margin: 0,
    fontWeight: '600',
  },
  price: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#4A90D9',
    margin: 0,
  },
  noteBox: {
    backgroundColor: '#fffbeb',
    borderRadius: '8px',
    padding: '12px 16px',
    width: '100%',
  },
  noteText: {
    fontSize: '13px',
    color: '#744210',
    margin: 0,
    lineHeight: '1.5',
  },
  confirmButton: {
    backgroundColor: '#4A90D9',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '14px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
  },
  backButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#4A90D9',
    fontSize: '14px',
    cursor: 'pointer',
    padding: 0,
  },
  error: {
    color: '#e53e3e',
    fontSize: '13px',
    margin: 0,
  },
  center: {
    textAlign: 'center',
    marginTop: '100px',
  },
};

export default ServiceDetail;