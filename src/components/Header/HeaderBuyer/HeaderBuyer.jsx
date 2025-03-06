import { useEffect } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { fetchCurrentCartAPI, selectCurrentCart } from '~/redux/cart/cartSlice'

import { useConfirm } from 'material-ui-confirm'
import { logoutUserAPI, selectCurrentUser } from '~/redux/user/userSlice'
import { Input } from '~/components/ui/input'

import { LuShoppingCart } from 'react-icons/lu'
import { IoNotificationsOutline } from 'react-icons/io5'
import MenuBar from './MenuBar'

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import { Badge } from '~/components/ui/badge'
import { useForm } from 'react-hook-form'


function HeaderBuyer() {
  const navigate = useNavigate()

  const cart = useSelector(selectCurrentCart)
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()

  const { handleSubmit, register } = useForm()

  useEffect(() => {
    dispatch(fetchCurrentCartAPI())
  }, [dispatch])


  const handleSearch = (data) => {
    const searchValue = data.searchValue.trim()
    if (searchValue) {
      navigate(`/buyer/search?${createSearchParams({ 'keyword': searchValue })}`)
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
      <div className='container mx-auto mt-6 mb-4'>
        <div className="flex items-center justify-between">
          <div
            className='text-4xl font-medium text-mainColor1-600 cursor-pointer hover:scale-105 transition-transform hover:duration-500'
            onClick={() => navigate('/')}
          >
          LEVI
          </div>
          <div className="flex-1 flex justify-center">
            <form action="#" onSubmit={handleSubmit(handleSearch)}>
              <Input
                className='min-w-96 w-[80%] placeholder:text-sm placeholder:text-mainColor1-100 rounded-full border-mainColor1-800 text-mainColor1-600 hover:border-[2px] focus:border-[2px]'
                placeholder='Bạn cần tìm gì?'
                {...register('searchValue')}
              />
            </form>
          </div>

          <div className='flex items-center gap-6'>
            <IoNotificationsOutline className='text-mainColor1-600 text-xl font-bold' />

            <div className='relative cursor-pointer hover:scale-105 hover:ease-out hover:duration-300 transition-transform' onClick={() => navigate('/buyer/cart')}>
              <LuShoppingCart className='text-mainColor1-600 text-xl' />
              <Badge className="w-2 h-2 rounded-full p-2 text-center absolute -top-3 -right-3 bg-mainColor1-600">
                {cart?.products?.length || 0}
              </Badge>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className='cursor-pointer'>
                  <AvatarImage src={currentUser?.avatar} />
                  <AvatarFallback>LV</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate('/user/profile')} className='cursor-pointer'>Hồ sơ</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/user/order')} className='cursor-pointer'>Đơn hàng</DropdownMenuItem>
                  <DropdownMenuItem>Cài đặt</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className='text-red-600 font-medium'
                  onClick={handleLogout}
                >Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <MenuBar />
    </>

  )
}

export default HeaderBuyer
