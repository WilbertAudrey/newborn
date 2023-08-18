import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BabyForm from "./components/BabyForm";
import BabyTable from "./components/BabyTable";
import AnalysisTable from "./components/AnalysisTable";
import MomTable from "./components/MomTable";
import MomForm from "./components/MomForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MomTable />} />
        <Route path="addmom" element={<MomForm />} />
        <Route path="/editmom/:id" element={<MomForm />} />
        <Route path="/babytable" element={<BabyTable />} />
        <Route path="/add" element={<BabyForm />} />
        <Route path="/edit/:id" element={<BabyForm />} />
        <Route path="/analysis" element={<AnalysisTable />} />
      </Routes>
    </Router>
  );
}

export default App;
