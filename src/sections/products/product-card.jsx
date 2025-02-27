import PropTypes from "prop-types";
import { useState, useEffect, forwardRef } from "react";

import { css, styled } from "@mui/system";
import {
  Box,
  Card,
  Fade,
  Link,
  Stack,
  Select,
  Button,
  MenuItem,
  Checkbox,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  FormControlLabel,
  Modal as BaseModal,
} from "@mui/material";

export default function ShopProductCard({
  product,
  company,
  category,
  handleDelete,
  handleEdit,
}) {
  const [open, setOpen] = useState(false);
  const [updateState, setUpdateState] = useState(product);

  useEffect(() => {
    setUpdateState(product);
  }, [product]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setUpdateState(product);
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setUpdateState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUpdateState((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const onDelete = () => {
    handleDelete(product._id);
    handleClose();
  };

  const onEdit = () => {
    handleEdit(product._id, updateState);
    handleClose();
  };

  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>
        <Box
          component="img"
          alt={product.name}
          src={product.image}
          sx={{
            top: 0,
            width: 1,
            height: 1,
            objectFit: "cover",
            position: "absolute",
          }}
        />
      </Box>

      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <ModalContent sx={style}>
            <Stack direction="row" spacing={4}>
              <Stack direction="column" spacing={2}>
                <TextField
                  name="name"
                  value={updateState.name}
                  label="Product Name"
                  sx={{ width: "350px" }}
                  onChange={handleChange}
                />
                <FormControl>
                  <InputLabel>Company</InputLabel>
                  <Select
                    name="company_id"
                    value={updateState.company_id}
                    onChange={handleChange}
                  >
                    {company?.map((data) => (
                      <MenuItem key={data._id} value={data._id}>
                        {data.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category_id"
                    value={updateState.category_id}
                    onChange={handleChange}
                  >
                    {category?.map((data) => (
                      <MenuItem key={data._id} value={data._id}>
                        {data.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  name="usp"
                  value={updateState.usp}
                  label="USP"
                  sx={{ width: "350px" }}
                  multiline
                  onChange={handleChange}
                />
                <TextField
                  name="ingredients"
                  value={updateState.ingredients}
                  label="Ingredients"
                  sx={{ width: "350px" }}
                  multiline
                  maxRows={4}
                  onChange={handleChange}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="is_top"
                      checked={updateState.is_top}
                      onChange={handleChange}
                    />
                  }
                  label="Is Top Product?"
                />
              </Stack>

              <Stack direction="column" spacing={5}>
                <Box>
                  {updateState.image && (
                    <img
                      src={
                        typeof updateState.image === "string"
                          ? updateState.image
                          : URL.createObjectURL(updateState.image)
                      }
                      alt="preview"
                      width="250px"
                      height="250px"
                    />
                  )}
                </Box>
                <Box>
                  <label htmlFor="image-file-input">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      id="image-file-input"
                    />

                    <Button variant="outlined" component="span">
                      Select Image
                    </Button>
                  </label>
                </Box>
                <Box>
                  <Button onClick={onEdit}>Save</Button>
                  <Button color="error" onClick={onDelete}>
                    Delete
                  </Button>
                </Box>
              </Stack>
            </Stack>
          </ModalContent>
        </Fade>
      </Modal>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Button onClick={handleOpen}>
          <Link
            color="inherit"
            underline="hover"
            sx={{ fontWeight: "bold" }}
            noWrap
          >
            {product.name}
          </Link>
        </Button>
        <Typography variant="subtitle2">
          Company: {product.company_name}
        </Typography>
        <Typography variant="subtitle2">
          Category: {product.category_name}
        </Typography>
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  company: PropTypes.array.isRequired,
  category: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

const Backdrop = forwardRef((props, ref) => (
  <Fade in={props.open}>
    <div ref={ref} {...props} />
  </Fade>
));

Backdrop.propTypes = { open: PropTypes.bool };

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
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
    background-color: ${theme.palette.mode === "dark" ? "#1C2025" : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? "#434D5B" : "#DAE2ED"};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.2)"};
    padding: 40px;
    color: ${theme.palette.mode === "dark" ? "#F3F6F9" : "#1C2025"};
  `
);
