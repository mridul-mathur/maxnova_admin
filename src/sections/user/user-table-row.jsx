import { useState } from "react";
import PropTypes from "prop-types";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";

import Iconify from "src/components/iconify";
import CustomeModel from "./model/model";
import { useDispatch } from "react-redux";
import { deleteCompany, updateCompany } from "src/redux/actions/companyAction";
import {
  deleteCategory,
  updateCategory,
} from "src/redux/actions/categoryAction";

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

  const [open, setOpen] = useState(null);
  const [modelOpen, setModelOpen] = useState(false);

  const initialData = { name, description: descripiton, image };

  const [data, setData] = useState(initialData);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleOpen = () => {
    setModelOpen(true);
  };

  const handleClose = () => {
    handleCloseMenu();
    setModelOpen(false);
    setData(initialData);
  };

  const handleChangeData = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleDelete = () => {
    if (isCompany) {
      dispatch(deleteCompany(id));
    } else {
      dispatch(deleteCategory(id));
    }
  };

  const handleEdit = () => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (typeof data.image !== "string") {
      formData.append("image", data.image);
    }
    if (isCompany) {
      dispatch(updateCompany(id, formData));
    } else {
      dispatch(updateCategory(id, formData));
    }
    handleClose();
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell component="th" scope="row" padding="checkbox">
          <Avatar src={typeof image === "string" ? image : null} alt={name} />
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2" noWrap>
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

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{ sx: { width: 140 } }}
      >
        <MenuItem onClick={handleOpen}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <CustomeModel
          open={modelOpen}
          addImage
          data={data}
          label={{
            name: isCompany ? "Company name" : "Category name",
            description: isCompany
              ? "Description of company"
              : "Description of category",
          }}
          handleClose={handleClose}
          handleData={handleChangeData}
          handleImage={handleFileChange}
          handleAdd={handleEdit}
          isChange
        />
        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  selected: PropTypes.bool,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  descripiton: PropTypes.string,
  isCompany: PropTypes.bool,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
