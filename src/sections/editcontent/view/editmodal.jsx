import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useState } from "react";

import { styled } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import {
  Box,
  Button,
  TextField,
  Typography,
  ImageListItem,
} from "@mui/material";

function ImageInput({ value, name, handleChange }) {
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
      <input type="file" accept="image/*" name={name} onChange={handleChange} />
    </Box>
  );
}

ImageInput.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  handleChange: PropTypes.func,
};

function TextFieldInput({ value, name, handleChange }) {
  return (
    <TextField
      value={value}
      fullWidth
      margin="normal"
      name={name}
      onChange={handleChange}
    />
  );
}

TextFieldInput.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  handleChange: PropTypes.func,
};

function renderInputField(data, key, handleChange, handleOpenAddModal) {
  if (typeof data === "string") {
    if (
      data.includes(".jpg") ||
      data.includes(".png") ||
      data.includes(".jpeg")
    ) {
      return <ImageInput value={data} name={key} handleChange={handleChange} />;
    }
    return (
      <TextFieldInput value={data} name={key} handleChange={handleChange} />
    );
  }
  if (Array.isArray(data) || (typeof data === "object" && data !== null)) {
    return (
      <>
        {data &&
          data.length > 0 &&
          typeof data[0] === "string" &&
          data.some(
            (item) =>
              item.includes(".jpg") ||
              item.includes(".png") ||
              item.includes(".jpeg")
          ) &&
          data.map((item, index) => (
            <Box key={index} sx={{ mt: 2 }}>
              <img src={item} alt={index} />
            </Box>
          ))}
        {data &&
          data.length > 0 &&
          typeof data[0] === "object" &&
          data.map((item, index) => (
            <Box key={index} sx={{ px: 2, py: 1, background: "#f6f6f6" }}>
              {Object.keys(item).map((nestedKey) => (
                <Box key={nestedKey}>
                  <Typography variant="body1">
                    <strong>{capitalizeFirstLetter(nestedKey)}</strong>
                  </Typography>
                  {renderInputField(
                    item[nestedKey],
                    nestedKey,
                    handleChange,
                    handleOpenAddModal
                  )}
                </Box>
              ))}
              <Button variant="outlined" onClick={() => handleDelete(index)}>
                Delete
              </Button>
            </Box>
          ))}
        <Button variant="contained" onClick={handleOpenAddModal} sx={{ my: 2 }}>
          + Add
        </Button>
      </>
    );
  }
  return null;
}

export default function EditModal({ content, open, onClose, handleChange }) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addContent, setAddContent] = useState({});

  const handleOpenAddModal = (key) => {
    setAddContent(content[key]);
    setAddModalOpen(true);
  };

  return (
    <div>
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
          <Typography variant="h4" id="edit-modal-title">
            Edit Content
          </Typography>
          {Object.keys(content).map((key) => (
            <Box key={key} sx={{ mt: 2 }}>
              <Typography variant="h5">
                <strong>{capitalizeFirstLetter(key)}</strong>
              </Typography>
              {renderInputField(content[key], key, handleChange, () =>
                handleOpenAddModal(key)
              )}
            </Box>
          ))}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 2,
              width: "100%",
            }}
          >
            <Button onClick={onClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button onClick={onClose} variant="contained">
              Save
            </Button>
          </Box>
        </ModalContent>
      </Modal>

      {addModalOpen && (
        <AddModal
          data={addContent[0]}
          content={addContent}
          open={addModalOpen}
          onClose={() => setAddModalOpen(false)}
        />
      )}
    </div>
  );
}

EditModal.propTypes = {
  content: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

function AddModal({ data, open, onClose }) {
  return (
    <div>
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
          <Typography variant="h4" id="edit-modal-title">
            Add Content
          </Typography>

          <Box
            sx={{
              display: "-ms-flexbox",
              justifyContent: "flex-end",
              mt: 2,
            }}
          >
            {data &&
              data.length > 0 &&
              Array.isArray(data) &&
              data.some(
                (item) =>
                  item.includes(".jpg") ||
                  item.includes(".png") ||
                  item.includes(".jpeg")
              ) &&
              data.map((item, index) => (
                <Box key={index} sx={{ mt: 2 }}>
                  <ImageInput value={item} name={index} />
                </Box>
              ))}
            {typeof data === "object" &&
              Object.keys(data).map((key) => (
                <Box key={key}>
                  {data[key].includes(".jpg") ||
                  data[key].includes(".png") ||
                  data[key].includes(".jpeg") ? (
                    <>
                      <Typography variant="h6">{key}</Typography>
                      <ImageListItem
                        key={key}
                        sx={{ width: "250px", height: "auto", my: 2 }}
                      >
                        <img src={data[key]} alt="hehe" />
                      </ImageListItem>
                    </>
                  ) : (
                    <TextField
                      label={key}
                      value={data[key]}
                      fullWidth
                      margin="normal"
                      name={key}
                      sx={{ my: 1, p: 0 }}
                    />
                  )}
                </Box>
              ))}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 2,
                width: "100%",
              }}
            >
              <Button onClick={onClose} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button onClick={onClose} variant="contained">
                Add
              </Button>
            </Box>
          </Box>
        </ModalContent>
      </Modal>
    </div>
  );
}

AddModal.propTypes = {
  data: PropTypes.object.isRequired,
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
