import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Rating from '@mui/material/Rating'

import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'

import { getProductDetailsAPI, updateProductDetailAPI } from '~/apis'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import moment from 'moment'
import Loader from '~/components/Loader/Loader'
import { Button } from '~/components/ui/button'

function ProductDetailPage() {
  const { productId } = useParams()

  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)

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
    return <Loader caption={'Đang tải...'} />
  }

  return (
    <div className="bg-[#F5F5FA]">
      <div className='container mx-auto'>
        <div>Breadcrumb</div>

        <div className='grid grid-cols-4 gap-6'>
          <div className="bg-white flex items-center justify-center h-fit rounded-md p-4 pb-32">
            <div className='rounded-2xl overflow-hidden border'>
              <img
                src={product?.thumbnailUrl}
                alt={product?.name}
                className='h-[350px] w-[350px] scale-105 object-cover'
              />
            </div>
          </div>

          <div className="col-span-2">
            <div className='rounded-lg bg-white p-3 mb-4'>
              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset mb-2">Còn hàng!</span>
              <div className='font-bold text-mainColor1-600 text-2xl'>{product?.name}</div>

              <div className='flex items-center gap-2 text-sm mt-2'>
                <Typography variant='span'>{product?.rate || 0}</Typography>
                <Rating
                  name="rate"
                  value={product?.rate || 0}
                  precision={0.1}
                  readOnly
                />
                <div style={{ border: '1px solid #ddd', height: '20px' }}></div>
                <div>
                  Đã bán:{' '}
                  {product?.quantitySold || '0'}
                </div>
              </div>

              <div className='flex items-center gap-2 mt-2'>
                <div className='text-[#f90606] font-bold text-2xl tracking-wide'>
                  {(
                    product?.price * (1 - product?.discountPercentage / 100)
                  ).toLocaleString()}
                  <sup>đ</sup>
                </div>

                <div className='bg-[#ddd] rounded-xl px-1 text-xs'>
                  {`-${product?.discountPercentage}%`}
                </div>

                <div className='text-gray-500 line-through text-sm'>
                  {product?.price.toLocaleString()}
                  <sup>đ</sup>
                </div>
              </div>
            </div>


            <div className='rounded-lg bg-white p-3 mb-4'>
              <div className='text-xl font-semibold text-mainColor2-800'>Mô tả sản phẩm</div>
              <div dangerouslySetInnerHTML={{ __html: product?.description }} style={{ textAlign: 'justify' }}/>
            </div>
          </div>

          <div className="">
            <div className='rounded-lg bg-white p-3 mb-4'>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className='font-semibold text-mainColor2-800'>Số lượng:</div>

                <div className='flex items-center justify-between border border-mainColor2-100 rounded-lg p-1'>
                  <RemoveIcon
                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                    sx={{ cursor: 'pointer', fontSize: '20px' }}
                  />
                  <input
                    value={quantity}
                    onChange={(e) => { setQuantity(e.target.value) }}
                    readOnly
                    className='w-[50px] text-center mx-1.5 border-none outline-none text-md font-medium text-mainColor2-800'
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
                </div>
              </Box>

              <div className='flex gap-2 mt-4 mb-2'>
                <Button className='bg-mainColor2-800 hover:bg-mainColor2-300'>Mua ngay</Button>
                <Button className='bg-white border-mainColor1-800 text-mainColor1-800 border hover:bg-mainColor1-800/90 hover:text-white'>Thêm vào giỏ hàng</Button>
              </div>
            </div>

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
          </div>
        </div>

      </div>
    </div>

  )
}

export default ProductDetailPage
