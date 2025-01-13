import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomeModel from './model/model';
import { useDispatch } from 'react-redux';
import { deleteCompany, updateCompany } from 'src/redux/actions/companyAction';
import { deleteCategory, updateCategory } from 'src/redux/actions/categoryAction';

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

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const initialCompanyData = {
    name: name,
    description: descripiton,
    image: image
  }

  const initialCategoryData = {
    name: name,
    description: descripiton,
  }

  const [companyData, setCompanyData] = useState({
    name: name,
    description: descripiton,
    image: image
  })

  const [categoryData, setCategoryData] = useState({
    name: name,
    description: descripiton,
  })

  const handleChangeData = (event) => {
    const { value } = event.target
    if (isCompany) {
      setCompanyData((prev) => ({
        ...prev,
        [event.target.name]: value
      }))
    } else {
      setCategoryData((prev) => ({
        ...prev,
        [event.target.name]: value
      }))
    }
  }

  const handleOpen = () => {
    setModelOpen(true)
  }

  const handleClose = () => {
    handleCloseMenu()
    setModelOpen(false)
    if(isCompany){
      setCompanyData(initialCompanyData)
    }else{
      setCategoryData(initialCategoryData)
    }
  }

  const handleDelete = () => {
    if (isCompany) {
      dispatch(deleteCompany(id))
    } else {
      dispatch(deleteCategory(id))
    }
  }

  const handleEdit = () => {
    if (isCompany) {
      const data = new FormData();
      data.append('name', companyData.name)
      data.append('description', companyData.description)
      if(typeof companyData.image !== "string"){
        data.append('image', companyData.image)
      }
      dispatch(updateCompany(id, data))
    } else {
      dispatch(updateCategory(id, categoryData))
    }
    handleClose()
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    setCompanyData((prev) => ({
      ...prev,
      image: file
    }));
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell component="th" scope="row" padding="checkbox">
          <Typography variant="subtitle2" noWrap sx={{ pl: 1 }}>
            {name}
          </Typography>
        </TableCell>

        <TableCell></TableCell>


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
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleOpen}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <CustomeModel
          open={modelOpen}
          addImage={isCompany ? true : false}
          data={isCompany ? companyData : categoryData}
          label={{
            name: isCompany ? "Company name" : "Category name",
            description: isCompany ? "Description of company" : "Description of category"
          }}
          handleClose={handleClose}
          handleData={handleChangeData}
          handleImage={handleFileChange}
          handleAdd={handleEdit}
          isChange={true}
        />
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};
