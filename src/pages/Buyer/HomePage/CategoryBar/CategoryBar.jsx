import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Container from '@mui/material/Container'
import Chip from '@mui/material/Chip'
import { Avatar } from '@mui/material'

function CategoryBar({ categories = [] }) {
  return (
    <Box py={2} sx={{ bgcolor: 'secondary.main' }} >
      <Container disableGutters maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant='h6'>Danh mục:</Typography>
        <Box sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '5px'
        }}>
          {categories?.map((item) => (
            <Tooltip key={item._id} title={item.name} placement='top-start'>
              <Chip
                avatar={<Avatar src={item.iconUrl} />}
                label={item.name}
                sx={{ flex: 1, display: 'flex', alignItems: 'center', overflowX: 'hidden' }}
                clickable
              />
            </Tooltip>
          ))}
        </Box>
      </Container>


    </Box>
  )
}

export default CategoryBar