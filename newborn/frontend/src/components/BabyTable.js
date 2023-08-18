import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { format } from "date-fns";
import * as api from "../api/index";

function BabyTable() {
  const [babies, setBabies] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [babyToDeleteId, setBabyToDeleteId] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    api.getBabies()
      .then((response) => {
        setBabies(response.data);

        api.getMomsList()
          .then((momsResponse) => {
            const momIdToName = {};
            momsResponse.data.forEach((mom) => {
              momIdToName[mom.id] = mom.name;
            });

            const updatedBabiesData = response.data.map((baby) => ({
              ...baby,
              mom_name: momIdToName[baby.mom_id],
            }));

            setBabies(updatedBabiesData);
          })
          .catch((error) => {
            console.error("Error fetching moms data:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching babies data:", error);
      });
  }, []);

  const handleDelete = (id) => {
    setBabyToDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    api.deleteBaby(babyToDeleteId)
      .then((response) => {
        if (response.status === 200) {
          setBabies((prevBabies) => prevBabies.filter((baby) => baby.id !== babyToDeleteId));
          setDeleteSuccess(true);
        }
      })
      .catch((error) => {
        console.error("Error deleting baby:", error);
      })
      .finally(() => {
        setBabyToDeleteId(null);
        setDeleteDialogOpen(false);
      });
  };

  const handleCloseDeleteDialog = () => {
    setBabyToDeleteId(null);
    setDeleteDialogOpen(false);
  };

  const formatDate = (date, formatString) => {
    return format(new Date(date), formatString);
  };

return (
    <div>
      <Link to="/">
        <Button variant="outlined">&larr; Go Back</Button>
      </Link>
      <Link to="/add">
        <Button variant="contained" color="primary">
          Add Baby
        </Button>
      </Link>
      <TableContainer component={Paper} style={{ marginTop: "16px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pregnancy Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Birth Date</TableCell>
              <TableCell>Birth Process</TableCell>
              <TableCell>Condition</TableCell>
              <TableCell>Moms Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell colSpan={3} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {babies.map((baby) => (
              <TableRow key={baby.id}>
                <TableCell>{baby.pregnancy_age}</TableCell>
                <TableCell>{baby.gender}</TableCell>
                <TableCell>{baby.weight}</TableCell>
                <TableCell>{formatDate(baby.birth_date, "dd-MM-yyyy")}</TableCell>
                <TableCell>{baby.birth_process}</TableCell>
                <TableCell>{baby.infant_condition}</TableCell>
                <TableCell>{baby.mom_name}</TableCell>
                <TableCell>{baby.description}</TableCell>
                <TableCell colSpan={3} align="center">
                  <Link to={`/edit/${baby.id}`}>
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
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this baby?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteSuccess} onClose={() => setDeleteSuccess(false)}>
        <DialogTitle>Delete Success</DialogTitle>
        <DialogContent>
          <DialogContentText>The baby data has been successfully deleted.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteSuccess(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BabyTable;
