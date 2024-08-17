import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useState } from "react";

import { styled } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Box, Button, TextField, Typography } from "@mui/material";

function ImageInput({ value }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="body1">Upload Image</Typography>
      {value && (
        <img
          src={value}
          alt="Preview"
          style={{ maxWidth: "250px", height: "auto" }}
        />
      )}
      <input type="file" accept="image/*" />
    </Box>
  );
}

ImageInput.propTypes = {
  value: PropTypes.string,
};

function TextFieldInput({ value }) {
  const [inputValue, setInputValue] = useState(value);
  const valonChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <TextField
      placeholder={value}
      value={inputValue}
      onChange={valonChange}
      fullWidth
      margin="normal"
    />
  );
}

TextFieldInput.propTypes = {
  value: PropTypes.string,
};

function renderInputField(data, handleOpenNestedModal) {
  if (typeof data === "string") {
    if (
      data.includes(".jpg") ||
      data.includes(".png") ||
      data.includes(".jpeg")
    ) {
      return <ImageInput value={data} />;
    }
    return <TextFieldInput value={data} />;
  }

  if (Array.isArray(data) || (typeof data === "object" && data !== null)) {
    return (
      <>
        {data &&
          data.length > 0 &&
          typeof data[0] === "string" &&
          data.map((item, index) => (
            <Box key={index} sx={{ mt: 2 }}>
              <img src={item} alt={index} />
            </Box>
          ))}
        {data &&
          data.length > 0 &&
          typeof data[0] === "object" &&
          Object.keys(data[0]).map((key) => (
            <Box key={key} sx={{ mt: 2 }}>
              <Typography variant="body1">
                <strong>{capitalizeFirstLetter(key)}</strong>
              </Typography>
              {renderInputField(data[0][key], handleOpenNestedModal)}
            </Box>
          ))}
        <Button variant="contained" onClick={handleOpenNestedModal}>
          + Add
        </Button>
      </>
    );
  }

  return null;
}

export default function EditModal({ content, open, onClose }) {
  const [nestedModalOpen, setNestedModalOpen] = useState(false);
  const [nestedContent, setNestedContent] = useState(null);

  const handleOpenNestedModal = (key) => {
    setNestedContent(content[key]);
    setNestedModalOpen(true);
  };

  return (
    <div>
      <Button
        onClick={() => {}}
        sx={{
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
      </Button>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
        slots={{ backdrop: StyledBackdrop }}
        sx={{ width: "100vw" }}
      >
        <ModalContent
          sx={{ width: "50%", maxHeight: "75vh", overflowY: "auto" }}
        >
          <Typography variant="h6" id="edit-modal-title">
            Edit Content
          </Typography>
          {Object.keys(content).map((key) => (
            <Box key={key} sx={{ mt: 2 }}>
              <Typography variant="body1">
                <strong>{capitalizeFirstLetter(key)}</strong>
              </Typography>
              {renderInputField(content[key], () => handleOpenNestedModal(key))}
            </Box>
          ))}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={onClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button onClick={onClose} variant="contained">
              Save
            </Button>
          </Box>
        </ModalContent>
      </Modal>

      {nestedModalOpen && (
        <EditModal
          content={nestedContent}
          open={nestedModalOpen}
          onClose={() => setNestedModalOpen(false)}
        />
      )}
    </div>
  );
}

EditModal.propTypes = {
  content: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
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
  className: PropTypes.string,
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
    box-shadow: 0 4px 12px ${
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
