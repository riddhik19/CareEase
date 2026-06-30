import { useNavigate, useLocation } from 'react-router-dom';

function Navbar({ userName }) {
  const navigate = useNavigate();
  const location = useLocation();

  function isActive(path) {
    return location.pathname === path;
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.logo} onClick={() => navigate('/')}>
        CareEase 🤝
      </div>
      <div style={styles.links}>
        <button
          style={{
            ...styles.link,
            borderBottom: isActive('/dashboard') ? '2px solid #fff' : 'none',
          }}
          onClick={() => navigate('/dashboard')}
        >
          Dashboard
        </button>
        <button
          style={{
            ...styles.link,
            borderBottom: isActive('/my-requests') ? '2px solid #fff' : 'none',
          }}
          onClick={() => navigate('/my-requests')}
        >
          My Requests
        </button>
        {userName && (
          <span style={styles.userName}>Hi, {userName} 👋</span>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: '#4A90D9',
    padding: '16px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  link: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ffffff',
    fontSize: '15px',
    cursor: 'pointer',
    paddingBottom: '4px',
  },
  userName: {
    color: '#e2e8f0',
    fontSize: '14px',
  },
};

export default Navbar;