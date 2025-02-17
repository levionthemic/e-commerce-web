/* eslint-disable no-console */
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { axiosApi } from '~/services/ApiService'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { increaseCartQuantity } from '~/redux/cartQuantity/cartQuantitySlice'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Rating from '@mui/material/Rating'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'

const DetailProduct = () => {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const reviewSectionRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    try {
      axiosApi.get(`/api/v1/products/detail/${productId}`)
        .then((res) => {
          if (res.data.code === 200) {
            setProduct(res.data.data)
          } else {
            console.error('Sản phẩm không tồn tại')
          }
        })
    } catch (error) {
      console.error('Có lỗi xảy ra khi gọi API:', error)
    }
  }, [productId, dispatch])

  const handleScrollToReviews = () => {
    if (reviewSectionRef.current) {
      reviewSectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleAddToCart = () => {
    axiosApi
      .post('api/v1/cart/add', {
        cartId: localStorage.getItem('cartId'),
        productId: productId,
        quantity: quantity
      })
      .then((res) => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer
            toast.onmouseleave = Swal.resumeTimer
          },
          icon: 'success',
          title: 'Thêm vào giỏ hàng thành công!'
        })
        if (res.data.hasQuantityUpdated)
          dispatch(increaseCartQuantity(1))
      })
      .catch(() => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer
            toast.onmouseleave = Swal.resumeTimer
          },
          icon: 'error',
          title: 'Không thể thêm sản phẩm vào giỏ hàng!'
        })
      })
  }

  return (
    <Container disableGutters maxWidth='xl'>
      <Grid container columnSpacing={3} mt={4}>
        <Grid item xl={3}>
          <Box sx={{
            position: 'relative',
            overflow: 'hidden',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #ddd',
            borderRadius: '10px'
          }}>
            <img
              src={product?.thumbnail_url}
              alt={product?.name}
              style={{
                maxHeight: '500px',
                objectFit: 'cover'
              }}
            />
          </Box>
        </Grid>

        <Grid item xl={9}>
          <Typography py={2} variant='h4'>{product?.name}</Typography>

          <Divider />

          <Box py={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', pb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Rating
                  name="rating-average"
                  value={product?.rating_average || 0}
                  precision={0.1}
                  readOnly />
                <Typography variant='span'>{product?.rating_average || 0}</Typography>
              </Box>

              <div style={{ border: '1px solid #ddd', height: '20px' }}></div>

              <Box sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: 'rgba(0, 0, 0, 0.7)'
              }}>
                <Typography variant='span' sx={{ marginRight: '-5px' }}>
                  {product?.reviews ? product?.reviews.length : 0}
                </Typography>
                <Typography
                  variant='span'
                  sx={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}
                  onClick={handleScrollToReviews}
                >
                  <Typography variant='span'>Đánh giá </Typography>
                  <BorderColorIcon fontSize='0.875rem'/>
                </Typography>
              </Box>
            </Box>

            <Typography>Mã sản phẩm: <u>{product?.id}</u></Typography>

            <Typography>
                Số lượng còn:{' '}
              {product?.stock_item ? product?.stock_item.qty : 0}
            </Typography>

            <Typography>
                Đã bán:{' '}
              {product?.quantity_sold ? product?.quantity_sold.value : '0'}
            </Typography>
          </Box>

          <Divider />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Typography variant='span' sx={{ color: '#f90606', fontWeight: 600, fontSize: '25px' }}>
              {(
                product?.price * (1 - product?.discount_rate / 100)
              ).toLocaleString()}
              <sup>đ</sup>
            </Typography>

            <Typography variant='span' sx={{
              fontWeight: 400,
              fontSize: '12px',
              p: '0 4px',
              bgcolor: 'rgb(245, 245, 250)',
              borderRadius: '8px'
            }}>
              {`-${product?.discount_rate}%`}
            </Typography>

            <Typography variant='span' sx={{
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '21px',
              color: 'rgb(128, 128, 137)',
              textDecoration: 'line-through'
            }}>
              {product?.price.toLocaleString()}
              <sup>đ</sup>
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Typography variant='span' sx={{ fontWeight: 'bold' }}>Số lượng:</Typography>

            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '1px solid #ddd',
              borderRadius: '10px',
              p: '5px'
            }}>
              <RemoveIcon
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                sx={{ cursor: 'pointer', fontSize: '20px' }}
              />
              <input
                value={quantity}
                onChange={(e) => { setQuantity(e.target.value) }}
                readOnly
                style={{
                  width: '50px',
                  textAlign: 'center',
                  margin: '0 5px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              />
              <AddIcon
                onClick={() =>
                  setQuantity(
                    quantity < (product?.stock_item.qty || 1000)
                      ? quantity + 1
                      : product?.stock_item.qty || 1000
                  )
                }
                style={{ cursor: 'pointer', fontSize: '20px' }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: '10px', mt: '1rem', mb: 2 }}>
            <Button
              sx={{
                bgcolor: 'black',
                color: 'white',
                flex: 1,
                p: '10px',
                fontSize: '16px',
                fontWeight: 500,
                borderRadius: '10px',
                transition: 'bgcolor 0.3s, transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                  bgcolor: 'rgba(0, 0, 0, 0.9)',
                  color: 'white',
                  transition: 'bgcolor 0.3s, transform 0.3s ease-in-out'
                }
              }}
            >
                  Mua ngay
            </Button>
            <Button
              sx={{
                bgcolor: 'black',
                color: 'white',
                flex: 1,
                p: '10px',
                fontSize: '16px',
                fontWeight: 500,
                borderRadius: '10px',
                transition: 'bgcolor 0.3s, transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                  bgcolor: 'rgba(0, 0, 0, 0.9)',
                  color: 'white',
                  transition: 'bgcolor 0.3s, transform 0.3s ease-in-out'
                }
              }}
              onClick={handleAddToCart}
            >
                  Thêm vào giỏ hàng
            </Button>
          </Box>

          <Divider />
        </Grid>
      </Grid>

      <Box my={3} p={2} sx={{ bgcolor: '#f8f9fa' }}>
        <Typography variant='h4' sx={{ textAlign: 'center' }}>MÔ TẢ SẢN PHẨM</Typography>
        <div dangerouslySetInnerHTML={{ __html: product?.description }} />
      </Box>


    </Container>
  )
}

export default DetailProduct
