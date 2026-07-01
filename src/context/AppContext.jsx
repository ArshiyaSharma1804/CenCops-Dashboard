import React, { createContext, useState, useContext, useEffect } from 'react';
import { departments as initialDepartments, officers as initialOfficers, tasks as initialTasks } from '../data';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  
  // Data state
  const [departments, setDepartments] = useState(initialDepartments);
  const [officers, setOfficers] = useState(initialOfficers);
  const [tasks, setTasks] = useState(initialTasks);
  
  // Modal state
  const [isCreateCaseModalOpen, setIsCreateCaseModalOpen] = useState(false);
  const [isRegisterOfficerModalOpen, setIsRegisterOfficerModalOpen] = useState(false);
  const [isAddDepartmentModalOpen, setIsAddDepartmentModalOpen] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  const addOfficer = (newOfficer) => {
    setOfficers([...officers, { ...newOfficer, id: officers.length + 1 }]);
  };
  
  const addDepartment = (newDepartment) => {
    setDepartments([...departments, { ...newDepartment, id: departments.length + 1, tasks: 0, officers: 0 }]);
  };

  useEffect(() => {
    const handleGlobalClick = () => {
      // Clear highlight on any subsequent click
      if (globalSearchTerm) {
        setGlobalSearchTerm('');
      }
    };
    
    // Use capture phase so we catch the click early, but delay clearing 
    // so that the current render can handle the highlighted link click if needed.
    // Actually, just standard event listener is fine. We will stopPropagation in Topbar.
    document.addEventListener('mousedown', handleGlobalClick);
    return () => document.removeEventListener('mousedown', handleGlobalClick);
  }, [globalSearchTerm]);

  return (
    <AppContext.Provider value={{ 
      isExpanded, 
      toggleExpanded, 
      selectedDepartment, 
      setSelectedDepartment,
      globalSearchTerm,
      setGlobalSearchTerm,
      
      departments,
      officers,
      tasks,
      addOfficer,
      addDepartment,
      
      isCreateCaseModalOpen,
      setIsCreateCaseModalOpen,
      isRegisterOfficerModalOpen,
      setIsRegisterOfficerModalOpen,
      isAddDepartmentModalOpen,
      setIsAddDepartmentModalOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
