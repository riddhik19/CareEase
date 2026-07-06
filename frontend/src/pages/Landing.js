import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>CareEase 🤝</h1>
        <p style={styles.subtitle}>
          Helping elderly people get assistance with everyday tasks — groceries, medicines, chores, and more.
        </p>
        <button style={styles.button} onClick={() => navigate('/register')}>
          Get Started
        </button>
      </div>

      <div style={styles.featuresSection}>
        <h2 style={styles.featuresHeading}>What We Offer</h2>
        <div style={styles.featuresGrid}>
          {features.map((feature) => (
            <div key={feature.id} style={styles.featureCard}>
              <span style={styles.featureIcon}>{feature.icon}</span>
              <h3 style={styles.featureName}>{feature.name}</h3>
              <p style={styles.featureDesc}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={styles.contactBar}>
      <a
        href="https://wa.me/917721066484"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.contactButton}
      >
        💬 WhatsApp Us
      </a>

      <a
        href="tel:+917721066484"
        style={styles.contactButton}
      >
        📞 Call Us
      </a>
    </div>
    </div>
  );
}

const features = [
  { id: 1, icon: '🛒', name: 'Grocery Shopping', description: 'Fresh groceries delivered to your door' },
  { id: 2, icon: '💊', name: 'Medicine Pickup', description: 'Never miss your prescriptions again' },
  { id: 3, icon: '🧹', name: 'Household Chores', description: 'Help keeping your home clean and tidy' },
  { id: 4, icon: '🍱', name: 'Meal Delivery', description: 'Fresh, healthy meals delivered daily' },
];

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
  },
  hero: {
    backgroundColor: '#4A90D9',
    padding: '80px 20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '48px',
    color: '#ffffff',
    margin: '0 0 16px 0',
  },
  subtitle: {
    fontSize: '18px',
    color: '#e2e8f0',
    maxWidth: '500px',
    margin: '0 auto 32px auto',
    lineHeight: '1.6',
  },
  button: {
    backgroundColor: '#ffffff',
    color: '#4A90D9',
    border: 'none',
    borderRadius: '8px',
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  featuresSection: {
    padding: '60px 20px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  featuresHeading: {
    textAlign: 'center',
    fontSize: '24px',
    color: '#2d3748',
    marginBottom: '32px',
  },
  featuresGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    justifyContent: 'center',
  },
  featureCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    width: '180px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  featureIcon: {
    fontSize: '36px',
  },
  featureName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#2d3748',
    margin: '8px 0 4px 0',
  },
  featureDesc: {
    fontSize: '12px',
    color: '#718096',
    margin: 0,
  },
  contactBar: {
  display: 'flex',
  justifyContent: 'center',
  gap: '16px',
  marginTop: '24px',
},
contactButton: {
  backgroundColor: '#ffffff',
  border: '1px solid #cbd5e0',
  borderRadius: '8px',
  padding: '10px 20px',
  fontSize: '14px',
  fontWeight: '600',
  color: '#2d3748',
  textDecoration: 'none',
  boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
},
};

export default Landing;