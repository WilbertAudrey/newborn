import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button, TextField, Grid } from "@mui/material";
import * as api from "../api/index";

function MomForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mom, setMom] = useState({
    name: "",
    age: "",
  });

  useEffect(() => {
    if (id) {
      api.getMomById(id)
        .then((response) => {
          setMom(response.data);
        })
        .catch((error) => {
          console.error("Error fetching mom data:", error);
        });
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "age" && value.length > 2) {
      return;
    }

    setMom((prevMom) => ({
      ...prevMom,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api.createOrUpdateMom(mom)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error submitting mom data:", error);
      });
  };

  return (
    <div>
      <h2>{id ? "Edit Mom" : "Add Mom"}</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField label="Mother's Name" name="name" value={mom.name} onChange={handleChange} fullWidth required placeholder="Input full name" inputProps={{ maxLength: 50 }} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Mother's Age" name="age" value={mom.age} onChange={handleChange} fullWidth required type="number" inputProps={{ min: 1, max: 99 }} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              {id ? "Update" : "Add"}
            </Button>
            <Link to="/" style={{ marginLeft: "10px" }}>
              <Button variant="outlined">Cancel</Button>
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default MomForm;
