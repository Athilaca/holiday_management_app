import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import HolidaysPage from './pages/Holiday';
import './index.css';
import Layout from './components/Layout';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/holidays" element={<HolidaysPage />} />
          
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
