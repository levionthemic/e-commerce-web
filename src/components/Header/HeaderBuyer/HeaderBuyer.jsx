import { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import logo from '~/assets/images/AniCart.png'
import { axiosApi } from '~/services/ApiService'
import { setCartQuantity } from '~/redux/slices/cartSlice'
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

function HeaderBuyer() {
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()
  const cartQuantity = useSelector((state) => state.cart.quantity)
  const dispatch = useDispatch()

  useEffect(() => {
    axiosApi
      .get('api/v1/cart/' + localStorage.getItem('cartId'))
      .then((res) => {
        const quantity = res.data.data.length
        dispatch(setCartQuantity(quantity))
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
      })
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
      height: '60px',
      position: 'sticky',
      top: 0,
      left: 0,
      zIndex: 999,
      bgcolor: '#ddd'
    }}>
      <Container disableGutters maxWidth='xl' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: '0 0 auto' }}>
          <img src={logo} alt="E-shop" style={{ height: 45, width: 100, borderRadius: '20px', cursor: 'pointer' }} onClick={() => navigate('/')}/>
        </Box>

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          <Button>Trang chủ</Button>
          <Button>Sản phẩm</Button>
          <Button>Về chúng tôi</Button>
          <Button>Liên hệ</Button>
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
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              variant="standard"
              sx={{ width: '400px' }}
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
            <Badge badgeContent={cartQuantity} showZero color='primary'>
              <ShoppingCartOutlinedIcon />
            </Badge>
            <Typography variant='span' sx={{ fontSize: '.875rem' }}>Giỏ hàng</Typography>
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
            <AccountCircleOutlinedIcon />
            <Typography variant='span' sx={{ fontSize: '.875rem' }}>Tài khoản</Typography>
          </IconButton>
          <Menu
            id="header-user-menu"
            aria-labelledby="header-user-icon"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            sx={{ '& .MuiMenuItem-root': { fontSize: '0.875rem' } }}
          >
            <MenuItem onClick={handleClose}>Tài khoản của tôi</MenuItem>
            <MenuItem onClick={handleClose}>Đơn hàng của tôi</MenuItem>
            <MenuItem onClick={handleClose}>Cài đặt</MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>Đăng xuất</MenuItem>
          </Menu>
        </Box>
      </Container>
    </Box>
  )
}

export default memo(HeaderBuyer)
