import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login.jsx';
import Form from './components/Form.jsx';
import AdvertisementManagement from './pages/AdvertisementManagement.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CustomerHome from './pages/CustomerHome.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/form" element={<Form />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admanage" element={<AdvertisementManagement />} />
        <Route path="/customerhome" element={<CustomerHome />} />
      </Routes>
    </Router>
  );
}

export default App;