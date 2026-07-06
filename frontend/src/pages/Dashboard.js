import { useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import { createRequest } from '../api';
import CustomRequestBox from '../components/CustomRequestBox';

const services = [
  { id: 1, serviceName: 'Grocery Shopping', description: 'Get groceries delivered to your door', icon: '🛒' },
  { id: 2, serviceName: 'Medicine Pickup', description: 'We collect your prescriptions for you', icon: '💊' },
  { id: 3, serviceName: 'Household Chores', description: 'Help with cleaning and tidying up', icon: '🧹' },
  { id: 4, serviceName: 'Dog Walking', description: 'Daily walks for your furry friend', icon: '🐕' },
  { id: 5, serviceName: 'Hospital Visit', description: 'Assistance for medical appointments', icon: '🏥' },
  { id: 6, serviceName: 'Bill Payments', description: 'Help managing and paying your bills', icon: '💳' },
  { id: 7, serviceName: 'Meal Delivery', description: 'Fresh meals delivered to you', icon: '🍱' },
];

function Dashboard() {
  const userName = localStorage.getItem('userName') || 'User';
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    
    async function handleRequest(service) {
  setLoading(true);
  setMessage('');

  try {
    await createRequest({
      serviceName: service.serviceName,
      description: service.description,
    });

    setMessage(`✅ "${service.serviceName}" request submitted successfully!`);
  } catch (error) {
    setMessage(`Failed to submit request: ${error.message}`);
  } finally {
    setLoading(false);
  }
}

  return (
  <div style={styles.container}>
    <h1 style={styles.heading}>Welcome to CareEase 👋</h1>
    <p style={styles.subheading}>What can we help you with today?</p>

    {message && <p style={styles.message}>{message}</p>}

    <div style={styles.grid}>
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          serviceName={service.serviceName}
          description={service.description}
          icon={service.icon}
          onRequest={() => handleRequest(service)}
          loading={loading}
        />
      ))}
    </div>

    <CustomRequestBox />

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

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
    padding: '32px 20px',
    },
  heading: {
    textAlign: 'center',
    fontSize: '28px',
    color: '#2d3748',
  },
  subheading: {
    textAlign: 'center',
    color: '#718096',
    marginBottom: '40px',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    justifyContent: 'center',
  },
  message: {
  textAlign: 'center',
  fontSize: '15px',
  color: '#2d3748',
  backgroundColor: '#e2e8f0',
  padding: '10px 20px',
  borderRadius: '8px',
  marginBottom: '20px',
    },
    input: {
    display: 'block',
    margin: '0 auto 24px auto',
    padding: '10px 16px',
    fontSize: '15px',
    borderRadius: '8px',
    border: '1px solid #cbd5e0',
    width: '260px',
    },
    navButton: {
    display: 'block',
    margin: '0 auto 24px auto',
    backgroundColor: 'transparent',
    border: '2px solid #4A90D9',
    color: '#4A90D9',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '14px',
    cursor: 'pointer',
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

export default Dashboard;