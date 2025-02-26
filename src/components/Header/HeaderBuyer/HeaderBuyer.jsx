import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import logo from '~/assets/logo.png'

import { useSelector, useDispatch } from 'react-redux'
import { fetchCurrentCartAPI, selectCurrentCart } from '~/redux/cart/cartSlice'

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
import { useConfirm } from 'material-ui-confirm'
import { logoutUserAPI } from '~/redux/user/userSlice'
import { Input } from '~/components/ui/input'

import { LuShoppingCart } from 'react-icons/lu'
import { IoNotificationsOutline } from 'react-icons/io5'
import MenuBar from './MenuBar'

// import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'


function HeaderBuyer() {
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

  const cart = useSelector(selectCurrentCart)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCurrentCartAPI())
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

  const confirmLogout = useConfirm()
  const handleLogout = async () => {
    confirmLogout({
      title: 'Bạn có chắc chắn muốn đăng xuất?',
      confirmationText: 'Xác nhận',
      cancellationText: 'Hủy'
    }).then(() => {
      dispatch(logoutUserAPI())
    }).catch(() => {})
  }

  return (
    <>
      <div className='container mx-auto mt-6 mb-3'>
        <div className="flex items-center justify-between">
          <div
            className='text-4xl font-medium text-mainColor1-600 cursor-pointer hover:scale-105 transition-transform hover:duration-500'
            onClick={() => navigate('/')}
          >
          LEVI
          </div>
          <div className="">
            <Input
              className='min-w-96 placeholder:text-sm placeholder:text-mainColor1-100 rounded-full border-mainColor1-800 text-mainColor1-600 hover:border-[2px] focus:border-[2px]'
              placeholder='Bạn cần tìm gì?'
            />
          </div>

          <div className='flex items-center gap-6'>
            <IoNotificationsOutline className='text-mainColor1-600 text-xl' />
            <LuShoppingCart className='text-mainColor1-600 text-xl' />
            {/* <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar> */}

          </div>


        </div>
      </div>
      <MenuBar />
    </>

  )
}

export default HeaderBuyer
