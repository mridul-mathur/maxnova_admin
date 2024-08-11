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
import { deleteCompany } from 'src/redux/actions/companyAction';
import { deleteCategory } from 'src/redux/actions/categoryAction';

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

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const [data, setData] = useState({
    name: name,
    description: descripiton,
    image: isCompany ? image : null
  })

  const handleDelete = () => {
    if(isCompany){
      dispatch(deleteCompany(id))
    }else{
      dispatch(deleteCategory(id))
    }
  } 

  const handleEdit = () => {

  }

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
        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        {/* <CustomeModel 
          
        /> */}
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