import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

import axios from 'axios';

const Login = ({ onLogin }) => {
  const { setUserRole, setLoggedInUser, setUserProfile } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('/api/login', {
        email: email,
        password: password
      });
      
      const data = response.data;
      setUserRole(data.user.role);
      setLoggedInUser(data.user.name);
      if (setUserProfile) setUserProfile(data.user);
      onLogin();
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred during login.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-bg login-bg-1"></div>
      <div className="login-bg login-bg-2"></div>
      
      <div className="login-card">
        <h1 className="login-title">Welcome!</h1>
        
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div className="login-input-group">
            <label>email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="login-input-group">
            <label>password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="login-btn">LOGIN</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
