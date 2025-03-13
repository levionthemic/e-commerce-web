import { AlignEndHorizontal, AlignStartHorizontal, ArrowDown, ArrowUp, Blocks, CalendarArrowUp, CalendarSync, Coins, HandCoins, NotebookText, Package, PackageCheck, PackageMinus, Percent, Ruler, Truck, Undo2 } from 'lucide-react'

function GeneralTab() {
  return (
    <div>
      <div className="text-lg font-semibold mb-4">Tổng quan kho hàng</div>

      <div className="mb-8">
        <div className='font-medium text-md mb-2'>Các thông tin cơ bản</div>
        <div className="grid grid-cols-5 gap-6">
          <div className='bg-white p-4 rounded-lg'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col gap-2'>
                <span className='font-medium'>Diện tích kho</span>
                <span className='text-2xl font-semibold'>200 <span className='text-muted-foreground text-sm'>m<sup>2</sup></span></span>
              </div>
              <div className='bg-yellow-100 text-yellow-500 p-2 rounded-full'>
                <Ruler />
              </div>
            </div>
          </div>

          <div className='bg-white p-4 rounded-lg'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col gap-2'>
                <span className='font-medium'>Tổng Sản phẩm trong kho</span>
                <span className='text-2xl font-semibold'>1458 <span className='text-muted-foreground text-sm'>sản phẩm</span></span>
              </div>
              <div className='bg-blue-100 p-2 rounded-full'>
                <Blocks className='text-blue-500'/>
              </div>
            </div>
          </div>

          <div className='bg-white p-4 rounded-lg'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col gap-2'>
                <span className='font-medium'>Ngưỡng tối đa</span>
                <span className='text-2xl font-semibold'>2000 <span className='text-muted-foreground text-sm'>sản phẩm</span></span>
              </div>
              <div className='bg-red-100 text-red-500 p-2 rounded-full'>
                <AlignStartHorizontal />
              </div>
            </div>
          </div>

          <div className='bg-white p-4 rounded-lg'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col gap-2'>
                <span className='font-medium'>Ngưỡng tối thiểu</span>
                <span className='text-2xl font-semibold'>100 <span className='text-muted-foreground text-sm'>sản phẩm</span></span>
              </div>
              <div className='bg-orange-100 text-orange-500 p-2 rounded-full'>
                <AlignEndHorizontal />
              </div>
            </div>
          </div>

          <div className='bg-white p-4 rounded-lg'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col gap-2'>
                <span className='font-medium'>Tình trạng kho hàng</span>
                <span className='text-2xl font-semibold'>1</span>
              </div>
              <div className='bg-green-100 text-green-500 p-2 rounded-full'>
                <PackageCheck />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="mb-4">
          <div className='font-medium text-md mb-2'>Hiệu suất nhập - xuất kho</div>
          <div className="grid grid-rows-3 gap-6">
            <div className='bg-white p-4 rounded-lg'>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-2'>
                  <span className='font-medium'>Tỉ lệ nhập - xuất</span>
                  <span className='text-2xl font-semibold'>5.03 <span className='text-muted-foreground text-sm'>%</span></span>
                </div>
                <div className='bg-gray-100 text-gray-500 p-2 rounded-full'>
                  <Percent />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <div className='flex items-center gap-1 text-green-500 leading-none'>
                  <ArrowUp className='leading-none w-4'/>
                  <span className='leading-none'>1.53%</span>
                </div>
                <span className='text-xs text-muted-foreground leading-none'>so với tháng trước</span>
              </div>
            </div>

            <div className='bg-white p-4 rounded-lg'>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-2'>
                  <span className='font-medium'>Thời gian nhập hàng trung bình</span>
                  <span className='text-2xl font-semibold'>4.3 <span className='text-muted-foreground text-sm'>ngày</span></span>
                </div>
                <div className='bg-gray-100 text-gray-500 p-2 rounded-full'>
                  <CalendarArrowUp />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <div className='flex items-center gap-1 text-red-500 leading-none'>
                  <ArrowDown className='leading-none w-4'/>
                  <span className='leading-none'>1.53%</span>
                </div>
                <span className='text-xs text-muted-foreground leading-none'>so với tháng trước</span>
              </div>
            </div>

            <div className='bg-white p-4 rounded-lg'>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-2'>
                  <span className='font-medium'>Thời gian lưu kho trung bình</span>
                  <span className='text-2xl font-semibold'>15.8 <span className='text-muted-foreground text-sm'>ngày</span></span>
                </div>
                <div className='bg-gray-100 text-gray-500 p-2 rounded-full'>
                  <CalendarSync />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <div className='flex items-center gap-1 text-red-500 leading-none'>
                  <ArrowDown className='leading-none w-4'/>
                  <span className='leading-none'>1.53%</span>
                </div>
                <span className='text-xs text-muted-foreground leading-none'>so với tháng trước</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className='font-medium text-md mb-2'>Tình trạng tồn kho</div>
          <div className="grid grid-rows-3 gap-6">
            <div className='bg-white p-4 rounded-lg'>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-2'>
                  <span className='font-medium'>Hàng tồn lâu</span>
                  <span className='text-2xl font-semibold'>142 <span className='text-muted-foreground text-sm'>đơn vị</span></span>
                </div>
                <div className='bg-slate-100 text-slate-500 p-2 rounded-full'>
                  <Package />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <div className='flex items-center gap-1 text-green-500 leading-none'>
                  <ArrowUp className='leading-none w-4'/>
                  <span className='leading-none'>1.53%</span>
                </div>
                <span className='text-xs text-muted-foreground leading-none'>so với tháng trước</span>
              </div>
            </div>

            <div className='bg-white p-4 rounded-lg'>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-2'>
                  <span className='font-medium'>Hàng sắp hết hạn</span>
                  <span className='text-2xl font-semibold'>58 <span className='text-muted-foreground text-sm'>đơn vị</span></span>
                </div>
                <div className='bg-slate-100 text-slate-500 p-2 rounded-full'>
                  <PackageCheck />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <div className='flex items-center gap-1 text-green-500 leading-none'>
                  <ArrowUp className='leading-none w-4'/>
                  <span className='leading-none'>1.53%</span>
                </div>
                <span className='text-xs text-muted-foreground leading-none'>so với tháng trước</span>
              </div>
            </div>

            <div className='bg-white p-4 rounded-lg'>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-2'>
                  <span className='font-medium'>Hàng lỗi</span>
                  <span className='text-2xl font-semibold'>74 <span className='text-muted-foreground text-sm'>đơn vị</span></span>
                </div>
                <div className='bg-slate-100 text-slate-500 p-2 rounded-full'>
                  <PackageMinus />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <div className='flex items-center gap-1 text-red-500 leading-none'>
                  <ArrowDown className='leading-none w-4'/>
                  <span className='leading-none'>1.53%</span>
                </div>
                <span className='text-xs text-muted-foreground leading-none'>so với tháng trước</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className='font-medium text-md mb-2'>Tình trạng sản phẩm trong các đơn hàng</div>
          <div className="grid grid-rows-3 gap-6">
            <div className='bg-white p-4 rounded-lg'>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-2'>
                  <span className='font-medium'>Đơn hàng chờ xử lý</span>
                  <span className='text-2xl font-semibold'>41 <span className='text-muted-foreground text-sm'>sản phẩm</span></span>
                </div>
                <div className='bg-zinc-100 text-zinc-500 p-2 rounded-full'>
                  <NotebookText />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <div className='flex items-center gap-1 text-red-500 leading-none'>
                  <ArrowDown className='leading-none w-4'/>
                  <span className='leading-none'>1.53%</span>
                </div>
                <span className='text-xs text-muted-foreground leading-none'>so với tháng trước</span>
              </div>
            </div>

            <div className='bg-white p-4 rounded-lg'>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-2'>
                  <span className='font-medium'>Đơn hàng đang giao</span>
                  <span className='text-2xl font-semibold'>59 <span className='text-muted-foreground text-sm'>sản phẩm</span></span>
                </div>
                <div className='bg-zinc-100 text-zinc-500 p-2 rounded-full'>
                  <Truck />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <div className='flex items-center gap-1 text-red-500 leading-none'>
                  <ArrowDown className='leading-none w-4'/>
                  <span className='leading-none'>1.53%</span>
                </div>
                <span className='text-xs text-muted-foreground leading-none'>so với tháng trước</span>
              </div>
            </div>

            <div className='bg-white p-4 rounded-lg'>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-2'>
                  <span className='font-medium'>Đơn hoàn trả</span>
                  <span className='text-2xl font-semibold'>19 <span className='text-muted-foreground text-sm'>sản phẩm</span></span>
                </div>
                <div className='bg-zinc-100 text-zinc-500 p-2 rounded-full'>
                  <Undo2 />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <div className='flex items-center gap-1 text-green-500 leading-none'>
                  <ArrowUp className='leading-none w-4'/>
                  <span className='leading-none'>1.53%</span>
                </div>
                <span className='text-xs text-muted-foreground leading-none'>so với tháng trước</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className='font-medium text-md mb-2'>Giá trị hàng hóa trong kho</div>
          <div className="grid grid-rows-2 gap-6">
            <div className='bg-white p-4 rounded-lg'>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-2'>
                  <span className='font-medium'>Tổng giá trị hàng tồn kho</span>
                  <span className='text-2xl font-semibold'>79.485.000 <span className='text-muted-foreground text-sm'>VNĐ</span></span>
                </div>
                <div className='bg-stone-100 text-stone-500 p-2 rounded-full'>
                  <Coins />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <div className='flex items-center gap-1 text-green-500 leading-none'>
                  <ArrowUp className='leading-none w-4'/>
                  <span className='leading-none'>1.53%</span>
                </div>
                <span className='text-xs text-muted-foreground leading-none'>so với tháng trước</span>
              </div>
            </div>

            <div className='bg-white p-4 rounded-lg'>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-2'>
                  <span className='font-medium'>Giá trị hàng lỗi</span>
                  <span className='text-2xl font-semibold'>12.412.000 <span className='text-muted-foreground text-sm'>VNĐ</span></span>
                </div>
                <div className='bg-stone-100 text-stone-500 p-2 rounded-full'>
                  <HandCoins />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <div className='flex items-center gap-1 text-red-500 leading-none'>
                  <ArrowDown className='leading-none w-4'/>
                  <span className='leading-none'>1.53%</span>
                </div>
                <span className='text-xs text-muted-foreground leading-none'>so với tháng trước</span>
              </div>
            </div>
          </div>
        </div>

      </div>


    </div>
  )
}

export default GeneralTab