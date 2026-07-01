import { useState, useEffect } from 'react';
import { getRequests } from '../api';
import { useNavigate } from 'react-router-dom';

function MyRequests() {
  const userName = localStorage.getItem('userName') || '';
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    async function fetchRequests() {
      try {
        const data = await getRequests();
        setRequests(data);
      } catch (err) {
        setError('Failed to load requests.');
      } finally {
        setLoading(false);
      }
    }
    fetchRequests();
    
  }, []);

  if (!userName || !userName.trim()) {
  return (
        <div style={styles.center}>
        <p>Please enter your name on the dashboard first.</p>
        <button onClick={() => navigate('/dashboard')}>
            Go to Dashboard
        </button>
        </div>
    );
    }

  if (loading) {
    return <p style={styles.center}>Loading your requests...</p>;
  }

  if (error) {
    return <p style={styles.center}>{error}</p>;
  }

  const userRequests = requests.filter(
    (request) => request.userName === userName
    );

    

  return (
    <div style={styles.container}>
    
      <h1 style={styles.heading}>My Requests 📋</h1>

      {userRequests.length === 0 ? (
        <p style={styles.center}>You haven't made any requests yet.</p>
      ) : (
        <div style={styles.list}>
          {userRequests.map((request) => (
            <div key={request._id} style={styles.card}>
              <div style={styles.cardTop}>
                <h3 style={styles.serviceName}>{request.serviceName}</h3>
                <span style={{
                  ...styles.badge,
                  backgroundColor: getBadgeColor(request.status),
                }}>
                  {request.status}
                </span>
              </div>
              {request.description ? (
                <p style={styles.description}>{request.description}</p>
              ) : null}
              <p style={styles.meta}>
                By {request.userName || 'Guest'} · {new Date(request.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function getBadgeColor(status) {
  if (status === 'Pending') return '#f6ad55';
  if (status === 'Accepted') return '#68d391';
  if (status === 'Completed') return '#76e4f7';
  return '#cbd5e0';
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
    padding: '40px 20px',
    maxWidth: '700px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '26px',
    color: '#2d3748',
    marginBottom: '24px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px 24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  serviceName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2d3748',
    margin: 0,
  },
  badge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#2d3748',
  },
  description: {
    fontSize: '14px',
    color: '#718096',
    margin: '4px 0 8px 0',
  },
  meta: {
    fontSize: '12px',
    color: '#a0aec0',
    margin: 0,
  },
  backButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#4A90D9',
    fontSize: '15px',
    cursor: 'pointer',
    marginBottom: '20px',
    padding: 0,
  },
  center: {
    textAlign: 'center',
    color: '#718096',
    marginTop: '60px',
  },
};

export default MyRequests;