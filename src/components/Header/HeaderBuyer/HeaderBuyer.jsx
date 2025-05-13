import { useEffect, useRef, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import {
  addToCartAPI,
  clearCart,
  fetchCurrentCartAPI,
  selectCurrentCart
} from '~/redux/cart/cartSlice'

import { logoutUserAPI, selectCurrentUser } from '~/redux/user/userSlice'
import { Input } from '~/components/ui/input'

import { LuShoppingCart } from 'react-icons/lu'
import { IoNotificationsOutline } from 'react-icons/io5'
import MenuBar from './MenuBar'

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { ArrowRightIcon, LogInIcon, SearchIcon } from 'lucide-react'
import { toast } from 'sonner'

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

import { Button } from '~/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '~/components/ui/sheet'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '~/components/ui/tooltip'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '~/components/ui/alert-dialog'
import { getProductsAPI } from '~/apis/buyerApis'
import { useDebounceFn } from '~/hooks/use-debounce'
import { useLoading } from '~/contexts/LoadingContext'

function HeaderBuyer() {
  const navigate = useNavigate()

  const currentUser = useSelector(selectCurrentUser)
  const currentCart = useSelector(selectCurrentCart)
  const dispatch = useDispatch()

  const { startLoading, endLoading } = useLoading()

  const inputRef = useRef()

  useEffect(() => {
    if (currentUser) {
      startLoading()
      if (currentCart && !currentCart.buyerId) {
        Promise.all(
          currentCart?.itemList.map((item) => dispatch(addToCartAPI(item)))
        )
          .then(() => dispatch(fetchCurrentCartAPI()))
          .finally(() => endLoading())
      } else {
        dispatch(fetchCurrentCartAPI()).finally(() => endLoading())
      }
    }
  }, [currentUser, dispatch])

  const handleSearch = (event) => {
    event.preventDefault()
    const searchValue = inputRef.current.value
    if (searchValue) {
      navigate(`/buyer/search?${createSearchParams({ keyword: searchValue })}`)
      handleBlur()
      window.scrollTo(0, 0)
    }
  }

  const handleLogout = async () => {
    dispatch(clearCart())
    toast.promise(dispatch(logoutUserAPI()), {
      loading: 'Đang đăng xuất...',
      success: () => {
        return 'Đăng xuất thành công!'
      }
    })
  }

  const [open, setOpen] = useState(false)
  const [searchProducts, setSearchProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const [showBackgroundOverlay, setShowBackgroundOverlay] = useState(false)

  const handleFocus = () => {
    setShowBackgroundOverlay(true)
    document.body.style.overflow = 'hidden'
  }

  const handleBlur = () => {
    inputRef.current.blur()
    setShowBackgroundOverlay(false)
    document.body.style.overflow = 'auto'
    setSearchProducts([])
  }

  const handleChange = useDebounceFn((event) => {
    setLoading(true)
    const keyword = event.target.value
    if (!keyword) {
      setSearchProducts([])
      setLoading(false)
      return
    }
    const searchPath = `?${createSearchParams({
      'q[name]': keyword
    })}`
    getProductsAPI(searchPath)
      .then((data) => {
        setSearchProducts(data?.products || [])
      })
      .finally(() => {
        setLoading(false)
      })
  }, 1000)

  return (
    <>
      <div className='sticky top-0 left-0 bg-white z-50'>
        <div className='container mx-auto pt-6 pb-4'>
          <div className='flex items-center justify-between'>
            <div
              className='text-4xl font-medium text-mainColor1-600 cursor-pointer hover:scale-105 transition-transform hover:duration-500'
              onClick={() => navigate('/')}
            >
              LEVI
            </div>
            <div className='flex-1'>
              <form
                onSubmit={handleSearch}
                className='relative w-[80%] mx-auto'
              >
                <Input
                  className='peer ps-9 pe-9 w-full placeholder:text-sm placeholder:text-mainColor1-100 rounded-full border-mainColor1-800 text-mainColor1-600 hover:border-[2px] focus:border-[2px] flex-1'
                  placeholder='Bạn cần tìm gì?'
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  ref={inputRef}
                />
                <div className='text-mainColor1-600/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50'>
                  <SearchIcon size={16} />
                </div>
                <button
                  className='text-mainColor1-600/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                  aria-label='Submit search'
                  type='submit'
                >
                  <ArrowRightIcon size={16} aria-hidden='true' />
                </button>
              </form>
            </div>

            <div className='flex items-center gap-10'>
              <IoNotificationsOutline className='text-mainColor1-600 text-xl font-bold' />

              <Sheet key={'right'}>
                <SheetTrigger asChild>
                  <div className='relative cursor-pointer hover:scale-105 hover:ease-out hover:duration-300 transition-transform'>
                    <LuShoppingCart className='text-mainColor1-600 text-xl' />
                    <Badge className='w-2 h-2 rounded-full p-2 text-center absolute -top-3 -right-3 bg-mainColor1-600'>
                      {currentCart?.itemList?.length || 0}
                    </Badge>
                  </div>
                </SheetTrigger>
                <SheetContent side={'right'}>
                  <SheetHeader className='my-3'>
                    <SheetTitle>
                      Giỏ hàng của bạn{' '}
                      <span className='text-sm text-gray-700'>
                        ({currentCart?.itemList.length || 0})
                      </span>
                    </SheetTitle>
                    <SheetDescription className='!m-0'>
                      Sơ lược các sản phẩm trong giỏ hàng.
                    </SheetDescription>
                  </SheetHeader>
                  <div className='py-4 max-h-[89%] overflow-auto'>
                    {currentCart?.fullProducts?.map((product, index) => (
                      <div key={index} className='flex items-center gap-2 my-6'>
                        <img
                          src={product?.avatar}
                          alt=''
                          width={40}
                          height={40}
                        />
                        <div className='flex flex-col gap-1'>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className='text-sm line-clamp-1 text-mainColor2-800 leading-none'>
                                  {product?.name}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{product?.name}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <p className='line-clamp-1 text-xs text-gray-400 mb-0.5'>
                            Loại: {product?.type?.typeName}
                          </p>
                          <div className='flex flex-col lg:flex-row lg:items-center lg:gap-4'>
                            <Badge className='bg-mainColor2-800/90'>
                              {currentCart.itemList[index].quantity} sản phẩm
                            </Badge>
                            <span className='text-[0.8rem] text-muted-foreground'>
                              x {product?.type?.price.toLocaleString('vi-VN')}
                              <sup>đ</sup>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button
                        className='bg-mainColor2-800/90 hover:bg-mainColor2-800 w-full hover:drop-shadow-lg'
                        onClick={() => navigate('/buyer/cart')}
                      >
                        Xem giỏ hàng
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>

              {currentUser ? (
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger asChild>
                    <div className='flex items-center gap-3 cursor-pointer'>
                      <Avatar>
                        <AvatarImage src={currentUser?.avatar} />
                        <AvatarFallback>LV</AvatarFallback>
                      </Avatar>
                      <div className='text-sm text-gray-500'>
                        Xin chào, <br></br>
                        <b className='text-gray-900'>{currentUser?.username}</b>
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-40'>
                    <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => navigate('/user/profile')}
                        className='cursor-pointer'
                      >
                        Hồ sơ
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate('/user/order')}
                        className='cursor-pointer'
                      >
                        Đơn hàng
                      </DropdownMenuItem>
                      <DropdownMenuItem>Cài đặt</DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem
                          className='text-red-600 font-medium hover:bg-red-100 hover:text-red-600 cursor-pointer'
                          onSelect={(event) => {
                            event.preventDefault()
                          }}
                        >
                          Đăng xuất
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Bạn có chắc chắn muốn đăng xuất?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Bạn sẽ cần phải đăng nhập lại trước khi truy cập vào
                            hệ thống.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={() => setOpen(false)}>
                            Hủy
                          </AlertDialogCancel>
                          <AlertDialogAction onClick={handleLogout}>
                            Đăng xuất
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div
                  className='flex items-center gap-2 text-mainColor1-600 cursor-pointer hover:scale-105 hover:ease-out hover:duration-300 transition-transform'
                  onClick={() => navigate('/login')}
                >
                  <LogInIcon />
                  Đăng nhập
                </div>
              )}
            </div>
          </div>
        </div>
        <MenuBar />
      </div>
      {showBackgroundOverlay && (
        <>
          <div className='w-[100vw] h-[100vh] fixed z-50 top-20 bg-black opacity-80'></div>
          <div
            className='bg-white opacity-100 z-[51] w-[53%] h-fit fixed top-16 left-[18%] shadow-xl p-1 rounded-sm text-center text-sm'
            style={{
              boxShadow: 'rgba(0, 0, 0, 0.28) 0px 6px 12px 0px'
            }}
          >
            {loading && 'Đang tìm kiếm...'}
            {!loading && searchProducts.length
              ? searchProducts.map((prod) => (
                  <div
                    key={prod._id}
                    className='flex items-center gap-4 hover:bg-gray-100 px-1 rounded-sm my-1 cursor-pointer py-2'
                    onMouseDown={() => {
                      navigate(`/buyer/product/${prod._id}`)
                    }}
                  >
                    <div>
                      <img src={prod?.avatar} alt='' className='w-10 h-10' />
                    </div>
                    <div>
                      <span className='text-sm'>{prod?.name}</span>
                    </div>
                  </div>
                ))
              : 'Không có kết quả.'}
          </div>
        </>
      )}
    </>
  )
}

export default HeaderBuyer
