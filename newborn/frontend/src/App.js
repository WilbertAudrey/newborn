import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BabyTable from './components/BabyTable';
import BabyForm from './components/BabyForm';
import BabyDetails from './components/BabyDetails';
import AnalysisTable from './components/AnalysisTable';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BabyTable />} />
        <Route path="/add" element={<BabyForm />} />
        <Route path="/edit/:id" element={<BabyForm />} />
        <Route path="/details/:id" element={<BabyDetails />} />
        <Route path="/analysis" element={<AnalysisTable />} />
      </Routes>
    </Router>
  );
}

export default App;
