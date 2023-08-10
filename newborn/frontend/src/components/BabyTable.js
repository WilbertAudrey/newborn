import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { format } from 'date-fns';

function BabyTable() {
  const [babies, setBabies] = useState([]);

  useEffect(() => {
    // Panggil API untuk mendapatkan data bayi pada tanggal tertentu
    // Ganti URL_API dengan URL API Anda
    fetch('http://localhost:8000/api/babies')
      .then(response => response.json())
      .then(data => setBabies(data));
  }, []);

  const handleDelete = (id) => {
    // Mengirim permintaan DELETE ke API untuk menghapus bayi dengan ID tertentu
    fetch(`http://localhost:8000/api/babies/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // Jika penghapusan berhasil, perbarui daftar bayi dengan data terbaru
          // Anda dapat memanggil kembali API untuk mendapatkan data terbaru atau melakukan update state
          setBabies(prevBabies => prevBabies.filter(baby => baby.id !== id));
        }
      })
      .catch(error => {
        console.error('Error deleting baby:', error);
      });
  };
const formatDate = (date, formatString) => {
    return format(new Date(date), formatString);
  };

  return (
    <div>
      <h2>List of Babies</h2>
      <Link to="/add">
        <Button variant="contained" color="primary">
          Add Baby
        </Button>
      </Link>
      <Link to="/details/${baby.id}">
                    <Button variant="outlined" color="primary">
                      Details
                    </Button>
                  </Link>
      <TableContainer component={Paper} style={{ marginTop: '16px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mother's Name</TableCell>
              <TableCell>Pregnancy Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Birth Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell colSpan={3} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {babies.map(baby => (
              <TableRow key={baby.id}>
                <TableCell>{baby.mother_name}</TableCell>
                <TableCell>{baby.pregnancy_age}</TableCell>
                <TableCell>{baby.gender}</TableCell>
                <TableCell>{baby.weight}</TableCell>
                <TableCell>{formatDate(baby.birth_date, 'dd-MM-yyyy')}</TableCell>
                <TableCell>{formatDate(baby.created_at, 'dd-MM-yyyy HH:mm:ss')}</TableCell>
                <TableCell colSpan={3} align="center">
                    <Link to={`/edit/${baby.id}`}> {/* Use backticks for template string */}
              <Button variant="outlined" color="secondary">
                Edit
              </Button>
            </Link>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(baby.id)}>
                Delete
              </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default BabyTable;
