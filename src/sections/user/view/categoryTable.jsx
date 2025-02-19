import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Add, Edit, Delete } from "@mui/icons-material";
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
  getAllCategory,
  addNewCategory,
  deleteCategory,
  updateCategory,
} from "src/redux/actions/categoryAction";

const initialCategoryData = {
  name: "",
  description: "",
  image: null,
};

const CategoryTable = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState(initialCategoryData);
  const [categoryData, setCategoryData] = useState(null);

  const dispatch = useDispatch();
  const allcategory = useSelector((state) => state.category.allcategory);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  useEffect(() => {
    if (allcategory) {
      setCategoryData(allcategory);
    }
  }, [allcategory]);

  const handleOpenDialog = (category = null) => {
    setEditingCategory(category);
    setNewCategory({
      name: category?.name || "",
      description: category?.description || "",
      image: null,
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingCategory(null);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setNewCategory((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSaveCategory = () => {
    const formData = new FormData();
    formData.append("name", newCategory.name);
    formData.append("description", newCategory.description);
    if (newCategory.image) formData.append("image", newCategory.image);

    if (editingCategory) {
      dispatch(updateCategory(editingCategory._id, formData));
    } else {
      dispatch(addNewCategory(formData));
    }

    handleCloseDialog();
  };

  const handleOpenDeleteDialog = (id) => {
    setDeleteCategoryId(id);
    setConfirmDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setConfirmDeleteDialog(false);
    setDeleteCategoryId(null);
  };

  const handleConfirmDelete = () => {
    if (deleteCategoryId) {
      dispatch(deleteCategory(deleteCategoryId));
    }
    handleCloseDeleteDialog();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" gutterBottom>
          Category Management
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ mb: 2 }}
        >
          Add Category
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoryData &&
              categoryData.map((category) => (
                <TableRow key={category._id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <IconButton
                      sx={{
                        position: "relative",
                        width: 2,
                        height: 2,
                      }}
                      color="default"
                      onClick={() => handleOpenDialog(category)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      sx={{
                        position: "relative",
                        width: 2,
                        height: 2,
                      }}
                      color="error"
                      onClick={() => handleOpenDeleteDialog(category._id)}
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
          {editingCategory ? "Edit Category" : "Add Category"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={newCategory.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={newCategory.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Upload Image
          </Typography>
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
            accept="image/*"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveCategory}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this category?
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

export default CategoryTable;
