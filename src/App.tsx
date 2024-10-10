import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AllSitesPage from './pages/AllSitesPage';
import AllClientsPage from './pages/AllClientsPage';
import DetailsView from './components/DetailsView';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sites" element={<AllSitesPage />} />
        <Route path="/clients" element={<AllClientsPage />} />
        <Route path="/details/:id" element={<DetailsView />} />
      </Routes>
    </Router>
  );
};

export default App;
