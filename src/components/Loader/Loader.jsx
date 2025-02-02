import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

function Loader() {
  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2
    }}>
      <CircularProgress />
      <Typography>Loading page...</Typography>
    </Box>
  )
}

export default Loader