function ServiceCard({ serviceName, description, icon, onRequest, loading }) {
  return (
    <div style={styles.card}>
      <div style={styles.icon}>{icon}</div>
      <h3 style={styles.title}>{serviceName}</h3>
      <p style={styles.description}>{description}</p>
      <button style={styles.button} onClick={onRequest} disabled={loading}>
        {loading ? 'Submitting...' : 'Request Service'}
        </button>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    width: '220px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  icon: {
    fontSize: '40px',
  },
  title: {
    fontSize: '16px',
    fontWeight: '600',
    textAlign: 'center',
    margin: 0,
  },
  description: {
    fontSize: '13px',
    color: '#666',
    textAlign: 'center',
    margin: 0,
  },
  button: {
    backgroundColor: '#4A90D9',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 16px',
    cursor: 'pointer',
    fontSize: '13px',
    width: '100%',
  },
};

export default ServiceCard;