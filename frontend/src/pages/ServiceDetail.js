import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loadRazorpayScript } from '../utils/loadRazorpay';
import { createPaymentOrder, verifyPayment, createRequest } from '../api';

function ServiceDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  async function handlePayment() {
    setLoading(true);
    setError('');

    // step 1 — load razorpay script
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setError('Failed to load payment gateway. Check your internet connection.');
      setLoading(false);
      return;
    }

    // step 2 — create order on backend
    let orderData;
    try {
      orderData = await createPaymentOrder(service.price);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    // step 3 — open razorpay popup
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'CareEase',
      description: service.serviceName,
      order_id: orderData.orderId,

      handler: async function (response) {
        // step 4 — verify payment on backend
        try {
          await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            serviceName: service.serviceName,
            description: service.description,
            price: service.price,
          });
          navigate('/my-requests');
        } catch (err) {
          setError('Payment verification failed. Please contact support.');
          setLoading(false);
        }
      },

      prefill: {
        name: localStorage.getItem('userName') || '',
      },

      theme: {
        color: '#4A90D9',
      },

      modal: {
        ondismiss: function () {
          setLoading(false);
        },
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  }
  async function handlePayLater() {
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
            🔒 Secure payment via UPI, Card, or Net Banking — powered by Razorpay
          </p>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button
          style={styles.confirmButton}
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? 'Processing...' : `Pay Now ₹${service.price}`}
        </button>

        <button
          style={styles.payLaterButton}
          onClick={handlePayLater}
          disabled={loading}
        >
          Request & Pay After Service
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
    backgroundColor: '#ebf4ff',
    borderRadius: '8px',
    padding: '12px 16px',
    width: '100%',
  },
  noteText: {
    fontSize: '13px',
    color: '#2b6cb0',
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
    textAlign: 'center',
  },
  center: {
    textAlign: 'center',
    marginTop: '100px',
  },
  payLaterButton: {
  backgroundColor: '#ffffff',
  color: '#4A90D9',
  border: '2px solid #4A90D9',
  borderRadius: '8px',
  padding: '14px',
  fontSize: '15px',
  fontWeight: '600',
  cursor: 'pointer',
  width: '100%',
},
};

export default ServiceDetail;