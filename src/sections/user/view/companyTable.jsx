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
      image: null,
      catalog: null,
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingCompany(null);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setNewCompany((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSaveCompany = () => {
    const formData = new FormData();
    formData.append("name", newCompany.name);
    formData.append("description", newCompany.description);
    if (newCompany.image) formData.append("image", newCompany.image);
    if (newCompany.catalog) formData.append("catalog", newCompany.catalog);

    if (editingCompany) {
      dispatch(updateCompany(editingCompany._id, formData));
    } else {
      dispatch(addNewCompany(formData));
    }

    handleCloseDialog();
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
