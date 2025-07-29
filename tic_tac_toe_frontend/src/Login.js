import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function Login({ onLogin, authError }) {
  /**
   * Minimalistic login form for username/password authentication
   * Props:
   *    - onLogin: function(username, password)
   *    - authError: string (error to display, if any)
   */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);

  // Accessibility: allow Enter to submit
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleLogin();
    }
  }
  // PUBLIC_INTERFACE
  function handleLogin() {
    // Propagate up
    onLogin(username.trim(), password);
    setTouched(true);
  }

  return (
    <div className="ttt-outer" style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <div className="ttt-main-centered">
        <main className="ttt-container" style={{ minWidth: 310 }}>
          <h1 className="ttt-title" style={{ marginBottom: '1rem' }}>Login</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, width: '100%', alignItems: 'center', marginBottom: 10 }}>
            <input
              className="ttt-login-input"
              type="text"
              placeholder="Username"
              autoFocus
              aria-label="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              style={loginInputStyle}
            />
            <input
              className="ttt-login-input"
              type="password"
              placeholder="Password"
              aria-label="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              style={loginInputStyle}
            />
            <button
              className="ttt-restart"
              style={{ width: '100%', marginTop: 10, marginBottom: 8, letterSpacing: '1px' }}
              onClick={handleLogin}
              aria-label="Login"
            >
              Login
            </button>
            {authError && touched && (
              <div style={{
                color: 'var(--accent, #f44336)',
                fontSize: 14,
                marginTop: '-6px',
                fontWeight: 500,
                minHeight: 23,
                textAlign: 'center',
                transition: "color 0.2s"
              }}>
                {authError}
              </div>
            )}
          </div>
        </main>
        <footer className="ttt-footer-floating">
          <small>
            Developed by Kavia
          </small>
        </footer>
      </div>
    </div>
  );
}

const loginInputStyle = {
  width: '95%',
  maxWidth: 260,
  padding: '11px 12px',
  borderRadius: 8,
  border: '1.5px solid var(--secondary, #e3e3e3)',
  fontSize: 16,
  fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
  outline: 'none',
  marginBottom: 0,
  background: '#fff',
  color: 'var(--text, #f44336)',
  transition: 'border 0.2s, box-shadow 0.2s',
  boxSizing: 'border-box',
  appearance: 'none'
};

export default Login;
