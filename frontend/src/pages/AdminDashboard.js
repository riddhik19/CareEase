import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllRequests, updateRequestStatus } from '../api';

function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAll() {
      try {
        const data = await getAllRequests();
        setRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  async function handleStatusUpdate(id, newStatus) {
    try {
      const updated = await updateRequestStatus(id, newStatus);
      setRequests(requests.map(r => r._id === id ? updated : r));
    } catch (err) {
      alert(err.message);
    }
  }

  function getNextStatus(current) {
    if (current === 'Pending') return 'Accepted';
    if (current === 'Accepted') return 'Completed';
    return null;
  }

  function getBadgeColor(status) {
    if (status === 'Pending') return '#f6ad55';
    if (status === 'Accepted') return '#68d391';
    if (status === 'Completed') return '#76e4f7';
    return '#cbd5e0';
  }

  if (loading) return <p style={styles.center}>Loading...</p>;
  if (error) return <p style={styles.center}>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Admin Dashboard 🛠️</h1>
      <p style={styles.subtext}>Total requests: {requests.length}</p>

      {requests.length === 0 ? (
        <p style={styles.center}>No requests yet.</p>
      ) : (
        <div style={styles.list}>
          {requests.map((request) => (
            <div key={request._id} style={styles.card}>
              <div style={styles.cardTop}>
                <div>
                  <h3 style={styles.serviceName}>{request.serviceName}</h3>
                  <p style={styles.meta}>
                    By {request.userName} · {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                </div>
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

              <div style={styles.cardBottom}>
                <p style={styles.price}>
                  ₹{request.price} — {request.paymentStatus}
                </p>

                {getNextStatus(request.status) && (
                  <button
                    style={styles.updateButton}
                    onClick={() => handleStatusUpdate(request._id, getNextStatus(request.status))}
                  >
                    Mark as {getNextStatus(request.status)}
                  </button>
                )}

                {request.status === 'Completed' && (
                  <span style={styles.completedText}>✅ Completed</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
    padding: '40px 20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '28px',
    color: '#2d3748',
    marginBottom: '8px',
  },
  subtext: {
    color: '#718096',
    fontSize: '14px',
    marginBottom: '32px',
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
    alignItems: 'flex-start',
    marginBottom: '8px',
  },
  serviceName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2d3748',
    margin: 0,
  },
  meta: {
    fontSize: '12px',
    color: '#a0aec0',
    margin: '4px 0 0 0',
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
    margin: '4px 0 12px 0',
  },
  cardBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '12px',
  },
  price: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#4A90D9',
    margin: 0,
  },
  updateButton: {
    backgroundColor: '#4A90D9',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  completedText: {
    fontSize: '13px',
    color: '#38a169',
    fontWeight: '600',
  },
  center: {
    textAlign: 'center',
    color: '#718096',
    marginTop: '60px',
  },
};

export default AdminDashboard;