import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#8B4513', // Saddle Brown - primary medieval pottery color
      light: '#A0522D', // Sienna
      dark: '#654321', // Dark Brown
    },
    secondary: {
      main: '#D2B48C', // Tan
      light: '#DEB887', // Burlywood
      dark: '#BC8F8F', // Rosy Brown
    },
    background: {
      default: '#F5F5DC', // Beige
      paper: '#FAEBD7', // Antique White
    },
    text: {
      primary: '#2F4F4F', // Dark Slate Gray
      secondary: '#556B2F', // Dark Olive Green
    },
  },
  typography: {
    fontFamily: '"Crimson Text", "Times New Roman", serif',
    h1: {
      fontFamily: '"MedievalSharp", cursive',
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"MedievalSharp", cursive',
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"MedievalSharp", cursive',
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'none',
          padding: '8px 16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: '1px solid #8B4513',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'url("/textures/parchment.png")',
        },
      },
    },
  },
}); 