import { useNavigate } from 'react-router-dom'
import Rating from 'react-rating'
import { clsx } from 'clsx'
import { MdAddShoppingCart } from 'react-icons/md'
import { BsHandbag } from 'react-icons/bs'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'
import { Separator } from '~/components/ui/separator'

import { FaRegStar, FaStar } from 'react-icons/fa'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { useState } from 'react'
import { RiSubtractFill } from 'react-icons/ri'
import { IoMdAdd } from 'react-icons/io'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { addToCartAPI, fetchCurrentCartAPI } from '~/redux/cart/cartSlice'

function Product({ product, loading }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [typeId, setTypeId] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [isAddToCart, setIsAddToCart] = useState(false)

  const handleAddToCart = () => {
    if (!typeId) {
      toast.error('Bạn chưa chọn loại sản phẩm!', { position: 'top-right' })
      return
    }
    const data = { productId: product?._id, typeId, quantity }
    toast.promise(
      dispatch(addToCartAPI(data)).unwrap(),
      {
        loading: 'Đang thêm vào giỏ hàng...',
        success: (res) => {
          if (!res.error) {
            dispatch(fetchCurrentCartAPI(data))
            setIsAddToCart(false)
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

  const handleChooseType = () => {
    if (isAddToCart) {
      handleAddToCart()
    } else {
      handleCheckout()
    }
  }

  const handleCloseDrawer = (open) => {
    if (!open) {
      setTypeId(null)
      setQuantity(1)
      setIsAddToCart(false)
    }
  }

  return (
    <Card className={clsx({
      'border-none shadow-none': loading,
      'cursor-pointer border-gray-200 hover:border-[2px] border shadow hover:shadow-xl overflow-hidden': !loading
    })}>
      <CardContent className='p-2' onClick={() => navigate(`/buyer/product/${product._id}`)}>
        {loading
          ? <Skeleton className='w-full aspect-square'/>
          : <img src={product?.avatar} alt="" className='w-full aspect-square object-contain'/>
        }
      </CardContent>

      <CardHeader className='px-4' onClick={() => navigate(`/buyer/product/${product._id}`)}>
        {loading
          ? <Skeleton className='h-[32px]'/>
          : <CardTitle className='line-clamp-2 min-h-[32px] text-mainColor1-600'>{product?.name}</CardTitle>
        }

        {loading
          ? <Skeleton className='h-[40px]'/>
          : <CardDescription>
            <div className='text-lg font-bold text-[#ff4d4f] mb-1 text-justify'>
              {product?.avgPrice.toLocaleString()}
              <sup>đ</sup>
            </div>
            <div className='text-sm text-gray-400 flex justify-between items-center my-2'>
              <div className='flex items-center gap-2'>
                <span>{product?.rating || '0'}</span>
                <Rating
                  emptySymbol={<FaRegStar />}
                  fullSymbol={<FaStar />}
                  initialRating={product?.rating || 0}
                  readonly
                  className='text-[#FBCA04] text-md leading-none'
                />
              </div>

              <span>| Đã bán: {product?.sold || 0}</span>
            </div>
          </CardDescription>
        }
      </CardHeader>

      {!loading && <Separator className='border-gray-200'/>}

      {loading
        ? <Skeleton className='pl-4 py-2 h-4'/>
        : <Drawer onAnimationEnd={(open) => handleCloseDrawer(open)}>
          <DrawerTrigger asChild>
            <CardFooter className='p-0 text-sm cursor-pointer grid grid-cols-2 text-center'>
              <div className='hover:bg-mainColor2-800 text-mainColor2-800 hover:text-white flex items-center justify-center p-2 border-r border-r-gray-200'>
                <MdAddShoppingCart className='text-2xl' onClick={() => setIsAddToCart(true)} />
              </div>

              <div className='hover:bg-mainColor1-800 p-2 text-mainColor1-800 hover:text-white flex items-center justify-center'>
                <BsHandbag className='text-2xl' />
              </div>
            </CardFooter>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Loại sản phẩm</DrawerTitle>
              <DrawerDescription>Chọn loại sản phẩm trước khi mua hoặc thêm vào giỏ hàng.</DrawerDescription>
            </DrawerHeader>

            <div className='p-4'>
              <div className='flex items-center gap-10 mb-6'>
                <div className='w-28 h-28 border border-gray-300 rounded-lg overflow-hidden'>
                  <img src={product?.avatar} alt="" className='w-full aspect-square object-contain' />
                </div>
                <div className='flex flex-col gap-2'>
                  <div>{product?.name}</div>
                  <div className='text-[#f90606] font-bold text-2xl'>
                    {/* eslint-disable-next-line no-unsafe-optional-chaining */}
                    {(product?.types.find(t => t.typeId.toString() === typeId)?.price || product?.avgPrice).toLocaleString()}
                    <sup>đ</sup>
                  </div>
                  <div className="flex items-center gap-20">
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
                            quantity < (product.types.find(t => t.typeId.toString() === typeId)?.stock || 1000)
                              ? quantity + 1
                              : product.types.find(t => t.typeId.toString() === typeId)?.stock || 1000
                          )
                        }
                        className='cursor-pointer text-xl text-mainColor1-800 hover:bg-mainColor2-800/40 rounded-md'
                      />
                    </div>

                    <div className='text-sm text-gray-500'>Còn lại: {product.types.find(t => t.typeId.toString() === typeId)?.stock || '(Chọn loại để hiện số lượng)'}</div>
                  </div>

                </div>
              </div>

              <fieldset className="space-y-4">
                <RadioGroup className="gap-0 -space-y-px rounded-md shadow-xs" onValueChange={setTypeId}>
                  {product?.types?.map((type) => (
                    <div
                      key={type.typeId}
                      className="border-input has-data-[state=checked]:border-ring has-data-[state=checked]:bg-accent relative flex flex-col gap-4 border px-4 py-3 outline-none first:rounded-t-md last:rounded-b-md has-data-[state=checked]:z-10"
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

            <DrawerFooter>
              <DrawerClose asChild>
                <Button onClick={handleChooseType}>Xác nhận</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>


      }
    </Card>
  )
}

export default Product
