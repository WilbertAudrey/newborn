import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';

function BabyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [baby, setBaby] = useState({
    mother_name: '',
    mother_age: '',
    gender: '',
    birth_date: '',
    pregnancy_age: '',
    height: '',
    weight: '',
    description: '',
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/api/babies/${id}`)
        .then(response => response.json())
        .then(data => setBaby(data));
    }
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setBaby(prevBaby => ({
      ...prevBaby,
      [name]: value,
    }));
  };

 const handleSubmit = e => {
  e.preventDefault();
  // Ubah format tanggal dari "Y-m-d" menjadi "d-m-Y"
  const formattedDate = baby.birth_date.split('-').reverse().join('-');
  
  const url = id ? `http://localhost:8000/api/babies/${id}` : 'http://localhost:8000/api/babies';
  const method = id ? 'PUT' : 'POST';

  fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...baby, birth_date: formattedDate }), // Gunakan tanggal dengan format "d-m-Y"
  })
    .then(response => response.json())
    .then(data => {
      navigate('/');
    });
};


  return (
    <div>
      <h2>{id ? 'Edit Baby' : 'Add Baby'}</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Mother's Name"
              name="mother_name"
              value={baby.mother_name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Mother's Age"
              name="mother_age"
              value={baby.mother_age}
              onChange={handleChange}
              fullWidth
              required
              type="number"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={baby.gender}
                onChange={handleChange}
                required
              >
                <MenuItem value="L">Male</MenuItem>
                <MenuItem value="P">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Birth Date"
              name="birth_date"
              value={baby.birth_date}
              onChange={handleChange}
              fullWidth
              required
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Pregnancy Age"
              name="pregnancy_age"
              value={baby.pregnancy_age}
              onChange={handleChange}
              fullWidth
              required
              type="number"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Height (CM)"
              name="height"
              value={baby.height}
              onChange={handleChange}
              fullWidth
              required
              type="number"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Weight (KG)"
              name="weight"
              value={baby.weight}
              onChange={handleChange}
              fullWidth
              required
              type="number"
              step="0.01"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={baby.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              {id ? 'Update' : 'Add'}
            </Button>
            <Link to="/" style={{ marginLeft: '10px' }}>
              <Button variant="outlined">Cancel</Button>
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default BabyForm;
