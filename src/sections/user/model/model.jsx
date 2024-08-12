import PropTypes from 'prop-types'


import { Modal as BaseModal } from '@mui/base/Modal';
import { styled, css } from '@mui/system';
import Fade from '@mui/material/Fade';
import { Box, Stack, TextField, Button } from '@mui/material';

import { forwardRef } from 'react';


function CustomeModel({
    label,
    addImage,
    data,
    handleAdd,
    open,
    handleClose,
    handleImage,
    handleData,
    isChange
}) {
    return (
        <>
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
                                    value={data?.name}
                                    label={label.name}
                                    sx={{
                                        width: '350px',
                                    }}
                                    onChange={handleData}
                                />
                                <TextField
                                    name="description"
                                    value={data?.description}
                                    label={label.description}
                                    sx={{
                                        width: '350px',
                                    }}
                                    multiline
                                    onChange={handleData}
                                />
                            </Stack>
                            <Stack direction="column" spacing={5}>
                                {addImage && !isChange &&
                                    <>
                                        <Box>
                                            {data.image && <img
                                                src={URL.createObjectURL(data.image)}
                                                width="250px"
                                                height="250px"
                                            />}
                                        </Box>
                                        <Box>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImage}
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
                                    </>
                                }
                                {isChange && addImage &&
                                    <>
                                        <Box>
                                            {typeof data.image === "string" && data.image && <img
                                                src={data.image}
                                                width="250px"
                                                height="250px"
                                            />}
                                            {typeof data.image !== "string" && data.image && <img
                                                src={URL.createObjectURL(data.image)}
                                                width="250px"
                                                height="250px"
                                            />}
                                        </Box>
                                        <Box>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImage}
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
                                    </>
                                }
                                {isChange ?
                                    <Box>
                                        <Button onClick={handleAdd}>
                                            Update
                                        </Button>
                                        <Button color='error' onClick={handleClose}>
                                            Cancel
                                        </Button>
                                    </Box>
                                    :
                                    <Box>
                                        <Button onClick={handleAdd}>
                                            Add
                                        </Button>
                                        <Button color='error' onClick={handleClose}>
                                            Cancel
                                        </Button>
                                    </Box>
                                }
                            </Stack>
                        </Stack>
                    </ModalContent>
                </Fade>
            </Modal>
        </>
    )
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


export default CustomeModel



