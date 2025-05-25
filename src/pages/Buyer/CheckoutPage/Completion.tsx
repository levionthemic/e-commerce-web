import { FaCheck } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '~/components/ui/tooltip'

function Completion() {
  const location = useLocation()
  const checkoutData = location?.state?.checkoutData

  return (
    <div className='container mx-auto'>
      <div className='relative flex max-h-full py-4'>
        <div className='w-[75%] py-4 col-span-2 flex items-center justify-center flex-col'>
          <div className='p-5 mb-10 text-3xl text-white bg-green-400 rounded-full'>
            <FaCheck />
          </div>
          <div className='mb-2 text-2xl font-semibold'>
            Đã đặt hàng thành công!
          </div>
          <p>
            Bạn có thể theo dõi đơn hàng đã đặt trong mục{' '}
            <Link to={'/user/order'} className='italic'>
              Đơn hàng của tôi
            </Link>
          </p>
          <div className='flex items-center justify-center gap-6'>
            <Button className='mt-10 hover:shadow-xl'>
              <Link to='/buyer'>Tiếp tục mua sắm</Link>
            </Button>
            <Button className='mt-10 bg-white border border-mainColor1-100 text-mainColor1-800 hover:bg-mainColor1-800 hover:text-white hover:shadow-xl'>
              <Link to='/user/order'>Xem đơn hàng</Link>
            </Button>
          </div>
        </div>

        <div className='flex-1'>
          {checkoutData?.map((data, index: number) => (
            <div key={index}>
              <div className='mb-2 text-xl font-semibold text-mainColor1-800'>
                Đơn hàng {index + 1}
              </div>
              <div className='border border-b-[#ddd] rounded-md mb-4 p-4 shadow-md'>
                <div className='font-medium text-md text-mainColor1-800'>
                  Danh sách sản phẩm
                </div>
                {data?.insertedOrder?.itemList?.map(
                  (product, index: number) => (
                    <div
                      key={index}
                      className='flex items-center gap-2 my-6 overflow-hidden'
                    >
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
                              <span className='text-sm leading-none line-clamp-1 text-mainColor2-800'>
                                {product?.productName}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{product?.productName}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <p className='line-clamp-1 text-xs text-gray-400 mb-0.5'>
                          Loại: {product.typeName}
                        </p>
                        <div className='flex flex-col lg:flex-row lg:items-center lg:gap-4'>
                          <Badge className='bg-mainColor2-800/90'>
                            {product.quantity} sản phẩm
                          </Badge>
                          <span className='text-[0.8rem] text-muted-foreground'>
                            x {product?.price.toLocaleString('vi-VN')}
                            <sup>đ</sup>
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className='border border-b-[#ddd] rounded-md p-4 shadow-md'>
                <div className='font-medium text-md text-mainColor1-800'>
                  Tóm tắt đơn hàng
                </div>

                <div className='px-2'>
                  <div className='flex items-center justify-between my-2 text-sm'>
                    <span className='opacity-40'>Tổng tiền hàng</span>
                    <span className='font-bold text-red-600'>
                      {data?.insertedOrder.orgPrice?.toLocaleString('vi-VN')}
                      <sup>đ</sup>
                    </span>
                  </div>
                  <div className='flex items-center justify-between my-2 text-sm'>
                    <span className='opacity-40'>Phí vận chuyển</span>
                    <span className='font-bold text-red-600'>
                      {data?.insertedOrder.shippingFee?.toLocaleString('vi-VN')}
                      <sup>đ</sup>
                    </span>
                  </div>
                </div>

                <div>
                  <div className='font-medium text-mainColor1-800'>
                    Tổng tiền thanh toán
                  </div>
                  <div className='text-xl font-bold text-right text-red-600'>
                    {(
                      data?.insertedOrder?.orgPrice +
                      data?.insertedOrder?.shippingFee
                    )?.toLocaleString('vi-VN')}
                    <sup>đ</sup>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Completion
