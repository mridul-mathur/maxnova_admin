import { useState, forwardRef, useEffect } from 'react';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Modal as BaseModal } from '@mui/base/Modal';
import { styled, css } from '@mui/system';
import Fade from '@mui/material/Fade';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Button, FormControl, InputLabel, TextField, FormControlLabel, Checkbox } from '@mui/material';

// ----------------------------------------------------------------------


export default function ShopProductCard({ product, company, category, handleDelete = (id) => { }, handleEdit = (id, productDetails) => { } }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setUpdateState(product)
    setOpen(false);
  }

  const getCompany = company
  const getCategory = category

  const [updateState, setUpdateState] = useState(product)

  const handleTopProduct = (event) => {
    const { checked } = event.target
    setUpdateState((prev) => ({
      ...prev,
      is_top: checked
    }))
  };


  const handleChangeProduct = (event) => {
    const { value } = event.target
    setUpdateState((prev) => ({
      ...prev,
      name: value
    }))
  }

  const handleChangeUsp = (event) => {
    const { value } = event.target
    setUpdateState((prev) => ({
      ...prev,
      usp: value
    }))
  }

  const handleChangeIngredients = (event) => {
    const { value } = event.target
    setUpdateState((prev) => ({
      ...prev,
      ingredients: value
    }))
  }

  const handleChangeCompany = (event) => {
    const { value } = event.target
    setUpdateState((prev) => ({
      ...prev,
      company_id: value
    }))
  };

  const handleChangeCategory = (event) => {
    const { value } = event.target
    setUpdateState((prev) => ({
      ...prev,
      category_id: value
    }))
  };

  const onDelete = () => {
    handleDelete(product._id)
    handleClose()
  }

  const onEdit = () => {
    handleEdit(product._id, updateState)
    handleClose()
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    setUpdateState((prev) => ({
      ...prev,
      image: file
    }));
  };



  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      src={product.image}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {renderImg}
      </Box>

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
                  value={updateState.name}
                  label="Product Name"
                  sx={{
                    width: '350px',
                  }}
                  onChange={handleChangeProduct}
                />
                <FormControl >
                  <InputLabel id="demo-simple-select-label">Company</InputLabel>
                  <Select
                    value={updateState.company_id}
                    label="Company"
                    onChange={handleChangeCompany}
                  >
                    {getCompany && getCompany.length > 0 ?
                      getCompany?.map((data) => (
                        <MenuItem name="company_id" value={data._id}>{data.name}</MenuItem>
                      ))
                      :
                      <MenuItem value="">none</MenuItem>
                    }
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={updateState.category_id}
                    label="Category"
                    onChange={handleChangeCategory}
                  >
                    {getCategory && getCategory.length > 0 ?
                      getCategory?.map((data) => (
                        <MenuItem name="company_id" value={data._id}>{data.name}</MenuItem>
                      ))
                      :
                      <MenuItem value="">none</MenuItem>
                    }
                  </Select>
                </FormControl>
                <TextField
                  name="usp"
                  value={updateState.usp}
                  label="USP"
                  sx={{
                    width: '350px',
                  }}
                  multiline
                  onChange={handleChangeUsp}
                />
                <TextField
                  name="ingredients"
                  value={updateState.ingredients}
                  label="Ingredients"
                  sx={{
                    width: '350px',
                  }}
                  multiline
                  onChange={handleChangeIngredients}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={updateState.is_top}
                      onChange={handleTopProduct}
                    />
                  }
                  label="Is Top Product?"
                />
              </Stack>
              <Stack direction="column" spacing={5}>
                <Box>
                  {typeof updateState.image === "string" && updateState.image && <img
                    src={updateState.image}
                    width="250px"
                    height="250px"
                  />}
                  {typeof updateState.image !== "string" && updateState.image && <img
                    src={URL.createObjectURL(updateState.image)}
                    width="250px"
                    height="250px"
                  />}
                </Box>
                <Box>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    id="image-file-input"
                    name='img'
                  />
                  <label htmlFor="image-file-input">
                    <Button variant="outlined" component="span">
                      Select Image
                    </Button>
                  </label>
                </Box>
                <Box>
                  <Button onClick={onEdit}>
                    Edit
                  </Button>
                  <Button color='error' onClick={onDelete}>
                    Delete
                  </Button>
                </Box>
              </Stack>
            </Stack>
          </ModalContent>
        </Fade>
      </Modal>

      <Stack spacing={2} sx={{ p: 3 }}>
        <a onClick={handleOpen}>
          <Link color="inherit" underline="hover" sx={{ fontWeight: 'bold' }} noWrap>
            {product.name}
          </Link>
        </a>
        <Typography variant="subtitle2">
          Company name : {product.company_name}
        </Typography>
        <Typography variant="subtitle2">
          Category name : {product.category_name}
        </Typography>

      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
  company: PropTypes.array,
  category: PropTypes.array,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func
};

const Backdrop = forwardRef((props, ref) => {
  const { open, ...other } = props;
  return (
    <Fade in={open}>
      <div ref={ref} {...other} />
    </Fade>
  );
});

Backdrop.propTypes = {
  open: PropTypes.bool,
};

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
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
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
};

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 40px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `,
);

// const TriggerButton = styled(Button)(
//   ({ theme }) => css`
//     font-family: 'IBM Plex Sans', sans-serif;
//     font-weight: 600;
//     font-size: 0.875rem;
//     line-height: 1.5;
//     padding: 8px 16px;
//     border-radius: 8px;
//     transition: all 150ms ease;
//     cursor: pointer;
//     background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
//     border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
//     color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
//     box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

//     &:hover {
//       background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
//       border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
//     }

//     &:active {
//       background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
//     }

//     &:focus-visible {
//       box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
//       outline: none;
//     }
//   `,
// );
