import React, { useState } from 'react';
import { tasks, officers } from '../data';

const Tasks = () => {
  const [taskList, setTaskList] = useState(tasks);

  return (
    <div>
      <div className="page-header" style={{ position: 'relative' }}>
        <div className="page-subtitle" style={{ color: '#5E594B', letterSpacing: '-0.04em' }}>Digital Forensics Lab • {taskList.length} tasks</div>
        <div className="page-title">Tasks</div>
        
        <div className="tasks-header-actions">
          <button className="action-btn black">📝</button>
          <button className="action-btn pink">✎</button>
          <button className="action-btn yellow">!</button>
          <button className="action-btn green">✓</button>
        </div>
      </div>
      
      <div className="card-container" style={{ height: '620px', marginTop: '20px' }}>
        <table className="table" style={{ width: '100%', marginTop: '10px' }}>
          <thead>
            <tr>
              <th style={{width: '30px'}}></th>
              <th>TASK</th>
              <th>ASSIGNED TO</th>
              <th>ORDER ID</th>
              <th>DATE</th>
              <th>DUE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {taskList.map((task, index) => (
              <tr key={task.id}>
                <td style={{color: '#5E594B'}}>{index + 1}</td>
                <td style={{color: '#000'}}>{task.task}</td>
                <td>
                  <select 
                    className="select-dropdown" 
                    defaultValue={task.assignedTo}
                  >
                    {officers.map(off => (
                      <option key={off.id} value={off.name}>{off.name}</option>
                    ))}
                  </select>
                </td>
                <td style={{color: '#000'}}>{task.orderId}</td>
                <td style={{color: '#000'}}>{task.date}</td>
                <td style={{color: '#000'}}>{task.due}</td>
                <td>
                  <span className={`status-badge ${task.status.toLowerCase().replace(' ', '-')}`}>
                    {task.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;
