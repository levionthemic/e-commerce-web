import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'
import { selectCurrentCart } from '~/redux/cart/cartSlice'

function Completion() {
  const currentCart = useSelector(selectCurrentCart)
  return (
    <div className="container mx-auto">
      <div className="py-4 grid grid-cols-3 gap-10">
        <div className="py-4 col-span-2 flex items-center justify-center flex-col">
          <div className='text-2xl font-semibold mb-2'>Đã đặt hàng thành công!</div>
          <p>Bạn có thể theo dõi đơn hàng đã đặt trong mục <Link to={'/user/order'} className='italic'>Đơn hàng của tôi</Link></p>
          <Button className='mt-10'><Link to='/buyer'>Tiếp tục mua sắm</Link></Button>
        </div>

        <div className="">
          <div className="border border-b-[#ddd] rounded-md mb-4 p-4 shadow-md">
            <div className='text-md text-mainColor1-800 font-medium'>Danh sách sản phẩm</div>
            {currentCart?.fullProducts.map((product, index) => (
              <div key={index} className='flex items-center gap-2 my-3 overflow-hidden'>
                <img src={product?.thumbnailUrl} alt="" width={40} height={40} />
                <div className='flex flex-col gap-1'>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className='text-sm line-clamp-1 text-mainColor2-800'>{product?.name}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{product?.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <div className='flex flex-col lg:flex-row lg:items-center lg:gap-4'>
                    <Badge className='bg-mainColor2-800/90'>{currentCart?.products[index].quantity} sản phẩm</Badge>
                    <span className='text-[0.8rem] text-muted-foreground'>x {product?.price.toLocaleString('vi-VN')}<sup>đ</sup></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='border border-b-[#ddd] rounded-md p-4 shadow-md'>
            <div className='text-md text-mainColor1-800 font-medium'>Tóm tắt đơn hàng</div>

            <div className='px-2'>
              <div className='flex items-center justify-between text-sm my-2'>
                <span className='opacity-40'>Tổng tiền hàng</span>
                <span className='font-bold text-red-600'>
                  {(0).toLocaleString()}
                  <sup>đ</sup>
                </span>
              </div>
              <div className='flex items-center justify-between text-sm my-2'>
                <span className='opacity-40'>Phí vận chuyển</span>
                <span className='font-bold text-red-600'>0đ</span>
              </div>
            </div>

            <div>
              <div className='font-medium text-mainColor1-800'>Tổng tiền thanh toán</div>
              <div className='text-red-600 text-right text-xl font-bold'>
                {(0 + 0).toLocaleString()}
                <sup>đ</sup>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Completion