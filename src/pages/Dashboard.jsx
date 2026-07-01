import React, { useMemo } from 'react';
import './dashboard.css';
import { useAppContext } from '../context/AppContext';
import Highlight from '../components/Highlight';

const Dashboard = () => {
  const { isExpanded, selectedDepartment, globalSearchTerm, tasks, officers } = useAppContext();
  
  const filteredTasks = useMemo(() => 
    selectedDepartment === 'All' 
      ? tasks 
      : tasks.filter(t => t.department === selectedDepartment)
  , [selectedDepartment, tasks]);
  
  const filteredOfficers = useMemo(() => 
    selectedDepartment === 'All' 
      ? officers 
      : officers.filter(o => o.department === selectedDepartment)
  , [selectedDepartment, officers]);
  
  const inProgressTasks = filteredTasks.filter(t => t.status === 'IN PROGRESS').length;
  const pendingTasks = filteredTasks.filter(t => t.status === 'PENDING').length;
  const doneTasks = filteredTasks.filter(t => t.status === 'DONE').length;

  return (
    <div>
      <div className="page-header" style={{ position: 'relative' }}>
        <div className="page-subtitle">CATEGORY • IAF MUSEUM, 18C</div>
        <div className="page-title">{selectedDepartment}</div>
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
        <div className="card-container current-tasks" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-title" style={{ alignSelf: 'flex-start' }}>Current Tasks</div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
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
                {filteredTasks.map((task, index) => (
                  <tr key={index}>
                    <td style={{color: '#5E594B', textAlign: 'center'}}>{index + 1}</td>
                    <td style={{fontWeight: 500}}>
                      <Highlight text={task.task} highlight={globalSearchTerm} />
                    </td>
                    <td>
                      <Highlight text={task.assignedTo} highlight={globalSearchTerm} />
                    </td>
                    {isExpanded && <td style={{color: '#616161'}}>
                      <Highlight text={task.orderId} highlight={globalSearchTerm} />
                    </td>}
                    <td style={{color: '#616161'}}>{task.due}</td>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`status-badge status-${task.status.toLowerCase().replace(' ', '-')}`}>
                        {task.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="card-container officers-list" style={{ display: 'flex', flexDirection: 'column', height: "8%" }}>
          <div className="card-title">Officers</div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>OFFICER</th>
                  <th style={{textAlign: 'right'}}>TASKS</th>
                </tr>
              </thead>
              <tbody>
                {filteredOfficers.map(officer => (
                  <tr key={officer.id}>
                    <td style={{color: '#000'}}>
                      <Highlight text={officer.name} highlight={globalSearchTerm} />
                    </td>
                    <td style={{textAlign: 'right', color: '#000'}}>{officer.tasks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
