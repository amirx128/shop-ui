import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    customColors: {
      caption: string;
      gray400: string;
      success400: string;
      warning500: string;
      warningMain: string;
      success600: string;
    };
  }
  interface ThemeOptions {
    customColors?: {
      caption: string;
      gray400: string;
      success400: string;
      warning500: string;
      warningMain: string;
      success600: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#223A78',
      light: '#4a5e91',
      dark: '#172954',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff7543',
      light: '#ff916b',
      dark: '#cc5a33',
      contrastText: '#ffffff',
    },
    background: {
      default: '#fefefe',
      paper: '#ffffff',
    },
    text: {
      primary: '#52526b',
      secondary: '#3f3f46',
      disabled: '#a1a1aa',
    },
    divider: '#d4d4d8',
    error: {
      main: '#f31260',
      light: '#f5467b',
      dark: '#c00e4d',
      contrastText: '#ffffff',
    },
    action: {
      hover: '#326bde',
      active: '#223A78',
    },
  },
  customColors: {
    caption: '#71717A',
    gray400: '#a1a1aa',
    success400: '#45d483',
    warning500: '#F5A524',
    warningMain: '#f5a524',
    success600: '#12a150',
  },
  typography: {
    fontFamily:
      'var(--font-sans), "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#27272A',
      '@media (max-width: 768px)': {
        fontSize: '1.75rem',
      },
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#27272A',
      '@media (max-width: 768px)': {
        fontSize: '1.5rem',
      },
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#27272A',
      '@media (max-width: 768px)': {
        fontSize: '1.25rem',
      },
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#27272A',
      '@media (max-width: 768px)': {
        fontSize: '1rem',
      },
    },
    h5: {
      fontSize: '1.1rem',
      fontWeight: 500,
      color: '#27272A',
      '@media (max-width: 768px)': {
        fontSize: '0.9rem',
      },
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#27272A',
      '@media (max-width: 768px)': {
        fontSize: '0.875rem',
      },
    },
    subtitle1: {
      fontSize: '1rem',
      color: '#3f3f46',
      '@media (max-width: 768px)': {
        fontSize: '0.875rem',
      },
    },
    subtitle2: {
      fontSize: '0.875rem',
      color: '#3f3f46',
      '@media (max-width: 768px)': {
        fontSize: '0.75rem',
      },
    },
    caption: {
      fontSize: '0.75rem',
      color: '#71717A',
      '@media (max-width: 768px)': {
        fontSize: '0.625rem',
      },
    },
    body1: {
      fontSize: '1rem',
      color: '#52526b',
      '@media (max-width: 768px)': {
        fontSize: '0.875rem',
      },
    },
    body2: {
      fontSize: '0.875rem',
      color: '#52526b',
      '@media (max-width: 768px)': {
        fontSize: '0.75rem',
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          '@media (max-width: 768px)': {
            fontSize: '0.875rem',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#d4d4d8',
            },
            '&:hover fieldset': {
              borderColor: '#326bde',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#223A78',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid #d4d4d8',
        },
      },
    },
  },
});

export default theme;
