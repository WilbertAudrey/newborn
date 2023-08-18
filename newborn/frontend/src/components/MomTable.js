import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import * as api from "../api/index";

function MomTable() {
  const [moms, setMoms] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [momToDeleteId, setMomToDeleteId] = useState(null);
  const [serverError, setServerError] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    api.getMoms()
      .then((response) => {
        setServerError(false);
        setMoms(response.data);
      })
      .catch((error) => {
        setServerError(true);
        console.error("Error fetching data from server:", error);
      });
  }, []);

  const handleDelete = (id) => {
    setMomToDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    api.deleteMom(momToDeleteId)
      .then((response) => {
        if (response.status === 200) {
          setMoms((prevMoms) => prevMoms.filter((mom) => mom.id !== momToDeleteId));
          setDeleteSuccess(true);
        }
      })
      .catch((error) => {
        console.error("Error deleting mom:", error);
      })
      .finally(() => {
        setMomToDeleteId(null);
        setDeleteDialogOpen(false);
      });
  };

  const handleCloseDeleteDialog = () => {
    setMomToDeleteId(null);
    setDeleteDialogOpen(false);
  };

  return (
    <div>
      <h2>List of Moms</h2>
      <Dialog open={serverError} onClose={() => setServerError(false)}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>The server is currently not active. Please try again later.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setServerError(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Link to="/addmom">
        <Button variant="contained" color="primary">
          Add Mother Data
        </Button>
      </Link>
      <Link to="/analysis">
        <Button variant="outlined" color="primary">
          Analysis
        </Button>
      </Link>
      <Link to={`/babytable`}>
        {" "}
        <Button variant="outlined" color="secondary">
          Babies Data
        </Button>
      </Link>
      <TableContainer component={Paper} style={{ marginTop: "16px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mother Name</TableCell>
              <TableCell>Mother Age</TableCell>
              <TableCell colSpan={3} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {moms.map((moms) => (
              <TableRow key={moms.id}>
                <TableCell>{moms.name}</TableCell>
                <TableCell>{moms.age}</TableCell>
                <TableCell colSpan={3} align="center">
                  <Link to={`/editmom/${moms.id}`}>
                    {" "}
                    <Button variant="outlined" color="secondary">
                      Edit
                    </Button>
                  </Link>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(moms.id)}>
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
          <DialogContentText>Are you sure you want to delete this mom data?</DialogContentText>
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
          <DialogContentText>The mom data has been successfully deleted.</DialogContentText>
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

export default MomTable;
