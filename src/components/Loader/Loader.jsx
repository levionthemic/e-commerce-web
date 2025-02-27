import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

function Loader({ caption }) {
  return (
    <Box sx={{
      width: '100vw',
      height: 'calc(100vh - 36px - 40px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2
    }}>
      <CircularProgress />
      <Typography>{caption}</Typography>
    </Box>
  )
}

export default Loader