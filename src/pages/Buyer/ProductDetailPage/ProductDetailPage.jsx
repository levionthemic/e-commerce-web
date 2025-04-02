import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Rating from 'react-rating'

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { IoMdAdd, IoMdStar, IoMdStarOutline } from 'react-icons/io'
import { RiSubtractFill } from 'react-icons/ri'

import { addCommentAPI, getProductDetailsAPI, getProductsAPI } from '~/apis'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Loader from '~/components/Loader/Loader'
import { Button } from '~/components/ui/button'
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
import { IoBagCheckOutline, IoShareSocialOutline } from 'react-icons/io5'
import { COMMENTS, DEFAULT_ITEMS_PER_PAGE } from '~/utils/constants'
import Product from '~/components/Product/Product'
import { addToCartAPI, fetchCurrentCartAPI } from '~/redux/cart/cartSlice'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { Label } from '~/components/ui/label'
import { MdAddShoppingCart } from 'react-icons/md'
import { getAddressString } from '~/utils/helpers'
import ReviewModal from './ReviewModal'
import { socketIoInstance } from '~/socket'


function ProductDetailPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { productId } = useParams()

  const [product, setProduct] = useState(null)
  const [discount, setDiscount] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [typeId, setTypeId] = useState()
  const [productEndPrice, setProductEndPrice] = useState()
  const [recommendedProducts, setRecommendedProducts] = useState([])

  useEffect(() => {
    getProductsAPI().then((data) => {
      const recommendedProducts = data.products
      setRecommendedProducts(recommendedProducts)
    })
  }, [])

  useEffect(() => {
    if (typeId) {
      const type = product.types.find(type => type.typeId === typeId)
      setProductEndPrice(type?.price)
      setDiscount(type?.discount)
    }
  }, [product?.types, typeId])

  const currentUser = useSelector(selectCurrentUser)

  const [address, setAddress] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    getProductDetailsAPI(productId)
      .then((data) => {
        setProduct(data)
        setProductEndPrice(data?.avgPrice)
      })
  }, [productId])

  useEffect(() => {
    getAddressString(currentUser?.buyerAddress[0]).then(result => setAddress(result))
  }, [currentUser?.buyerAddress])

  const handleAddToCart = () => {
    if (!typeId) {
      toast.error('Bạn chưa chọn loại sản phẩm!', { position: 'top-right' })
      return
    }
    const data = { productId, typeId, quantity }
    toast.promise(
      dispatch(addToCartAPI(data)).unwrap(),
      {
        loading: 'Đang thêm vào giỏ hàng...',
        success: (res) => {
          if (!res.error) {
            dispatch(fetchCurrentCartAPI(data))
            return 'Thêm vào giỏ hàng thành công!'
          }
          throw res
        }
      }
    )
  }

  const handleCheckout = () => {
    if (!typeId) {
      toast.error('Bạn chưa chọn loại sản phẩm!', { position: 'top-right' })
      return
    }

    navigate('/buyer/checkout', { state: { selectedRows: [{
      ...product,
      type: product.types.find(t => t.typeId.toString() === typeId),
      quantity: quantity
    }] } })
  }

  const onSubmitReview = (data) => {
    const reviewData = {
      productId: product._id,
      ...data,
      medias: []
    }
    socketIoInstance.emit('FE_SUBMIT_REVIEW', reviewData)
    // toast.promise(
    //   addCommentAPI(reviewData),
    //   {
    //     loading: 'Đang gửi đánh giá...',
    //     success: (res) => {
    //       if (!res.error) {
    //         //
    //       }
    //       throw res
    //     }
    //   }
    // )
  }
  const [onReview, setOnReview] = useState(false)

  const updateStartReview = (userInfo) => {
    if (currentUser.email !== userInfo.email) {
      setOnReview(true)
    }
  }

  const updateStopReview = (userInfo) => {
    if (currentUser.email !== userInfo.email) {
      setOnReview(false)
    }
  }

  const updateProductReview = (data) => {
    //
  }

  useEffect(() => {
    socketIoInstance.on('BE_START_REVIEW', updateStartReview)
    socketIoInstance.on('BE_STOP_REVIEW', updateStopReview)
    socketIoInstance.on('BE_SUBMIT_REVIEW', updateProductReview)

    return () => {
      socketIoInstance.off('BE_START_REVIEW', updateStartReview)
      socketIoInstance.off('BE_STOP_REVIEW', updateStopReview)
    }
  }, [])

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
              <div className="bg-white flex items-center justify-center h-fit rounded-lg p-4 pb-32 sticky top-36 left-0">
                <div className='rounded-2xl overflow-hidden border'>
                  <img
                    src={product?.avatar}
                    alt={product?.name}
                    className='h-[350px] w-[350px] scale-105 object-cover'
                  />
                </div>
              </div>

              <div className="col-span-2">
                <div className='rounded-lg bg-white p-4 mb-6'>
                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset mb-2">Còn hàng!</span>
                  <div className='font-bold text-mainColor1-600 text-2xl'>{product?.name}</div>

                  <div className='flex items-center gap-2 text-sm mt-2'>
                    <span>{product?.rating || 0}</span>
                    <Rating
                      emptySymbol={<IoMdStarOutline />}
                      fullSymbol={<IoMdStar />}
                      initialRating={product?.rating || 0}
                      readonly
                      className='text-[#FBCA04] text-xl leading-none'
                    />
                    <div style={{ border: '1px solid #ddd', height: '20px' }}></div>
                    <div>
                      Đã bán:{' '}
                      {product?.sold || '0'}
                    </div>
                  </div>

                  <div className='flex items-center gap-2 mt-2'>
                    <div className='text-[#f90606] font-bold text-2xl tracking-wide'>
                      {(
                        productEndPrice * (1 - discount / 100)
                      ).toLocaleString()}
                      <sup>đ</sup>
                    </div>

                    <div className='bg-[#ddd] rounded-xl px-1 text-xs'>
                      {`-${discount}%`}
                    </div>

                    <div className='text-gray-500 line-through text-sm'>
                      {productEndPrice.toLocaleString()}
                      <sup>đ</sup>
                    </div>
                  </div>

                  <div className='mt-10'>
                    <div className="text-mainColor1-600 font-medium mb-2">Loại sản phẩm</div>
                    <fieldset className="space-y-4">
                      <RadioGroup className="gap-0 -space-y-px rounded-md shadow-xs" onValueChange={setTypeId}>
                        {product?.types?.map((type) => (
                          <div
                            key={type.typeId}
                            className="border-input has-[button[data-state=checked]]:border-mainColor1-200 has-[button[data-state=checked]]:bg-mainColor1-100/20 relative flex flex-col gap-4 border px-4 py-3 outline-none first:rounded-t-md last:rounded-b-md has-[button[data-state=checked]]:z-10"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <RadioGroupItem
                                  id={type.typeId}
                                  value={type.typeId}
                                  className="after:absolute after:inset-0"
                                />
                                <Label className="inline-flex items-start" htmlFor={type.typeId}>
                                  {type.typeName}
                                </Label>
                              </div>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </fieldset>

                  </div>
                </div>

                <div className='rounded-lg bg-white p-4 mb-6'>
                  <div className='text-lg font-semibold text-mainColor1-600 mb-1'>Thông tin vận chuyển</div>
                  <p className='text-sm'>Giao đến: {address}</p>
                  <div className='divider w-full h-px border border-t-0 border-gray-200 my-2'></div>
                  <div>GHTK</div>
                </div>

                <div className='rounded-lg bg-white p-4 mb-6'>
                  <div className='text-lg font-semibold text-mainColor1-600 mb-3'>Thông tin chi tiết</div>
                  {product?.features?.map((feature, index) => (
                    <div key={index} className='mx-4'>
                      <div className='flex items-center justify-between my-1.5'>
                        <span className='text-sm text-gray-400'>{feature.field}</span>
                        <span className=''>{feature.content}</span>
                      </div>
                      {index != product?.features?.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>

                <div className='rounded-lg bg-white p-4'>
                  <div className='text-lg font-semibold text-mainColor1-800 mb-2'>Mô tả sản phẩm</div>
                  <div dangerouslySetInnerHTML={{ __html: product?.description }} style={{ textAlign: 'justify' }}/>
                </div>
              </div>
            </div>

            <div className="">
              <div className='rounded-lg bg-white p-4 mb-6 relative h-fit'>
                <div className='flex items-center justify-between'>
                  <div>
                    <div className='text-xl font-semibold text-mainColor2-800'>Bình luận sản phẩm</div>
                    <p className='text-sm text-muted-foreground'>Bạn có thể xem các đánh giá từ các khách hàng khác.</p>
                  </div>
                  <ReviewModal product={product} onSubmitReview={onSubmitReview} />
                </div>
                <div className='mt-4'>
                  {(!product?.comments || product?.comments?.length === 0) &&
                  <span className='pl-12 text-md font-medium text-gray-400'>Chưa có đánh giá!</span>
                  }
                  {product?.comments?.map((comment, index) =>
                    <div key={index}>
                      <div className="flex items-center gap-8 mb-4">
                        <div className='flex gap-3 mb-1.5 w-[20%]'>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Avatar className='cursor-pointer'>
                                  <AvatarImage src={currentUser?.avatar} />
                                  <AvatarFallback>LV</AvatarFallback>
                                </Avatar>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{comment?.buyerName}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <div className='flex flex-col'>
                            <span className='font-bold mr-2'>
                              {comment?.buyerName}
                            </span>

                            <span className='text-xs text-gray-400'>
                              {new Date(comment?.createdAt).toLocaleDateString('vi-VN', {
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
                        <div className="flex-1">
                          <div className="flex items-center gap-4">
                            <Rating
                              emptySymbol={<FaRegStar />}
                              fullSymbol={<FaStar />}
                              initialRating={comment?.rating || 0}
                              readonly
                              className='text-[#FBCA04] text-xl leading-none'
                            />
                            <span className='text-lg font-semibold leading-none'>{COMMENTS[comment?.rating - 1]}</span>
                          </div>

                          <div className='block py-2 mt-1/2 mb-2 break-words text-sm'>
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
                {onReview && <div>Đang có ai đó đánh giá...</div>}
              </div>
            </div>
          </div>


          <div className="sticky top-36 left-0 h-fit">
            <div className='rounded-lg bg-white p-4 mb-6'>
              <div className='text-xl font-semibold text-mainColor1-600 mb-2'>Tóm tắt</div>

              <div className='flex items-center justify-between text-sm mb-2'>
                <span className='w-[35%] text-gray-500'>Tên hàng:</span>
                <span className='flex-1 text-right'>{product?.name}</span>
              </div>

              <div className='flex items-center justify-between text-sm'>
                <span className='text-gray-500'>Số lượng còn lại:</span>
                <span>{product?.types.find(t => t.typeId.toString() === typeId)?.stock || 0}</span>
              </div>

              <Separator className='my-4' />

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
                    productEndPrice * (1 - discount / 100)
                  ).toLocaleString()}
                  <sup>đ</sup>
                </div>
              </div>

              <div className='flex flex-col gap-2 mt-4 mb-2'>
                <Button className='w-full py-5 bg-mainColor1-800 hover:bg-mainColor1-600 hover:drop-shadow-xl text-lg' onClick={handleCheckout}> <IoBagCheckOutline /> Mua ngay</Button>
                <Button className='w-full bg-white border-mainColor2-800 text-mainColor2-800 border hover:bg-mainColor2-800/90 hover:text-white' onClick={handleAddToCart}>
                  <MdAddShoppingCart />
                  Thêm vào giỏ hàng
                </Button>
              </div>
            </div>

            <div className='rounded-lg bg-white p-4 mb-6'>
              <div className='text-xl font-semibold text-mainColor1-600 mb-2'>
                Đánh giá
              </div>
              <span className='font-semibold'>Tổng quan</span>

              <div className="my-3">
                <div className='flex items-center gap-4 mt-3'>
                  <span className='text-3xl font-semibold'>{product?.rating || 0}</span>
                  <Rating
                    emptySymbol={<FaRegStar />}
                    fullSymbol={<FaStar />}
                    initialRating={product?.rating || 0}
                    readonly
                    className='text-[#FBCA04] text-4xl leading-none'
                  />
                </div>
                <span className='text-gray-400 text-sm'>({product.comments?.length} đánh giá)</span>
              </div>

              <ReviewRate comments={product?.comments} />
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
