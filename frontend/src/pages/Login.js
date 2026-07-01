import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email || !password) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await loginUser({ email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('userName', data.user.name);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Welcome Back 👋</h2>
        <p style={styles.subtext}>Login to your CareEase account</p>

        {error && <p style={styles.error}>{error}</p>}

        <input
          style={styles.input}
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={styles.button}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p style={styles.switchText}>
          Don't have an account?{' '}
          <span style={styles.link} onClick={() => navigate('/register')}>
            Register
          </span>
        </p>
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
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  heading: {
    fontSize: '24px',
    color: '#2d3748',
    margin: 0,
    textAlign: 'center',
  },
  subtext: {
    color: '#718096',
    fontSize: '14px',
    margin: 0,
    textAlign: 'center',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e0',
    fontSize: '14px',
    width: '100%',
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
  error: {
    color: '#e53e3e',
    fontSize: '13px',
    margin: 0,
    textAlign: 'center',
  },
  switchText: {
    fontSize: '13px',
    color: '#718096',
    textAlign: 'center',
    margin: 0,
  },
  link: {
    color: '#4A90D9',
    cursor: 'pointer',
    fontWeight: '600',
  },
};

export default Login;