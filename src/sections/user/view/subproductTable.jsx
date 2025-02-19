import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Add, Edit, Delete } from "@mui/icons-material";
import {
  Box,
  Paper,
  Table,
  Button,
  Dialog,
  Select,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  InputLabel,
  IconButton,
  Typography,
  FormControl,
  DialogTitle,
  DialogActions,
  DialogContent,
  TableContainer,
} from "@mui/material";

import { getAllCategory } from "src/redux/actions/categoryAction";
import { getAllSubcategories } from "src/redux/actions/subcategoryAction";
import {
  addNewSubproduct,
  deleteSubproduct,
  updateSubproduct,
  getAllSubproducts,
} from "src/redux/actions/subproductAction";

const initialSubproductData = {
  name: "",
  category: "",
  subcategory: "",
  features: "",
};

const SubproductTable = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSubproduct, setEditingSubproduct] = useState(null);
  const [newSubproduct, setNewSubproduct] = useState(initialSubproductData);

  const dispatch = useDispatch();
  const allsubproducts = useSelector(
    (state) => state.subproduct.allsubproducts
  );
  const allsubcategories = useSelector(
    (state) => state.subcategory.allsubcategories
  );
  const allcategories = useSelector((state) => state.category.allcategory);

  useEffect(() => {
    dispatch(getAllSubproducts());
    dispatch(getAllSubcategories());
    dispatch(getAllCategory());
  }, [dispatch]);

  useEffect(() => {
    console.log("Subproducts:", allsubproducts);
    console.log("Subcategories:", allsubcategories);
    console.log("Categories:", allcategories);
  }, [allsubproducts, allsubcategories, allcategories]);

  const handleOpenDialog = (subproduct = null) => {
    console.log("Opening Dialog for:", subproduct ? "Editing" : "Adding New");

    setEditingSubproduct(subproduct);
    setNewSubproduct({
      name: subproduct?.name || "",
      category: subproduct?.category?._id || "",
      subcategory: subproduct?.subcategory?._id || "",
      features: subproduct?.features?.join("\n") || "",
    });

    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingSubproduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubproduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveSubproduct = () => {
    const formData = {
      ...newSubproduct,
      features: newSubproduct.features.split("\n").map((item) => item.trim()),
    };

    console.log("Saving Subproduct:", formData);

    if (editingSubproduct) {
      dispatch(updateSubproduct(editingSubproduct._id, formData));
    } else {
      dispatch(addNewSubproduct(formData));
    }

    handleCloseDialog();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" gutterBottom>
          Subproduct Management
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ mb: 2 }}
        >
          Add Subproduct
        </Button>
      </Box>

      {/* Table for displaying subproducts */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Subcategory</TableCell>
              <TableCell>Features</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allsubproducts &&
              allsubproducts.map((subproduct) => (
                <TableRow key={subproduct._id}>
                  <TableCell>{subproduct.name}</TableCell>
                  <TableCell>{subproduct.category?.name}</TableCell>
                  <TableCell>{subproduct.subcategory?.name}</TableCell>
                  <TableCell>{subproduct.features.join(", ")}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="default"
                      onClick={() => handleOpenDialog(subproduct)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => dispatch(deleteSubproduct(subproduct._id))}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {editingSubproduct ? "Edit Subproduct" : "Add Subproduct"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={newSubproduct.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          {/* Category Selection */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={newSubproduct.category}
              onChange={handleInputChange}
            >
              {allcategories?.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Subcategory Selection */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Subcategory</InputLabel>
            <Select
              name="subcategory"
              value={newSubproduct.subcategory}
              onChange={handleInputChange}
            >
              {allsubcategories?.map((sub) => (
                <MenuItem key={sub._id} value={sub._id}>
                  {sub.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Features Input */}
          <TextField
            label="Features"
            name="features"
            value={newSubproduct.features}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveSubproduct}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubproductTable;
