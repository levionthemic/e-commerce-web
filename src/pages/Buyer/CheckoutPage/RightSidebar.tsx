import { Badge } from '~/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '~/components/ui/tooltip'

function RightSidebar({ clusterOrder, checkoutInfo, index }) {
  const totalPrice = clusterOrder.itemList?.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  )
  return (
    <div className='sticky left-0 mb-10 top-36 h-fit'>
      <div className='border border-b-[#ddd] rounded-md mb-4 p-4 shadow-md'>
        <div className='font-medium text-md text-mainColor1-800'>
          Danh sách sản phẩm
        </div>
        {clusterOrder.itemList?.map((product, index) => (
          <div
            key={index}
            className='flex items-center gap-2 my-6 overflow-hidden'
          >
            <img src={product?.avatar} alt='' width={40} height={40} />
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
        ))}
      </div>

      <div className='border border-b-[#ddd] rounded-md p-4 shadow-md'>
        <div className='font-medium text-md text-mainColor1-800'>Chi tiết</div>

        <div className='px-2'>
          <div className='flex items-center justify-between my-2 text-sm'>
            <span className='opacity-40'>Tổng tiền hàng</span>
            <span className='font-bold text-red-600'>
              {totalPrice?.toLocaleString('vi-VN')}
              <sup>đ</sup>
            </span>
          </div>
          <div className='flex items-center justify-between my-2 text-sm'>
            <span className='opacity-40'>Phí vận chuyển</span>
            <span className='font-bold text-red-600'>
              {(
                checkoutInfo?.shipping?.[index]?.detail?.total || 0
              )?.toLocaleString('vi-VN')}
              <sup>đ</sup>
            </span>
          </div>
          <div className='flex items-center justify-between my-2 text-sm'>
            <span className='opacity-40'>Giảm giá sản phẩm</span>
            <span className='font-bold text-red-600'>
              - {(0)?.toLocaleString('vi-VN')}
              <sup>đ</sup>
            </span>
          </div>
          <div className='flex items-center justify-between my-2 text-sm'>
            <span className='opacity-40'>Giảm giá vận chuyển</span>
            <span className='font-bold text-red-600'>
              - {(0)?.toLocaleString('vi-VN')}
              <sup>đ</sup>
            </span>
          </div>
          <div className='flex items-center justify-between my-2 text-sm'>
            <span className='opacity-40'>Thuế</span>
            <span className='font-bold text-red-600'>
              {(0)?.toLocaleString('vi-VN')}
              <sup>đ</sup>
            </span>
          </div>
        </div>

        <div>
          <div className='font-bold text-mainColor1-800'>
            Tổng tiền thanh toán
          </div>
          <div className='text-xl font-bold text-right text-red-600'>
            {(
              totalPrice + (checkoutInfo?.shipping?.[index]?.detail?.total || 0)
            ).toLocaleString('vi-VN')}
            <sup>đ</sup>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightSidebar
