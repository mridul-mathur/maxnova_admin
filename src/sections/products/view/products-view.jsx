import { useEffect, useState, forwardRef } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import PropTypes from 'prop-types';
import { styled, css } from '@mui/system';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';
import ProductCartWidget from '../product-cart-widget';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, addNewProduct, deleteProduct, updateProduct } from '../../../redux/actions/productAction';
import { getAllCompany } from 'src/redux/actions/companyAction';
import { getAllCategory } from 'src/redux/actions/categoryAction';

import Fade from '@mui/material/Fade';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Modal as BaseModal } from '@mui/base/Modal';
import { Button, FormControl, InputLabel, TextField, Box, FormControlLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';


// ----------------------------------------------------------------------

const initialState = {
  name: null,
  category_id: null,
  company_id: null,
  usp: null,
  ingredients: null,
  image: null
}

export default function ProductsView() {
  const [openFilter, setOpenFilter] = useState(false);
  const [state, setState] = useState(null)
  const [getCompany, setGetCompany] = useState(null)
  const [getCategory, setGetCategory] = useState(null)
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.allproducts)
  const company = useSelector(state => state.company.allcompany);
  const category = useSelector(state => state.category.allcategory);
  const [addProduct, setAddProduct] = useState(initialState)

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setAddProduct(initialState)
    setChecked(false)
  }

  const [checked, setChecked] = useState(false);

  const handleTopProduct = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCompany());
    dispatch(getAllCategory())
  }, [])

  useEffect(() => {
    if (company) {
      setGetCompany(company)
    }
  }, [company])

  useEffect(() => {
    if (category) {
      setGetCategory(category)
    }
  }, [category])

  useEffect(() => {
    if (products) {
      setState(products)
    }
  }, [products])

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleChangeProduct = (event) => {
    const { value } = event.target
    setAddProduct((prev) => ({
      ...prev,
      name: value
    }))
  }


  const handleChangeUsp = (event) => {
    const { value } = event.target
    setAddProduct((prev) => ({
      ...prev,
      usp: value
    }))
  }

  const handleChangeIngredients = (event) => {
    const { value } = event.target
    setAddProduct((prev) => ({
      ...prev,
      ingredients: value
    }))
  }

  const handleChangeCompany = (event) => {
    const { value } = event.target
    setAddProduct((prev) => ({
      ...prev,
      company_id: value
    }))
  };

  const handleChangeCategory = (event) => {
    const { value } = event.target
    setAddProduct((prev) => ({
      ...prev,
      category_id: value
    }))
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setAddProduct((prev) => ({
        ...prev,
        image: file
      }))
      return;
    }

    // File type validation
    // if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    //     setError("Invalid file type. Please upload a JPEG, PNG, or GIF image.");
    //     return;
    // }

    // // File size validation
    // if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    //     setError(
    //         `File size exceeds ${MAX_FILE_SIZE_MB} MB. Please choose a smaller file.`
    //     );
    //     return;
    // }

    setAddProduct((prev) => ({
      ...prev,
      image: file
    }));
    // setError(null);
  };

  const handleAddProduct = async () => {
    const data = new FormData();
    data.append('name', addProduct.name)
    data.append('category_id', addProduct.category_id)
    data.append('company_id', addProduct.company_id)
    data.append('usp', addProduct.usp)
    data.append('ingredients', addProduct.ingredients)
    data.append('image', addProduct.image)
    data.append('is_top', checked)
    dispatch(addNewProduct(data))
    handleClose()
  }

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
  }


  const handleEdit = (id, productDetails) => {
    const data = new FormData();
    console.log(productDetails)
    data.append('name', productDetails.name)
    data.append('category_id', productDetails.category_id)
    data.append('company_id', productDetails.company_id)
    data.append('usp', productDetails.usp)
    data.append('ingredients', productDetails.ingredients)
    if(typeof(productDetails.image) !== "string"){
      data.append('image', productDetails.image)
    }
    data.append('is_top', productDetails.is_top)
    dispatch(updateProduct(id, data))
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Products
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <Button onClick={handleOpen}>
            Add New Product
          </Button>

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
                      value={addProduct.name}
                      label="Product Name"
                      sx={{
                        width: '350px',
                      }}
                      onChange={handleChangeProduct}
                    />
                    <FormControl >
                      <InputLabel id="demo-simple-select-label">Company</InputLabel>
                      <Select
                        value={addProduct.company_id}
                        label="Company"
                        onChange={handleChangeCompany}
                      // sx={{b }}
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
                        value={addProduct.category_id}
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
                      value={addProduct.usp}
                      label="USP"
                      sx={{
                        width: '350px',
                      }}
                      multiline
                      onChange={handleChangeUsp}
                    />
                    <TextField
                      name="ingredients"
                      value={addProduct.ingredients}
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
                          checked={checked}
                          onChange={handleTopProduct}
                        />
                      }
                      label="Is Top Product?"
                    />
                  </Stack>
                  <Stack direction="column" spacing={5}>
                    <Box>
                      {addProduct.image && <img
                        src={URL.createObjectURL(addProduct.image)}
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
                      <Button onClick={handleAddProduct}>
                        Add
                      </Button>
                      <Button color='error' onClick={handleClose}>
                        Cancel
                      </Button>
                    </Box>
                  </Stack>
                </Stack>
              </ModalContent>
            </Fade>
          </Modal>

          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <ProductSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {state && getCompany && getCategory && state?.map((product) => (
          <Grid key={product._id} xs={12} sm={6} md={3}>
            <ProductCard product={product} company={getCompany} category={getCategory} handleDelete={handleDelete} handleEdit={handleEdit} />
          </Grid>
        ))}
      </Grid>

      <ProductCartWidget />
    </Container>
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