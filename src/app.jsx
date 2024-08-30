/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { AuthProvider } from './context/authContext';
import SnackBar from './components/snackbar/snackbar';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
        <SnackBar />
      </ThemeProvider>
    </>
  );
}
