/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { AuthProvider } from './context/authContext';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { hideSnackBar } from './redux/actions/snackbarAction';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  // const dispatch = useDispatch()
  // const open = useSelector(state => state.snackbar.show)
  // const severity = useSelector(state => state.snackbar.severity)
  // const message = useSelector(state => state.snackbar.message)
  // const [state, setState] = useState({
  //   show: null,
  //   severity: null,
  //   message: null
  // })

  // useEffect(() => {
  //   setState((prev) => ({
  //     ...prev,
  //     severity: severity,
  //     show: open,
  //     message: message
  //   }))
  // }, [open, severity, message])

  // const handleClose = () => {
  //   dispatch(hideSnackBar())
  // }

  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
        {/* <Snackbar
          {...state}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={state.show}
          sx={{ width: 600, height: 200 }}
          onClose={handleClose}
          autoHideDuration={3000}
        >
          <Alert
            onClose={handleClose}
            severity={state.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {state.message}
          </Alert>
        </Snackbar> */}
      </ThemeProvider>
    </>
  );
}
