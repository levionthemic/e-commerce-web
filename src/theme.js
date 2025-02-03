// import { cyan, deepOrange, orange, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = extendTheme({
  eCommerce: { },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#007BFF',
          background: '#FFFFFF'
        },
        secondary: { main: '#F5F5F5' }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#007BFF',
          background: '#1E1E1E'
        },
        secondary: { main: '#F5F5F5' }
      }
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'white'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderWidth: '1px',
          '&:hover': { borderWidth: '2px' }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // color: theme.palette.primary.main,
          fontSize: '0.875rem',
          // '.MuiOutlinedInput-notchedOutline': {
          //   borderColor: theme.palette.primary.main
          // },
          // '&:hover': {
          //   '.MuiOutlinedInput-notchedOutline': {
          //     borderColor: theme.palette.primary.main
          //   }
          // },
          '& fieldset': { borderWidth: '1px !important' },
          '&:hover fieldset': { borderWidth: '2px !important' },
          '&.Mui-focused fieldset': { borderWidth: '2px !important' }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          // color: theme.palette.primary.main,
          fontSize: '.875rem'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        body1: {
          fontSize: '.875rem'
        },
        h5: {
          fontWeight: '500',
          lineHeight: '22px',
          color: 'rgba(0, 0, 0, 0.6)'
        }
      }
    }
  }
})

export default theme
