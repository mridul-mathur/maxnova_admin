import clsx from "clsx";
import * as React from "react";
import PropTypes from "prop-types";

import { styled } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function EditModel({ content, onSave }) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState(content);
  const [imagePreview, setImagePreview] = React.useState(content.image || "");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const newFormData = new FormData();
      newFormData.append("file", file);
      newFormData.append("upload_preset", "your_upload_preset");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        {
          method: "POST",
          body: newFormData,
        }
      );

      const data = await response.json();
      const imageUrl = data.secure_url;

      setFormData((prevData) => ({
        ...prevData,
        image: imageUrl,
      }));
      setImagePreview(imageUrl);
    }
  };

  const handleSave = () => {
    onSave(formData);
    handleClose();
  };

  const isPrimitive = (value) => value !== Object(value);

  return (
    <div>
      <button
        onClick={handleOpen}
        type="button"
        style={{
          background: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          color: "black",
          borderRadius: "6px",
          border: "1px solid #000",
        }}
      >
        <EditNoteIcon sx={{ p: 0, m: 0, width: 20 }} />
        Edit
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
        slots={{ backdrop: StyledBackdrop }}
        sx={{ width: "100vw" }}
      >
        <ModalContent sx={{ width: "50%" }}>
          <Typography variant="h6" id="edit-modal-title">
            Edit Content
          </Typography>
          {Object.keys(formData)
            .filter((key) => isPrimitive(formData[key]) && key !== "image")
            .map((key) => (
              <TextField
                key={key}
                name={key}
                label={capitalizeFirstLetter(key)}
                value={formData[key]}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            ))}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">Upload Image</Typography>
            <input type="file" onChange={handleImageChange} />
            {imagePreview && (
              <Box sx={{ mt: 2 }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: "100%", maxHeight: "200px" }}
                />
              </Box>
            )}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </ModalContent>
      </Modal>
    </div>
  );
}

EditModel.propTypes = {
  content: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "base-Backdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled("div")(
  ({ theme }) => `
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${
        theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"
      };
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};
  `
);

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);
