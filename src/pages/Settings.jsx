import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Highlight from '../components/Highlight';
import './settings.css';

const Settings = () => {
  const { isExpanded, globalSearchTerm } = useAppContext();
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

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
                <div className="profile-name"><Highlight text="DSP Pandey" highlight={globalSearchTerm} /></div>
                <div className="profile-role"><Highlight text="administrator" highlight={globalSearchTerm} /></div>
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
              <strong>Full Name:</strong> <Highlight text="Tilak Kumar Pandey" highlight={globalSearchTerm} />
            </div>
            <div className="detail-field">
              <strong>Rank:</strong> <Highlight text="Deputy Superintendent of Police" highlight={globalSearchTerm} />
            </div>
            <div className="detail-field">
              <strong>Badge No.:</strong> <Highlight text="CHD-007" highlight={globalSearchTerm} />
            </div>
            <div className="detail-field">
              <strong>Email:</strong> <Highlight text="pandey.police@chd.gov.in" highlight={globalSearchTerm} />
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
          <button className="btn-save">SAVE</button>
          <button className="btn-reset">RESET</button>
        </div>

      </div>
    </div>
  );
};

export default Settings;
