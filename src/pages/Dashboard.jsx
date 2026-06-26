import React from 'react';
import { currentDepartment, tasks, officers } from '../data';
import './dashboard.css';
import { useAppContext } from '../context/AppContext';

const Dashboard = () => {
  const { isExpanded } = useAppContext();
  const inProgressTasks = tasks.filter(t => t.status === 'IN PROGRESS').length;
  const pendingTasks = tasks.filter(t => t.status === 'PENDING').length;
  const doneTasks = tasks.filter(t => t.status === 'DONE').length;

  return (
    <div>
      <div className="page-header">
        <div className="page-subtitle">IPDR • IAF MUSEUM, 18C</div>
        <div className="page-title">{currentDepartment}</div>
      </div>
      
      <div className="status-widgets">
        <div className="widget widget-in-progress">
          <div>
            <div className="widget-title">IN PROGRESS</div>
            <div className="widget-subtitle">Active tasks</div>
          </div>
          <div className="widget-count">{inProgressTasks}</div>
        </div>
        
        <div className="widget widget-pending">
          <div>
            <div className="widget-title">PENDING</div>
            <div className="widget-subtitle">Awaiting assignment or review</div>
          </div>
          <div className="widget-count">{pendingTasks}</div>
        </div>
        
        <div className="widget widget-done">
          <div>
            <div className="widget-title-done">DONE</div>
            <div className="widget-subtitle">Completed tasks</div>
          </div>
          <div className="widget-count-done">{doneTasks}</div>
        </div>
      </div>
      
      <div className="dashboard-grid">
        <div className="card-container current-tasks-1">
          <div className="card-title-1" style={{ alignSelf: 'flex-start' }}>Current Tasks</div>
          <table className="table">
            <thead>
              <tr>
                <th style={{width: '30px'}}></th>
                <th>TASK</th>
                <th>ASSIGNED TO</th>
                {isExpanded && <th>ORDER ID</th>}
                <th>DUE</th>
                <th style={{ textAlign: 'center' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {tasks.slice(0, 7).map((task, index) => (
                <tr key={task.id}>
                  <td style={{color: '#5E594B', textAlign: 'center'}}>{index + 1}</td>
                  <td style={{color: '#000'}}>{task.task}</td>
                  <td style={{color: '#000'}}>{task.assignedTo}</td>
                  {isExpanded && <td style={{color: '#000', fontFamily: 'var(--font-code)'}}>{task.orderId}</td>}
                  <td style={{color: '#000'}}>{task.due}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`status-badge ${task.status.toLowerCase().replace(' ', '-')}`}>
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="card-container officers-list">
          <div className="card-title">Officers</div>
          <table className="table">
            <thead>
              <tr>
                <th>OFFICER</th>
                <th style={{textAlign: 'right'}}>TASKS</th>
              </tr>
            </thead>
            <tbody>
              {officers.map(officer => (
                <tr key={officer.id}>
                  <td style={{color: '#000'}}>{officer.name}</td>
                  <td style={{textAlign: 'right', color: '#000'}}>{officer.tasks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
