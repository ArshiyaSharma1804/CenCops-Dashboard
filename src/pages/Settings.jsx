import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import Highlight from '../components/Highlight';
import './settings.css';

const Settings = () => {
  const { isExpanded, globalSearchTerm, userProfile, updateMyProfile } = useAppContext();
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    rank: '',
    badge_number: '',
    email: ''
  });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || '',
        rank: userProfile.rank || '',
        badge_number: userProfile.badge_number || '',
        email: userProfile.email || ''
      });
    }
  }, [userProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (updateMyProfile) {
      updateMyProfile(formData);
    }
  };

  const handleReset = () => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || '',
        rank: userProfile.rank || '',
        badge_number: userProfile.badge_number || '',
        email: userProfile.email || ''
      });
    }
  };

  if (!userProfile) return <div className="settings-page">Loading...</div>;

  return (
    <div className="settings-page">
      <div className="page-header" style={{ position: 'relative' }}>
        <h1 className="page-title">Settings</h1>
      </div>

      <div className="card-container settings-card">
        
        {/* PROFILE SECTION */}
        <div className="settings-section">
          <div className="settings-section-header">MY PROFILE</div>
          <div className="profile-container">
            <div className="profile-info">
              <div className="profile-avatar">
                <div className="profile-avatar-icon"></div>
              </div>
              <div>
                <div className="profile-name"><Highlight text={userProfile.name} highlight={globalSearchTerm} /></div>
                <div className="profile-role"><Highlight text={userProfile.role} highlight={globalSearchTerm} /></div>
              </div>
            </div>
            <div className="profile-menu">...</div>
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div className="settings-section">
          <div className="settings-section-header">DETAILS</div>
          <div className="details-grid">
            <div className="detail-field">
              <strong>Full Name:</strong> 
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="settings-input" />
            </div>
            <div className="detail-field">
              <strong>Rank:</strong> 
              <input type="text" name="rank" value={formData.rank} onChange={handleInputChange} className="settings-input" />
            </div>
            <div className="detail-field">
              <strong>Badge No.:</strong> 
              <input type="text" name="badge_number" value={formData.badge_number} onChange={handleInputChange} className="settings-input" />
            </div>
            <div className="detail-field">
              <strong>Email:</strong> 
              <input type="text" name="email" value={formData.email} onChange={handleInputChange} className="settings-input" />
            </div>
          </div>
        </div>

        {/* OPTIONS SECTION */}
        <div className="settings-section">
          <div className="settings-section-header">OPTIONS</div>
          <div className="options-list">
            
            <div className="option-item">
              <div className="option-text">
                <h4><Highlight text="Email alerts" highlight={globalSearchTerm} /></h4>
                <p><Highlight text="Receive case updates and assignments by email." highlight={globalSearchTerm} /></p>
              </div>
              <div 
                className={`toggle-switch ${emailAlerts ? 'on' : 'off'}`} 
                onClick={() => setEmailAlerts(!emailAlerts)}
              >
                <div className="toggle-circle"></div>
              </div>
            </div>

            <div className="option-item">
              <div className="option-text">
                <h4><Highlight text="Push notifications" highlight={globalSearchTerm} /></h4>
                <p><Highlight text="In-app notifications for high priority cases." highlight={globalSearchTerm} /></p>
              </div>
              <div 
                className={`toggle-switch ${pushNotifications ? 'on' : 'off'}`} 
                onClick={() => setPushNotifications(!pushNotifications)}
              >
                <div className="toggle-circle"></div>
              </div>
            </div>

          </div>
        </div>

        {/* ACTIONS SECTION */}
        <div className="settings-actions">
          <button className="btn-save" onClick={handleSave}>SAVE</button>
          <button className="btn-reset" onClick={handleReset}>RESET</button>
        </div>

      </div>
    </div>
  );
};

export default Settings;
