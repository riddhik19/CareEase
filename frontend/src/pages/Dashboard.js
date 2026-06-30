import { useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import { createRequest } from '../api';

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
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    async function handleRequest(service) {
  setLoading(true);
  setMessage('');

  try {
    await createRequest({
      serviceName: service.serviceName,
      description: service.description,
      userName: 'Riddhi',
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
      {message && (
        <p style={styles.message}>{message}</p>
        )}
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
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
    padding: '40px 20px',
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
};

export default Dashboard;