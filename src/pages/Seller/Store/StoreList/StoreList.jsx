import { ArrowRightIcon, Banknote, Box, NotebookText, SearchIcon, Store } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '~/components/ui/breadcrumb'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useTimeCount } from '~/hooks/use-time-count'
import StoreCard from '~/pages/Seller/Store/StoreList/StoreCard'
import banner from '~/assets/banner.jpg'

function StoreList() {
  const { date, time } = useTimeCount()

  return (
    <div className='px-6 py-4'>
      <div className="flex items-center justify-between mb-4 gap-8">
        <div className="flex-1 flex items-center justify-between">
          <div className="">
            <div className="font-bold text-xl mb-2">Danh sách cửa hàng</div>
            <Breadcrumb>
              <BreadcrumbList className='text-sm'>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to='/seller'>Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <Link to='/seller/products'>Cửa hàng</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Danh sách cửa hàng</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        <span className="italic text-sm text-gray-500 text-right">{time}<br />{date}</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="col-span-1 bg-white rounded-lg p-4 flex items-center justify-between">
          <div className="">
            <span className="font-medium text-sm text-gray-500 mb-2 inline-block">Tổng số cửa hàng</span>
            <span className="text-2xl font-bold flex items-end gap-1">
              <span className='leading-none'>2</span>
              <span className="text-xs text-gray-600">cửa hàng</span>
            </span>
          </div>
          <div className='bg-[#F0FAFF] text-blue-500 p-2 rounded-full'>
            <Store />
          </div>
        </div>
        <div className="col-span-1 bg-white rounded-lg p-4 flex items-center justify-between">
          <div className="">
            <span className="font-medium text-sm text-gray-500 mb-2 inline-block">Tổng số sản phẩm</span>
            <span className="text-2xl font-bold flex items-end gap-1">
              <span className='leading-none'>214</span>
              <span className="text-xs text-gray-600">sản phẩm</span>
            </span>
          </div>
          <div className='bg-[#FFFAEF] text-yellow-500 p-2 rounded-full'>
            <Box />
          </div>
        </div>
        <div className="col-span-1 bg-white rounded-lg p-4 flex items-center justify-between">
          <div className="">
            <span className="font-medium text-sm text-gray-500 mb-2 inline-block">Tổng đơn hàng trong tháng</span>
            <span className="text-2xl font-bold flex items-end gap-1">
              <span className='leading-none'>148</span>
              <span className="text-xs text-gray-600">đơn hàng</span>
            </span>
          </div>
          <div className='bg-[#F1FCF6] text-green-600 p-2 rounded-full'>
            <NotebookText />
          </div>
        </div>
        <div className="col-span-1 bg-white rounded-lg p-4 flex items-center justify-between">
          <div className="">
            <span className="font-medium text-sm text-gray-500 mb-2 inline-block">Doanh thu tháng này</span>
            <span className="text-2xl font-bold flex items-end gap-1">
              <span className='leading-none'>32.500.000</span>
              <span className="text-xs text-gray-600">VND</span>
            </span>
          </div>
          <div className='bg-[#E8E8E8] text-gray-500 p-2 rounded-full'>
            <Banknote />
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-3 rounded-lg flex items-center justify-between gap-20 mb-8">
        <div className='flex items-center gap-2'>
          <Button variant='outline'>Lọc</Button>
          <Button variant='outline'>Sắp xếp</Button>
        </div>

        <div className="relative w-full">
          <Input
            className="peer ps-9 pe-9"
            placeholder="Tìm kiếm nhanh..."
            type="search"
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <SearchIcon size={16} />
          </div>
          <button
            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Submit search"
            type="submit"
          >
            <ArrowRightIcon size={16} aria-hidden="true" />
          </button>
        </div>

        <Button>+ Đăng kí cửa hàng mới</Button>
      </div>

      {/* List Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StoreCard
          logoUrl={banner}
          name="Cửa hàng thời trang"
          status="active"
          createdAt="15/03/2025"
          productCount={48}
          revenue="32.500.000đ"
          onView={() => console.log('Xem chi tiết')}
          onEdit={() => console.log('Chỉnh sửa')}
        />
      </div>
    </div>
  )
}

export default StoreList