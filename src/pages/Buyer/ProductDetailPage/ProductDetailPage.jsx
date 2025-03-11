import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Rating from 'react-rating'

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { IoMdAdd, IoMdStar, IoMdStarOutline } from 'react-icons/io'
import { RiSubtractFill } from 'react-icons/ri'

import { getProductDetailsAPI, getProductsAPI, updateProductDetailAPI } from '~/apis'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Loader from '~/components/Loader/Loader'
import { Button } from '~/components/ui/button'
import { Textarea } from '~/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '~/components/ui/breadcrumb'
import { Separator } from '~/components/ui/separator'
import ReviewRate from '~/pages/Buyer/ProductDetailPage/ReviewRate'
import { FaRegCommentDots, FaRegStar, FaRegThumbsUp, FaStar } from 'react-icons/fa'
import { IoShareSocialOutline } from 'react-icons/io5'
import { DEFAULT_ITEMS_PER_PAGE } from '~/utils/constants'
import Product from '~/components/Product/Product'


function ProductDetailPage() {
  const { productId } = useParams()

  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [recommendedProducts, setRecommendedProducts] = useState([])

  useEffect(() => {
    getProductsAPI().then((data) => {
      const recommendedProducts = data.products
        .filter((product) => product.rate !== null && product.rate !== undefined)
        .sort((a, b) => b.rate - a.rate)
      setRecommendedProducts(recommendedProducts)
    })
  }, [])

  const { handleSubmit, register, resetField } = useForm({
    defaultValues: {
      comment: ''
    }
  })

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

  const handleAddComment = (data) => {
    const { comment } = data
    resetField('comment')

    if (!comment) return

    const commentToAdd = {
      userAvatar: currentUser?.avatar,
      userDisplayName: currentUser?.displayName,
      content: comment.trim()
    }

    updateProductDetailAPI(product._id, { commentToAdd: commentToAdd }).then((data) => {
      toast.success('Bình luận thành công!')
      resetField('comment')
      setProduct(data)
    })

  }

  if (!product) {
    return <Loader caption={'Đang tải...'} />
  }

  return (
    <div className="bg-[#F5F5FA] py-4">
      <div className='container mx-auto'>
        <Breadcrumb className='mb-4'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/buyer">Trang chủ</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Sản phẩm</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className='grid grid-cols-4 gap-6 relative'>
          <div className="col-span-3">
            <div className="grid grid-cols-3 gap-6 h-fit relative mb-6">
              <div className="bg-white flex items-center justify-center h-fit rounded-md p-4 pb-32 sticky top-3 left-0 max-h-fit">
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
                    <span>{product?.rate || 0}</span>
                    <Rating
                      emptySymbol={<IoMdStarOutline />}
                      fullSymbol={<IoMdStar />}
                      initialRating={product?.rate || 0}
                      readonly
                      className='text-[#FBCA04] text-xl leading-none'
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
                  <div className='text-lg font-semibold text-mainColor1-600 mb-1'>Thông tin vận chuyển</div>
                  <p className='text-sm'>Giao đến: {currentUser?.address || 'Q. 1, P. Bến Nghé, Hồ Chí Minh'}</p>
                  <div className='divider w-full h-px border border-t-0 border-gray-200 my-2'></div>
                  <div>GHTK</div>
                </div>

                <div className='rounded-lg bg-white p-3'>
                  <div className='text-lg font-semibold text-mainColor1-800 mb-2'>Mô tả sản phẩm</div>
                  <div dangerouslySetInnerHTML={{ __html: product?.description }} style={{ textAlign: 'justify' }}/>
                </div>
              </div>
            </div>


            <div className="col-span-3">
              <div className='rounded-lg bg-white p-3 mb-4 relative h-fit'>
                <div className='text-xl font-semibold text-mainColor2-800'>Bình luận sản phẩm</div>
                <p className='text-sm text-muted-foreground'>Bạn chỉ có thể bình luận nếu đã đăng nhập!</p>
                <div className='mt-4'>
                  <form
                    action=""
                    onSubmit={handleSubmit(handleAddComment)}
                    className='flex flex-col gap-3 mb-8'
                  >
                    <Textarea
                      placeholder="Viết bình luận..."
                      type="text"
                      {...register('comment')}
                    />
                    <Button className='bg-mainColor2-800 w-full hover:bg-mainColor2-800/90 font-semibold text-lg'>Bình luận</Button>
                  </form>

                  {(!product?.comments || product?.comments?.length === 0) &&
                  <span className='pl-12 text-md font-medium text-gray-400'>Chưa có đánh giá!</span>
                  }
                  {product?.comments?.map((comment, index) =>
                    <div key={index}>
                      <div className="flex items-center gap-10 mb-4">
                        <div className='flex gap-3 mb-1.5'>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Avatar className='cursor-pointer'>
                                  <AvatarImage src={currentUser?.avatar} />
                                  <AvatarFallback>LV</AvatarFallback>
                                </Avatar>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{comment?.userDisplayName}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <div className='flex flex-col'>
                            <span className='font-bold mr-2'>
                              {comment?.userDisplayName}
                            </span>

                            <span className='text-xs text-gray-400'>
                              {new Date(comment?.commentedAt).toLocaleDateString('vi-VN', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>
                        <div className="">
                          <div className="flex items-center gap-2">
                            <Rating
                              emptySymbol={<FaRegStar />}
                              fullSymbol={<FaStar />}
                              initialRating={product?.rate || 0}
                              readonly
                              className='text-[#FBCA04] text-xl leading-none'
                            />
                            <span className='text-xl font-semibold'>Cực kì hài lòng</span>
                          </div>

                          <div className='block py-2 mt-1/2 mb-2 break-words'>
                            {comment?.content}
                          </div>

                          <div className="flex items-center gap-10 text-gray-500 text-lg cursor-pointer">
                            <FaRegThumbsUp />
                            <FaRegCommentDots />
                            <IoShareSocialOutline />
                          </div>
                        </div>
                      </div>
                      {index < product?.comments?.length - 1 && <Separator className='my-6' />}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>


          <div className="sticky top-3 left-0 max-h-full h-fit">
            <div className='rounded-lg bg-white p-3 mb-4'>
              <div className='text-xl font-semibold text-mainColor1-600'>Tóm tắt</div>

              <div className='flex items-center justify-between text-sm mb-2'>
                <span className='w-[35%]'>Tên sản phẩm:</span>
                <span className='flex-1 text-right'>{product?.name}</span>
              </div>

              <div className='flex items-center justify-between text-sm'>
                <span>Số sản phẩm còn lại:</span>
                <span>{product?.quantityInStock}</span>
              </div>

              <Separator className='my-3' />

              <div className='flex items-center gap-3'>
                <div className='font-semibold text-mainColor1-800'>Số lượng:</div>
                <div className='flex items-center justify-between border border-mainColor1-100 rounded-lg p-1'>
                  <RiSubtractFill
                    className='cursor-pointer text-xl text-mainColor1-800 hover:bg-mainColor1-800/40 rounded-md'
                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  />
                  <input
                    value={quantity}
                    onChange={(e) => { setQuantity(e.target.value) }}
                    readOnly
                    className='w-[50px] text-center mx-1.5 border-none outline-none text-md font-semibold text-mainColor1-800'
                  />
                  <IoMdAdd
                    onClick={() =>
                      setQuantity(
                        quantity < (product?.quantityInStock || 1000)
                          ? quantity + 1
                          : product?.quantityInStock || 1000
                      )
                    }
                    className='cursor-pointer text-xl text-mainColor1-800 hover:bg-mainColor2-800/40 rounded-md'
                  />
                </div>
              </div>

              <div className='my-5'>
                <div className='mb-1 text-mainColor1-800/90'>Tạm tính</div>
                <div className='text-gray-700 font-bold text-2xl tracking-normal'>
                  {(
                    product?.price * (1 - product?.discountPercentage / 100)
                  ).toLocaleString()}
                  <sup>đ</sup>
                </div>
              </div>

              <div className='flex flex-col gap-2 mt-4 mb-2'>
                <Button className='w-full bg-mainColor1-800 hover:bg-mainColor1-600 hover:drop-shadow-xl text-lg'>Mua ngay</Button>
                <Button className='w-full bg-white border-mainColor2-800 text-mainColor2-800 border hover:bg-mainColor2-800/90 hover:text-white'>Thêm vào giỏ hàng</Button>
              </div>
            </div>

            <div className='rounded-lg bg-white p-3 mb-4'>
              <div className='text-xl font-semibold text-mainColor1-600 mb-2'>
                Đánh giá
              </div>
              <span className='font-semibold'>Tổng quan</span>

              <div className="my-3">
                <div className='flex items-center gap-4 mt-3'>
                  <span className='text-3xl font-semibold'>{product?.rate || 0}</span>
                  <Rating
                    emptySymbol={<FaRegStar />}
                    fullSymbol={<FaStar />}
                    initialRating={product?.rate || 0}
                    readonly
                    className='text-[#FBCA04] text-4xl leading-none'
                  />
                </div>
                <span className='text-gray-400 text-sm'>(128 đánh giá)</span>
              </div>

              <ReviewRate />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg p-4'>
          <div className="flex items-center gap-2">
            <div className='h-7 w-3 bg-mainColor2-800 rounded-sm'></div>
            <span className='text-mainColor2-800 text-sm font-semibold'>Sản phẩm tương tự</span>
          </div>

          <div className='font-bold text-2xl text-mainColor1-600 mx-auto flex items-center justify-between mt-3'>
            Khám phá thêm các sản phẩm của chúng tôi!
            <Button className='bg-mainColor1-800 hover:bg-mainColor1-600 px-8'>Xem tất cả</Button>
          </div>

          <Separator className='my-4 h-[2px]' />

          <div className='list-recommended-products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2.5'>
            {recommendedProducts.length > 0
              ? recommendedProducts
                .slice(0, DEFAULT_ITEMS_PER_PAGE)
                .map((product) => (
                  <Product product={product} key={product._id} />
                ))
              : [...Array(40)].map((_, index) => (
                <Product product={null} loading={true} key={index} />
              ))}
          </div>
        </div>
      </div>
    </div>

  )
}

export default ProductDetailPage
