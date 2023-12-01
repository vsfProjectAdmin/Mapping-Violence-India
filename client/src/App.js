import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Nav from './components/Nav';
import IncidentForm from './components/IncidentForm';
import Home from './components/Home';
import Contact from './components/Contact';
import Method from './components/Method';

function App() {
  return (
    <div className="App">
      <Nav/>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/method" element={<Method />} />
        <Route path="/report-incident" element={<IncidentForm />} />
        <Route path="/contact-us" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
