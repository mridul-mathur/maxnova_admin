import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import { deleteCompany, updateCompany } from "src/redux/actions/companyAction";
import {
  deleteCategory,
  updateCategory,
} from "src/redux/actions/categoryAction";

import Iconify from "src/components/iconify";

import CustomeModel from "./model/model";

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  name,
  id,
  descripiton,
  isCompany,
  image,
}) {
  const dispatch = useDispatch();

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [modelOpen, setModelOpen] = useState(false);

  const initialData = {
    name,
    description: descripiton,
    image,
  };

  const [formData, setFormData] = useState(initialData);

  const handleOpenMenu = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  const handleOpenModel = () => {
    setModelOpen(true);
    handleCloseMenu();
  };

  const handleCloseModel = () => {
    setModelOpen(false);
    setFormData(initialData);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleDelete = () => {
    if (isCompany) {
      dispatch(deleteCompany(id));
    } else {
      dispatch(deleteCategory(id));
    }
    handleCloseMenu();
  };

  const handleEdit = () => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    if (typeof formData.image !== "string") {
      data.append("image", formData.image);
    }

    if (isCompany) {
      dispatch(updateCompany(id, data));
    } else {
      dispatch(updateCategory(id, data));
    }

    handleCloseModel();
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell component="th" scope="row" padding="checkbox">
          <Typography variant="subtitle2" noWrap sx={{ pl: 1 }}>
            {name}
          </Typography>
        </TableCell>

        <TableCell>{descripiton}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Popover Menu */}
      <Popover
        open={!!menuAnchor}
        anchorEl={menuAnchor}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleOpenModel}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      {/* Modal for Edit */}
      <CustomeModel
        open={modelOpen}
        addImage
        data={formData}
        label={{
          name: isCompany ? "Company name" : "Category name",
          description: isCompany
            ? "Description of company"
            : "Description of category",
        }}
        handleClose={handleCloseModel}
        handleData={handleInputChange}
        handleImage={handleFileChange}
        handleAdd={handleEdit}
        isChange
      />
    </>
  );
}

UserTableRow.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  descripiton: PropTypes.string.isRequired,
  isCompany: PropTypes.bool.isRequired,
  image: PropTypes.any,
  selected: PropTypes.bool,
};
