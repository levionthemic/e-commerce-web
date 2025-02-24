import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
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
import { getProductDetailsAPI, updateProductDetailAPI } from '~/apis'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import moment from 'moment'

function ProductDetailPage() {
  const { productId } = useParams()

  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)

  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    getProductDetailsAPI(productId)
      .then((data) => {
        setProduct(data)
      })
  }, [productId])

  // const handleAddToCart = () => {
  //   axiosApi
  //     .post('api/v1/cart/add', {
  //       cartId: localStorage.getItem('cartId'),
  //       productId: productId,
  //       quantity: quantity
  //     })
  //     .then((res) => {
  //       Swal.fire({
  //         toast: true,
  //         position: 'top-end',
  //         showConfirmButton: false,
  //         timer: 1500,
  //         timerProgressBar: true,
  //         didOpen: (toast) => {
  //           toast.onmouseenter = Swal.stopTimer
  //           toast.onmouseleave = Swal.resumeTimer
  //         },
  //         icon: 'success',
  //         title: 'Thêm vào giỏ hàng thành công!'
  //       })
  //       if (res.data.hasQuantityUpdated)
  //         dispatch(increaseCartQuantity(1))
  //     })
  //     .catch(() => {
  //       Swal.fire({
  //         toast: true,
  //         position: 'top-end',
  //         showConfirmButton: false,
  //         timer: 1500,
  //         timerProgressBar: true,
  //         didOpen: (toast) => {
  //           toast.onmouseenter = Swal.stopTimer
  //           toast.onmouseleave = Swal.resumeTimer
  //         },
  //         icon: 'error',
  //         title: 'Không thể thêm sản phẩm vào giỏ hàng!'
  //       })
  //     })
  // }

  const handleAddCardComment = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      if (!event.target?.value) return

      const commentToAdd = {
        userAvatar: currentUser?.avatar,
        userDisplayName: currentUser?.displayName,
        content: event.target.value.trim()
      }

      updateProductDetailAPI(product._id, { commentToAdd: commentToAdd }).then((data) => {
        event.target.value = ''
        setProduct(data)
      })
    }
  }

  if (!product) {
    return <>Loading...</>
  }

  return (
    <Container disableGutters maxWidth='xl'>
      <Grid container columnSpacing={3} mt={4}>
        <Grid item xl={3} lg={3}>
          <Box sx={{
            position: 'relative',
            overflow: 'hidden',
            height: 'fit-content',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #ddd',
            borderRadius: '10px'
          }}>
            <img
              src={product?.thumbnailUrl}
              alt={product?.name}
              style={{
                maxHeight: '500px',
                objectFit: 'cover'
              }}
            />
          </Box>
        </Grid>

        <Grid item xl={6} lg={6}>
          <Typography py={2} variant='h4'>{product?.name}</Typography>

          <Divider />

          <Box py={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', pb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Rating
                  name="rate"
                  value={product?.rate || 0}
                  precision={0.1}
                  readOnly />
                <Typography variant='span'>{product?.rate || 0}</Typography>
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
                  {product?.comments ? product?.comments.length : 0}
                </Typography>
                <Typography
                  variant='span'
                  sx={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}
                >
                  <Typography variant='span'>Đánh giá </Typography>
                  <BorderColorIcon fontSize='0.875rem'/>
                </Typography>
              </Box>
            </Box>

            <Typography>Mã sản phẩm: <u>{product?._id}</u></Typography>

            <Typography>
                Số lượng còn:{' '}
              {product?.quantityInStock || 0}
            </Typography>

            <Typography>
                Đã bán:{' '}
              {product?.quantitySold || '0'}
            </Typography>
          </Box>

          <Divider />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Typography variant='span' sx={{ color: '#f90606', fontWeight: 600, fontSize: '25px' }}>
              {(
                product?.price * (1 - product?.discountPercentage / 100)
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
              {`-${product?.discountPercentage}%`}
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
                    quantity < (product?.quantityInStock || 1000)
                      ? quantity + 1
                      : product?.quantityInStock || 1000
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
              // onClick={handleAddToCart}
            >
                  Thêm vào giỏ hàng
            </Button>
          </Box>

          <Divider />

          <Box my={3} p={2} sx={{ bgcolor: '#f8f9fa' }}>
            <Typography variant='h5' mb={2}>Mô tả sản phẩm</Typography>
            <div dangerouslySetInnerHTML={{ __html: product?.description }} style={{ textAlign: 'justify' }}/>
          </Box>
        </Grid>

        <Grid item xl={3} lg={3}>
          <Box sx={{
            position: 'relative',
            overflow: 'hidden',
            height: 'fit-content'
          }}>
            <Typography variant='h5'>Đánh giá sản phẩm</Typography>

            <Box sx={{ mt: 2 }}>
              {/* Xử lý thêm comment vào Card */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Avatar
                  sx={{ width: 36, height: 36, cursor: 'pointer' }}
                  alt={currentUser?.displayName}
                  src={currentUser?.avatar}
                />
                <TextField
                  fullWidth
                  placeholder="Viết bình luận..."
                  type="text"
                  variant="outlined"
                  multiline
                  onKeyDown={handleAddCardComment}
                />
              </Box>

              {/* Hiển thị danh sách các comments */}
              {(!product?.comments || product?.comments?.length === 0) && <Typography sx={{ pl: '45px', fontSize: '14px', fontWeight: '500', color: '#b1b1b1' }}>Chưa có đánh giá!</Typography>
              }
              {product?.comments?.map((comment, index) =>
                <Box sx={{ display: 'flex', gap: 1, width: '100%', mb: 1.5 }} key={index}>
                  <Tooltip title={comment?.userDisplayName}>
                    <Avatar
                      sx={{ width: 36, height: 36, cursor: 'pointer' }}
                      alt={comment?.userDisplayName}
                      src={comment?.userAvatar}
                    />
                  </Tooltip>
                  <Box sx={{ width: 'inherit' }}>
                    <Typography variant="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                      {comment?.userDisplayName}
                    </Typography>

                    <Typography variant="span" sx={{ fontSize: '12px' }}>
                      {moment(comment?.commentedAt).format('llll')}
                    </Typography>

                    <Box sx={{
                      display: 'block',
                      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#33485D' : 'white',
                      p: '8px 12px',
                      mt: '4px',
                      border: '0.5px solid rgba(0, 0, 0, 0.2)',
                      borderRadius: '4px',
                      wordBreak: 'break-word',
                      boxShadow: '0 0 1px rgba(0, 0, 0, 0.2)'
                    }}>
                      {comment?.content}
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProductDetailPage
