/* eslint-disable no-console */
import { memo, useEffect, useState } from 'react'
import icon from '~/assets/images/money-icon.svg'
import icon1 from '~/assets/images/arrow-icon.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { axiosApi } from '~/services/ApiService'
import Swal from 'sweetalert2'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

function Checkout() {
  const navigate = useNavigate()
  const location = useLocation()
  const cartList = location.state.cartList

  const totalPrice = cartList.reduce(
    (sum, item) =>
      sum +
      item.quantity * item.original_price * (1 - item.discount_rate / 100),
    0
  )

  const [user, setUser] = useState({})
  const [isShow, setShow] = useState(false)

  const handleToggleShow = () => {
    const div = document.querySelector('.inner-products')
    if (!isShow) {
      div.classList.add('show')
    } else {
      div.classList.remove('show')
    }
    const img = document
      .querySelector('.inner-quantity #icon-toggle-list')
      .querySelector('img')

    if (!isShow) {
      img.classList.add('show')
    } else {
      img.classList.remove('show')
    }

    setShow(!isShow)
  }

  const handleCheckout = () => {
    axiosApi
      .post('/api/v1/checkout/order', {
        cartId: localStorage.getItem('cartId')
      })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Đặt hàng thành công!',
          text: 'Vui lòng kiểm tra hóa đơn điện tử trong email của bạn',
          didClose: () => {
            navigate('/')
            window.location.reload()
          }
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    axiosApi
      .get('/api/v1/user/' + localStorage.getItem('token'))
      .then((res) => {
        setUser(res.data.user)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const sectionStyles = {
    bgcolor: '#ffffff',
    boxShadow: '1px 2px 2px 1px rgba(0, 0, 0, 0.25)',
    borderRadius: '5px',
    p: '20px',
    mb: '20px',
    '& h4': {
      fontWeight: 400,
      fontSize: '20px',
      color: 'black',
      opacity: 0.7,
      mb: '20px'
    }
  }

  return (
    <Container disableGutters maxWidth='xl'>
      <Typography variant='h4' my={3}>Thanh toán</Typography>
      <Grid container columnSpacing={2}>
        <Grid item xl={9}>
          <Box sx={sectionStyles}>
            <Typography variant='h4'>Chọn hình thức giao hàng</Typography>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Box sx={{
                border: '2px solid black',
                borderRadius: '5px',
                p: '8px 100px 5px 35px',
                width: '48%'
              }}>
                <input
                  type="radio"
                  name="transfer-type"
                  id="type1"
                  checked
                />
                <label htmlFor="type1">Giao hàng tiết kiệm</label>
              </Box>
              <Box sx={{
                border: '2px solid black',
                borderRadius: '5px',
                p: '8px 100px 5px 35px',
                width: '48%',
                opacity: 0.5
              }}>
                <input
                  type="radio"
                  name="transfer-type"
                  id="type2"
                  disabled
                />
                <label htmlFor="type2">Giao hàng nhanh</label>
              </Box>
            </Box>

            <Box sx={{ mt: 4 }}>
              {cartList.map((product, index) => (
                <Box key={index} sx={{
                  border: '1px solid rgba(0, 0, 0, 0.3)',
                  borderRadius: '10px',
                  padding: '10px',
                  marginBottom: '20px'
                }}>
                  <Typography variant='p' sx={{ fontWeight: 'bold' }}>
                      Giao vào chủ nhật 17/11
                  </Typography>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    pr: 3,
                    m: '15px 0'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Box sx={{ width: '100px', height: '80px', border: '1px solid #ddd' }}>
                        <img src={product.thumbnail_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
                      </Box>
                      <Box sx={{
                        color: 'black',
                        opacity: 0.5,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: 2
                      }}>
                        <Typography variant='p'>{product.name}</Typography>
                        <Typography variant='p'>SL: x{product.quantity}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ color: 'red', fontWeight: 'bold' }}>
                      <Typography variant='p'>
                        {(
                          product.quantity *
                            product.original_price *
                            (1 - product.discount_rate / 100)
                        ).toLocaleString()}
                        <sup>đ</sup>
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', pr: 3, gap: 5 }}>
                    <Typography variant='p' fontWeight={'bold'}>Tiền vận chuyển: </Typography>
                    <Typography variant='p' fontWeight={'bold'} color={'red'}>32,123đ</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          <Box sx={sectionStyles}>
            <Typography variant='h4'>Chọn hình thức thanh toán</Typography>
            <Box sx={{
              border: '2px solid black',
              borderRadius: '10px',
              padding: '8px 10px 5px 20px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <input
                type="radio"
                readOnly
                checked
              />
              <label htmlFor="pay-type" style={{
                flex: 1,
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <Typography variant='span'>Thanh toán tiền mặt</Typography>
                <img src={icon} alt="" />
              </label>
            </Box>
          </Box>
        </Grid>

        <Grid item xl={3}>
          <Box sx={{
            position: 'sticky',
            top: '100px',
            left: '0',
            height: 'fit-content',
            mb: 2
          }}>
            <Box sx={sectionStyles}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 3
              }}>
                <Typography variant='h4' sx={{ mb: '0 !important' }}>Giao tới</Typography>
                <Typography
                  variant='span'
                  onClick={() => { navigate('/user/info') }}
                  sx={{
                    fontWeight: 400,
                    fontSize: '15px',
                    color: '#2368c3',
                    cursor: 'pointer'
                  }}
                >
                  Thay đổi
                </Typography>
              </Box>
              <Box>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontWeight: 'bold',
                  marginBottom: '10px'
                }}>
                  <Typography variant='span'>{user.fullname}</Typography>
                  <Typography variant='p'>{user.phoneNumber}</Typography>
                </Box>
                <Typography variant='p' fontSize={'0.875rem'}>{user.address}</Typography>
              </Box>
            </Box>
            <Box sx={{ ...sectionStyles, '& .inner-products.show': {
              maxHeight: '178px',
              display: 'block',
              overflow: 'hidden',
              transition: 'max-height 0.5s ease-in-out'
            } }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 3
              }}>
                <Typography variant='h4' sx={{ mb: '0 !important' }}>Giao tới</Typography>
                <Typography
                  variant='span'
                  onClick={() => { navigate('/cart') }}
                  sx={{
                    fontWeight: 400,
                    fontSize: '15px',
                    color: '#2368c3',
                    cursor: 'pointer'
                  }}
                >
                  Thay đổi
                </Typography>
              </Box>

              <Box className="inner-quantity" sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                borderBottom: '1px solid #ddd',
                pb: 2
              }}>
                <Typography variant='span' sx={{ fontWeight: '500', color: 'rgba(0, 0, 0, 0.4)' }}>{cartList.length} sản phẩm</Typography>
                <Box onClick={handleToggleShow} id='icon-toggle-list' sx={{
                  fontWeight: '400',
                  color: '#2368c3',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  '& img.show': {
                    transform: 'rotate(180deg)',
                    transition: 'transform 0.3s ease-in-out'
                  },
                  '& img': {
                    transform: 'rotate(0deg)',
                    transition: 'transform 0.3s ease-in-out'
                  }
                }}>
                  <img src={icon1} alt="" />
                  {isShow ? 'Thu gọn' : 'Xem thông tin'}
                </Box>
              </Box>

              <Box className="inner-products" sx={{
                display: 'block',
                overflow: 'hidden',
                maxHeight: '0px',
                transition: 'max-height 0.5s ease-in-out'
              }}>
                <Box className="inner-products-list" sx={{
                  borderBottom: '1px solid #ddd',
                  padding: '7px 0',
                  maxHeight: '178px',
                  height: 'fit-content',
                  overflow: 'scroll',
                  scrollBehavior: 'smooth',
                  scrollbarWidth: 'none'
                }}>
                  {cartList.map((product, index) => (
                    <Box className="inner-product" key={index} sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px',
                      fontSize: '14px',
                      padding: '10px 0'
                    }}>
                      <Box>{product.quantity}</Box>
                      <Box sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</Box>
                      <Box sx={{ fontWeight: 'bold', color: '#f90606', opacity: 0.6 }}>
                        {(
                          product.quantity *
                          product.original_price *
                          (1 - product.discount_rate / 100)
                        ).toLocaleString()}
                        <sup>đ</sup>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box sx={{
                borderBottom: '1px solid #ddd',
                p: '10px 0'
              }}>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '.9rem',
                  m: '5px 0'
                }}>
                  <Typography variant='span' sx={{ opacity: 0.4 }}>Tổng tiền hàng</Typography>
                  <Typography variant='span' sx={{ fontWeight: 'bold', color: 'red' }}>
                    {totalPrice.toLocaleString()}
                    <sup>đ</sup>
                  </Typography>
                </Box>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '.9rem',
                  m: '5px 0'
                }}>
                  <Typography variant='span' sx={{ opacity: 0.4 }}>Phí vận chuyển</Typography>
                  <Typography variant='span' sx={{ fontWeight: 'bold', color: 'red' }}>64,246đ</Typography>
                </Box>
              </Box>

              <Box>
                <Box sx={{ fontWeight: 'bold', mt: 1 }}>Tổng tiền thanh toán</Box>
                <Box sx={{
                  color: 'red',
                  textAlign: 'right',
                  fontSize: '20px',
                  fontWeight: 'bold'
                }}>
                  {(totalPrice + 64246).toLocaleString()}
                  <sup>đ</sup>
                </Box>
                <Typography variant='p' sx={{ fontSize: '.8rem' }}>
                  (Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và
                  các chi phí phát sinh khác)
                </Typography>
              </Box>

              <Box mt={3}>
                <Button
                  sx={{
                    background: '#d9d9d9',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: '10px',
                    width: '100%',
                    fontWeight: 'bold',
                    color: 'black'
                  }}
                  onClick={handleCheckout}
                >
                  Đặt hàng
                </Button>
              </Box>
            </Box>
          </Box>

        </Grid>
      </Grid>
      <Box>

      </Box>
    </Container>
  )
}

export default memo(Checkout)
