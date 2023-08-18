import React, { useState, useEffect } from "react";
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Grid, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as api from "../api/index";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function BabyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [baby, setBaby] = useState({
    id: id ? Number(id) : 0,
    gender: "",
    birth_date: "",
    pregnancy_age: "",
    height: "",
    weight: "",
    birth_process: "",
    infant_condition: "",
    description: "",
    mom_name: "",
  });
  const [moms, setMoms] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    api.getMomsList()
      .then((response) => {
        setMoms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching moms data:", error);
      });

    if (id) {
      api.getBabyById(id)
        .then((response) => {
          setBaby(response.data);
        })
        .catch((error) => {
          console.error("Error fetching baby data:", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBaby((prevBaby) => ({
      ...prevBaby,
      [name]: value,
    }));
  };

  const handleMomSelect = (e) => {
    const selectedMomName = e.target.value;
    setBaby((prevBaby) => ({
      ...prevBaby,
      mom_name: selectedMomName,
    }));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  const formattedDate = baby.birth_date.split("-").reverse().join("-");

  const requestBody = {
    ...baby,
    birth_date: formattedDate,
  };

  api.createOrUpdateBaby(requestBody)
    .then((response) => {
      if (id) {
        setSnackbarMessage("Baby data updated successfully!");
      } else {
        setSnackbarMessage("Baby data added successfully!");
      }
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      navigate(`/babytable`);
    })
    .catch((error) => {
      console.error("Error submitting baby data:", error);
      setSnackbarMessage("An error occurred while saving baby data.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    });
};


  return (
    <div>
      <h2>{id ? "Edit Baby" : "Add Baby"}</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select name="gender" value={baby.gender} onChange={handleChange} required>
                <MenuItem value="L">Male</MenuItem>
                <MenuItem value="P">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
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
            <FormControl fullWidth>
              <InputLabel>Pregnancy Age</InputLabel>
              <Select
                label="Pregnancy Age"
                name="pregnancy_age"
                value={baby.pregnancy_age}
                onChange={handleChange}
                required
              >
                {[...Array(10)].map((_, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Height (CM)" name="height" value={baby.height} onChange={handleChange} fullWidth required type="number" />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Weight (KG)" name="weight" value={baby.weight} onChange={handleChange} fullWidth required type="number" step="0.01" />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Birth Process</InputLabel>
              <Select name="birth_process" value={baby.birth_process} onChange={handleChange} required>
                <MenuItem value="Normal">Normal</MenuItem>
                <MenuItem value="Caesar">Caesar</MenuItem>
                <MenuItem value="Waterbirth">Water Birth</MenuItem>
                <MenuItem value="others">Others</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Infant Condition</InputLabel>
              <Select name="infant_condition" value={baby.infant_condition} onChange={handleChange} required>
                <MenuItem value="Alive">Alive</MenuItem>
                <MenuItem value="Death">Death</MenuItem>
                <MenuItem value="Disabled">Disabled</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Mother's Name</InputLabel>
              <Select name="mom_name" value={baby.mom_name} onChange={handleMomSelect} required>
                {moms.map((mom) => (
                  <MenuItem key={mom.id} value={mom.name}>
                    {mom.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Description" name="description" value={baby.description} onChange={handleChange} fullWidth multiline rows={4} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              {id ? "Update" : "Add"}
            </Button>
            <Link to={`/babytable`} style={{ marginLeft: "10px" }}>
              <Button variant="outlined">Cancel</Button>
            </Link>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default BabyForm;
