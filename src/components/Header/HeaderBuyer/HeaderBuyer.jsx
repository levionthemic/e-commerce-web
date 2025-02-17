import { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import logo from '~/assets/images/AniCart.png'

import { useSelector, useDispatch } from 'react-redux'
import { fetchCurrentCartQuantityAPI, selectCurrentCartQuantity } from '~/redux/cartQuantity/cartQuantitySlice'

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import Badge from '@mui/material/Badge'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LogoutIcon from '@mui/icons-material/Logout'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

function HeaderBuyer() {
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

  const cartQuantity = useSelector(selectCurrentCartQuantity)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCurrentCartQuantityAPI())
  }, [dispatch])

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSearch = (event) => {
    event.preventDefault()
    if (searchValue.trim()) {
      navigate(`/search?keyword=${searchValue.trim()}&page=1`)
    }
  }

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      height: '70px',
      position: 'sticky',
      top: 0,
      left: 0,
      zIndex: 999,
      bgcolor: 'primary.main'
    }}>
      <Container disableGutters maxWidth='xl' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: '0 0 auto' }}>
          <img src={logo} alt="E-shop" style={{ height: 45, width: 100, borderRadius: '20px', cursor: 'pointer' }} onClick={() => navigate('/')}/>
        </Box>

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 5
        }}>
          <Button sx={{ color: 'secondary.main' }} onClick={() => { navigate('/')}}>Trang chủ</Button>
          <Button sx={{ color: 'secondary.main' }}>Sản phẩm</Button>
          <Button sx={{ color: 'secondary.main' }}>Về chúng tôi</Button>
          <Button sx={{ color: 'secondary.main' }}>Liên hệ</Button>
        </Box>

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          <form onSubmit={handleSearch}>
            <TextField
              size='small'
              id="search-field"
              label="Tìm kiếm sản phẩm..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ color: 'secondary.main' }}>
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              variant="standard"
              sx={{
                width: '400px',
                '& .MuiFormLabel-root': { color: 'white', '&.Mui-focused': { color: 'white' } },
                '& .MuiInputBase-root': {
                  color: 'white',
                  '&:not(.Mui-disabled, .Mui-error):before': { borderBottom: '1px solid white' },
                  '&::after': { borderBottom: '1px solid white' },
                  '&:hover': {
                    '&:not(.Mui-disabled, .Mui-error):before': { borderBottom: '1px solid white' },
                    '&:not(.Mui-disabled, .Mui-error):after': { borderBottom: '1px solid white' }
                  },
                  '&.Mui-focused': {
                    '&::before': { borderBottom: '1px solid white' },
                    '&::after': { borderBottom: '1px solid white' }
                  }
                }
              }}
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </form>

          <IconButton
            onClick={() => navigate('/cart')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              '&:hover': { borderRadius: '10px' }
            }}>
            <Badge badgeContent={cartQuantity} showZero color='warning'>
              <ShoppingCartOutlinedIcon sx={{ color: 'white' }}/>
            </Badge>
            <Typography variant='span' sx={{ fontSize: '.875rem', color: 'white' }}>Giỏ hàng</Typography>
          </IconButton>

          <IconButton
            id="header-user-icon"
            aria-controls={open ? 'header-user-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={(event) => setAnchorEl(event.currentTarget)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              '&:hover': { borderRadius: '10px' }
            }}
          >
            <AccountCircleOutlinedIcon sx={{ color: 'white' }}/>
            <Typography variant='span' sx={{ fontSize: '.875rem', color: 'white' }}>Tài khoản</Typography>
          </IconButton>
          <Menu
            id="header-user-menu"
            aria-labelledby="header-user-icon"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            sx={{ '& .MuiMenuItem-root': { fontSize: '0.875rem' } }}
          >
            <MenuItem onClick={() => { handleClose(); navigate('/user/info')} }>Tài khoản của tôi</MenuItem>
            <MenuItem onClick={handleClose}>Đơn hàng của tôi</MenuItem>
            <MenuItem onClick={handleClose}>Cài đặt</MenuItem>
            <Divider />
            <MenuItem onClick={handleClose} sx={{ color: 'warning.dark', fontWeight: 'bold' }}>
              <ListItemIcon><LogoutIcon sx={{ color: 'warning.dark' }} fontSize="small" /></ListItemIcon>
              <ListItemText>Đăng xuất</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Container>
    </Box>
  )
}

export default memo(HeaderBuyer)
