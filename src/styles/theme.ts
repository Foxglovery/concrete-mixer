import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8B4513',
      light: '#A0522D',
      dark: '#2C1810',
      contrastText: '#E8D5B5',
    },
    secondary: {
      main: '#FFD700',
      light: '#FFE44D',
      dark: '#B39700',
      contrastText: '#2C1810',
    },
    background: {
      default: '#2C1810',
      paper: '#2C1810',
    },
    text: {
      primary: '#E8D5B5',
      secondary: '#FFD700',
    },
  },
  typography: {
    fontFamily: '"Crimson Text", serif',
    h1: {
      fontFamily: '"MedievalSharp", cursive',
      color: '#FFD700',
    },
    h2: {
      fontFamily: '"MedievalSharp", cursive',
      color: '#FFD700',
    },
    h3: {
      fontFamily: '"MedievalSharp", cursive',
      color: '#FFD700',
    },
    h4: {
      fontFamily: '"MedievalSharp", cursive',
      color: '#FFD700',
    },
    h5: {
      fontFamily: '"MedievalSharp", cursive',
      color: '#FFD700',
    },
    h6: {
      fontFamily: '"MedievalSharp", cursive',
      color: '#FFD700',
    },
    body1: {
      color: '#E8D5B5',
    },
    body2: {
      color: '#E8D5B5',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'none',
          fontFamily: '"Crimson Text", serif',
          letterSpacing: '0.5px',
          border: '1px solid #E8D5B5',
          '&:hover': {
            border: '1px solid #FFD700',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: '1px solid #E8D5B5',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export { theme }; 