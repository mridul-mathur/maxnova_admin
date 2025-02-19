import { forwardRef } from "react";
import PropTypes from "prop-types";

import Fade from "@mui/material/Fade";
import { css, styled } from "@mui/system";
import { grey } from "@mui/material/colors";
import { Modal as BaseModal } from "@mui/base/Modal";
import { Box, Stack, Button, TextField } from "@mui/material";

CustomeModel.propTypes = {
  label: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  addImage: PropTypes.bool.isRequired,
  addCatalog: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(File)]),
    catalog: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(File),
    ]),
  }).isRequired,
  handleAdd: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleImage: PropTypes.func.isRequired,
  handleCatelog: PropTypes.func.isRequired,
  handleData: PropTypes.func.isRequired,
  isChange: PropTypes.bool.isRequired,
};

function CustomeModel({
  label,
  addImage,
  addCatalog,
  data,
  handleAdd,
  open,
  handleClose,
  handleImage,
  handleCatelog,
  handleData,
  isChange,
}) {
  const renderCatalog = () => {
    if (!addCatalog) return null;
    if (data.catalog && typeof data.catalog === "string") {
      return (
        <a href={data.catalog} download>
          Download Catalog
        </a>
      );
    }
    return data.catalog ? (
      <span>{data.catalog.name}</span>
    ) : (
      "No Catalog Selected"
    );
  };

  const renderImage = () => {
    if (!addImage) return null;
    if (data.image && typeof data.image === "string") {
      return (
        <img src={data.image} alt="Uploaded" width="250px" height="250px" />
      );
    }
    if (data.image) {
      return (
        <img
          src={URL.createObjectURL(data.image)}
          alt="Uploaded"
          width="250px"
          height="250px"
        />
      );
    }
    return null;
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: StyledBackdrop }}
    >
      <Fade in={open}>
        <ModalContent sx={style}>
          <Stack direction="row" spacing={25}>
            <Stack direction="column" spacing={2}>
              <TextField
                name="name"
                value={data?.name || ""}
                label={label.name}
                sx={{ width: "350px" }}
                onChange={handleData}
              />
              <TextField
                name="description"
                value={data?.description || ""}
                label={label.description}
                sx={{ width: "350px" }}
                multiline
                onChange={handleData}
              />
            </Stack>
            <Stack direction="column" spacing={5}>
              <Box>{renderCatalog()}</Box>
              <Box>
                <label htmlFor="catalog-file-input">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleCatelog}
                    style={{ display: "none" }}
                    id="catalog-file-input"
                    name="catalog"
                  />
                  <Button variant="outlined" component="span">
                    Select Catalog
                  </Button>
                </label>
              </Box>

              <Box>{renderImage()}</Box>
              <Box>
                <label htmlFor="image-file-input">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    style={{ display: "none" }}
                    id="image-file-input"
                    name="image"
                  />
                  <Button variant="outlined" component="span">
                    Select Image
                  </Button>
                </label>
              </Box>

              <Box>
                <Button onClick={handleAdd}>
                  {isChange ? "Update" : "Add"}
                </Button>
                <Button color="error" onClick={handleClose}>
                  Cancel
                </Button>
              </Box>
            </Stack>
          </Stack>
        </ModalContent>
      </Fade>
    </Modal>
  );
}

const Backdrop = forwardRef((props, ref) => {
  const { open, ...other } = props;
  return (
    <Fade in={open}>
      <div ref={ref} {...other} />
    </Fade>
  );
});

Backdrop.propTypes = {
  open: PropTypes.bool.isRequired,
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
};

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 40px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};
  `
);

export default CustomeModel;
