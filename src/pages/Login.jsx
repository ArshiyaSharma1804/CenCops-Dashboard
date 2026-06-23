import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin();
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-bg login-bg-1"></div>
      <div className="login-bg login-bg-2"></div>
      
      <div className="login-card">
        <h1 className="login-title">Welcome!</h1>
        
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div className="login-input-group">
            <label>username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
