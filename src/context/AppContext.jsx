import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  
  // Auth state
  const [userRole, setUserRole] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  
  // Data state
  const [categories, setCategories] = useState([]);
  const [experts, setExperts] = useState([]);
  const [cases, setCases] = useState([]);
  
  // Modal state
  const [isCreateCaseModalOpen, setIsCreateCaseModalOpen] = useState(false);
  const [isRegisterExpertModalOpen, setIsRegisterExpertModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  
  const [isEditExpertModalOpen, setIsEditExpertModalOpen] = useState(false);
  const [editingExpert, setEditingExpert] = useState(null);
  
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Cross-component communication
  const [activeNotificationCaseId, setActiveNotificationCaseId] = useState(null);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const fetchData = useCallback(async () => {
    if (!userRole) return;
    try {
      const [catsRes, expsRes, casesRes] = await Promise.all([
        axios.get('/api/categories'),
        axios.get('/api/experts'),
        axios.get('/api/cases')
      ]);
      setCategories(catsRes.data);
      setExperts(expsRes.data);
      setCases(casesRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  }, [userRole]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  const addExpert = async (newExpert) => {
    try {
      await axios.post('/api/experts', newExpert);
      await fetchData();
    } catch (e) { console.error(e); }
  };
  
  const updateMyProfile = async (updatedData) => {
    try {
      const res = await axios.put('/api/me', updatedData);
      setUserProfile(res.data.user);
      setLoggedInUser(res.data.user.name);
    } catch (e) { console.error(e); }
  };
  
  const updateExpert = async (id, updatedData) => {
    try {
      await axios.put(`/api/experts/${id}`, updatedData);
      await fetchData();
    } catch (e) { console.error(e); }
  };
  
  const removeExpert = async (id) => {
    try {
      await axios.delete(`/api/experts/${id}`);
      await fetchData();
    } catch (e) { console.error(e); }
  };
  
  const addCategory = async (newCategory) => {
    try {
      await axios.post('/api/categories', newCategory);
      await fetchData();
    } catch (e) { console.error(e); }
  };
  
  const updateCategory = async (id, updatedData) => {
    try {
      await axios.put(`/api/categories/${id}`, updatedData);
      await fetchData();
    } catch (e) { console.error(e); }
  };
  
  const removeCategory = async (id) => {
    try {
      await axios.delete(`/api/categories/${id}`);
      const deptToRemove = categories.find(d => d.id === id);
      if (deptToRemove && deptToRemove.name === selectedCategory) {
        setSelectedCategory('All');
      }
      await fetchData();
    } catch (e) { console.error(e); }
  };

  const addCase = async (newCase) => {
    try {
      await axios.post('/api/cases', newCase);
      await fetchData();
    } catch (e) { console.error(e); }
  };

  const addCaseWithDocument = async (formData) => {
    try {
      await axios.post('/api/cases', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      await fetchData();
    } catch (e) { console.error(e); }
  };

  const getCaseUpdates = async (caseId) => {
    try {
      const res = await axios.get(`/api/cases/${caseId}/updates`);
      return res.data;
    } catch (e) { console.error(e); return []; }
  };

  const postCaseUpdate = async (caseId, content) => {
    try {
      await axios.post(`/api/cases/${caseId}/updates`, { content });
    } catch (e) { console.error(e); }
  };

  const uploadReport = async (caseId, formData) => {
    try {
      await axios.post(`/api/cases/${caseId}/report`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      await fetchData();
    } catch (e) { console.error(e); }
  };

  const updateCaseStatus = async (id, newStatus) => {
    try {
      await axios.put(`/api/cases/${id}`, { status: newStatus });
      await fetchData();
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    const handleGlobalClick = () => {
      if (globalSearchTerm) {
        setGlobalSearchTerm('');
      }
    };
    
    document.addEventListener('mousedown', handleGlobalClick);
    return () => document.removeEventListener('mousedown', handleGlobalClick);
  }, [globalSearchTerm]);

  return (
    <AppContext.Provider value={{ 
      isExpanded, toggleExpanded, 
      selectedCategory, setSelectedCategory,
      globalSearchTerm, setGlobalSearchTerm,
      activeNotificationCaseId, setActiveNotificationCaseId,
      
      userRole, setUserRole,
      loggedInUser, setLoggedInUser,
      userProfile, setUserProfile, updateMyProfile,
      
      categories, addCategory, updateCategory, removeCategory,
      experts, addExpert, updateExpert, removeExpert,
      cases, addCase, addCaseWithDocument, uploadReport, updateCaseStatus, getCaseUpdates, postCaseUpdate,
      
      isCreateCaseModalOpen, setIsCreateCaseModalOpen,
      isRegisterExpertModalOpen, setIsRegisterExpertModalOpen,
      isAddCategoryModalOpen, setIsAddCategoryModalOpen,
      
      isEditExpertModalOpen, setIsEditExpertModalOpen,
      editingExpert, setEditingExpert,
      
      isEditCategoryModalOpen, setIsEditCategoryModalOpen,
      editingCategory, setEditingCategory
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
