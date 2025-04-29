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
  getAllCompany,
  addNewCompany,
  deleteCompany,
  updateCompany,
} from "src/redux/actions/companyAction";

const initialCompanyData = {
  name: "",
  description: "",
  image: null,
  catalog: null,
};

const CompanyTable = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [deleteCompanyId, setDeleteCompanyId] = useState(null);
  const [editingCompany, setEditingCompany] = useState(null);
  const [newCompany, setNewCompany] = useState(initialCompanyData);
  const [companyData, setCompanyData] = useState(null);

  const dispatch = useDispatch();
  const allcompany = useSelector((state) => state.company.allcompany);

  useEffect(() => {
    dispatch(getAllCompany());
  }, [dispatch]);

  useEffect(() => {
    if (allcompany) {
      setCompanyData(allcompany);
    }
  }, [allcompany]);
  const handleOpenDialog = (company = null) => {
    setEditingCompany(company);
    setNewCompany({
      name: company?.name || "",
      description: company?.description || "",
      image: company?.image || null,
      catalog: company?.catalog || null,
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingCompany(null);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      // For file inputs (image and catalog)
      const file = files[0];
      console.log(`New ${name} file:`, file);
      setNewCompany((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      // For text inputs (name and description)
      setNewCompany((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSaveCompany = () => {
    const formData = new FormData();
    formData.append("name", newCompany.name);
    formData.append("description", newCompany.description);

    // Handle image update
    if (newCompany.image) {
      if (typeof newCompany.image === "string") {
        // If it's a string (existing image URL), don't append it
        console.log("Using existing image:", newCompany.image);
      } else {
        // If it's a File object (new image), append it
        formData.append("image", newCompany.image);
        console.log("Appending new image:", newCompany.image.name);
      }
    }

    // Handle catalog update
    if (newCompany.catalog) {
      if (typeof newCompany.catalog === "string") {
        // If it's a string (existing catalog URL), don't append it
        console.log("Using existing catalog:", newCompany.catalog);
      } else {
        // If it's a File object (new catalog), append it
        formData.append("catalog", newCompany.catalog);
        console.log("Appending new catalog:", newCompany.catalog.name);
      }
    }

    // Log FormData contents
    console.log("FormData contents before submission:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value instanceof File ? `${value.name} (File)` : value);
    }

    if (editingCompany) {
      console.log("Updating company:", editingCompany._id);
      dispatch(updateCompany(editingCompany._id, formData))
        .then(() => {
          console.log("Company updated successfully");
          handleCloseDialog();
        })
        .catch((error) => {
          console.error("Error updating company:", error);
          // You might want to show an error message to the user here
        });
    } else {
      console.log("Adding new company");
      dispatch(addNewCompany(formData))
        .then(() => {
          console.log("Company added successfully");
          handleCloseDialog();
        })
        .catch((error) => {
          console.error("Error adding company:", error);
          // You might want to show an error message to the user here
        });
    }
  };

  const handleOpenDeleteDialog = (id) => {
    setDeleteCompanyId(id);
    setConfirmDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setConfirmDeleteDialog(false);
    setDeleteCompanyId(null);
  };

  const handleConfirmDelete = () => {
    if (deleteCompanyId) {
      dispatch(deleteCompany(deleteCompanyId));
    }
    handleCloseDeleteDialog();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" gutterBottom>
          Company Management
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ mb: 2 }}
        >
          Add Company
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Catalog</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companyData &&
              companyData.map((company) => (
                <TableRow key={company._id}>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.description}</TableCell>
                  <TableCell>
                    {company.image ? (
                      <img
                        src={company.image}
                        alt={company.name}
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
                  <TableCell>
                    {company.catalog ? (
                      <a
                        href={company.catalog}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    ) : (
                      "No Catalog"
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
                      onClick={() => handleOpenDialog(company)}
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
                      onClick={() => handleOpenDeleteDialog(company._id)}
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
          {editingCompany ? "Edit Company" : "Add Company"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={newCompany.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={newCompany.description}
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
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Upload Catalog
          </Typography>
          <input
            type="file"
            name="catalog"
            onChange={handleInputChange}
            accept=".pdf"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveCompany}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this company?</Typography>
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

export default CompanyTable;
