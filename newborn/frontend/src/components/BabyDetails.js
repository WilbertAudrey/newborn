import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Card, CardContent, Divider, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
}));

function BabyDetails() {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Fetch gender analysis data from the API based on the given ID and selected year
    fetch(`http://localhost:8000/api/analysis?year=${selectedYear}`)
      .then(response => response.json())
      .then(data => setAnalysis(data));
  }, [id, selectedYear]);

  const getGenderAnalysis = (month, gender) => {
    return analysis.find(item => item.month === month && item.gender === gender);
  };

  const getMonthName = (month) => {
    const monthNames = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    return monthNames[month - 1];
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div>
      <h2>Gender Analysis</h2>
      <div>
        <Typography variant="subtitle1">Pilih Tahun:</Typography>
        <Select value={selectedYear} onChange={handleYearChange}>
          {Array.from({ length: 10 }, (_, i) => selectedYear - i).map(year => (
            <MenuItem key={year} value={year}>{year}</MenuItem>
          ))}
        </Select>
      </div>
      <Grid container spacing={2}>
        {Array.from({ length: 12 }, (_, monthIndex) => monthIndex + 1).map(month => (
          <Grid item xs={12} sm={6} key={month}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6">
                  {getMonthName(month)} ({month})
                </Typography>
                <Divider style={{ margin: '8px 0' }} />
                <Typography variant="subtitle1">
                  Laki-laki:
                </Typography>
                <Typography>
                  Jumlah: {getGenderAnalysis(month, 'L')?.male_count || 0}
                </Typography>
                <Typography>
                  Berat Rata-rata: {getGenderAnalysis(month, 'L')?.average_weight_male || 0}
                </Typography>
                <Divider style={{ margin: '8px 0' }} />
                <Typography variant="subtitle1">
                  Perempuan:
                </Typography>
                <Typography>
                  Jumlah: {getGenderAnalysis(month, 'P')?.female_count || 0}
                </Typography>
                <Typography>
                  Berat Rata-rata: {getGenderAnalysis(month, 'P')?.average_weight_female || 0}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default BabyDetails;
