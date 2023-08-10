import React, { useState, useEffect } from 'react';

function AnalysisTable() {
  const [analysisData, setAnalysisData] = useState([]);

  useEffect(() => {
    // Panggil API untuk mendapatkan data analisis
    // Ganti URL_API dengan URL API Anda
    fetch('URL_API/api/analysis')
      .then(response => response.json())
      .then(data => setAnalysisData(data));
  }, []);

  return (
    <div>
      <h2>Analysis Table</h2>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Gender</th>
            <th>Month</th>
            <th>Male Count</th>
            <th>Female Count</th>
            <th>Total Count</th>
            <th>Avg Weight (Male)</th>
            <th>Avg Weight (Female)</th>
          </tr>
        </thead>
        <tbody>
          {analysisData.map(entry => (
            <tr key={entry.year + entry.gender + entry.month}>
              <td>{entry.year}</td>
              <td>{entry.gender}</td>
              <td>{entry.month}</td>
              <td>{entry.male_count}</td>
              <td>{entry.female_count}</td>
              <td>{entry.total_count}</td>
              <td>{entry.avg_weight_male}</td>
              <td>{entry.avg_weight_female}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AnalysisTable;
