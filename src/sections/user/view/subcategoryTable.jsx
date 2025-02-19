import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Add, Delete } from "@mui/icons-material";
import {
  Box,
  Paper,
  Table,
  Button,
  Dialog,
  TableRow,
  TableBody,
  TextField,
  TableCell,
  TableHead,
  IconButton,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
} from "@mui/material";

import {
  addNewSubcategory,
  deleteSubcategory,
  getAllSubcategories,
} from "src/redux/actions/subcategoryAction";

const initialSubcategoryData = {
  name: "",
};

const SubcategoryTable = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [deleteSubcategoryId, setDeleteSubcategoryId] = useState(null);
  const [newSubcategory, setNewSubcategory] = useState(initialSubcategoryData);
  const [subcategoryData, setSubcategoryData] = useState(null);

  const dispatch = useDispatch();
  const allsubcategories = useSelector(
    (state) => state.subcategory.allsubcategories
  );

  useEffect(() => {
    dispatch(getAllSubcategories());
  }, [dispatch]);

  useEffect(() => {
    if (allsubcategories) {
      setSubcategoryData(allsubcategories);
    }
  }, [allsubcategories]);

  const handleOpenDialog = () => {
    setNewSubcategory({ name: "" });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubcategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveSubcategory = () => {
    dispatch(addNewSubcategory(newSubcategory));
    handleCloseDialog();
  };

  const handleOpenDeleteDialog = (id) => {
    setDeleteSubcategoryId(id);
    setConfirmDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setConfirmDeleteDialog(false);
    setDeleteSubcategoryId(null);
  };

  const handleConfirmDelete = () => {
    if (deleteSubcategoryId) {
      dispatch(deleteSubcategory(deleteSubcategoryId));
    }
    handleCloseDeleteDialog();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" gutterBottom>
          Subcategory Management
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Add />}
          onClick={handleOpenDialog}
          sx={{ mb: 2 }}
        >
          Add Subcategory
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subcategoryData &&
              subcategoryData.map((subcategory) => (
                <TableRow key={subcategory._id}>
                  <TableCell>{subcategory.name}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => handleOpenDeleteDialog(subcategory._id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Subcategory</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={newSubcategory.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveSubcategory}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this subcategory?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubcategoryTable;
