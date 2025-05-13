import dayjs from 'dayjs'
import {
  Coins,
  Layers,
  MoreHorizontal,
  Package2,
  Percent,
  TrendingDown,
  TrendingUp
} from 'lucide-react'
import { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import { getBestSoldProductsAPI, getLatestOrdersAPI } from '~/apis/sellerApis'
import logo from '~/assets/ghn-logo.png'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '~/components/ui/table'
import { useTimeCount } from '~/hooks/use-time-count'
import { cn } from '~/lib/utils'
import { MultiLineChartComponent } from '~/pages/Seller/Dashboard/MultiLineChartComponent'
import { PieChartComponent } from '~/pages/Seller/Dashboard/PieChartComponent'
import { ORDER_STATUS } from '~/utils/constants'

function Dashboard() {
  const { date, time } = useTimeCount()

  const [bestSoldProducts, setBestSoldProducts] = useState([])
  const [latestOrders, setLatestOrders] = useState([])

  useEffect(() => {
    getBestSoldProductsAPI().then((data) => setBestSoldProducts(data?.products))
  }, [])

  useEffect(() => {
    getLatestOrdersAPI().then((data) => setLatestOrders(data))
  }, [])

  return (
    <div className='py-4 px-6'>
      <div className='flex items-end justify-between mb-4'>
        <div className=''>
          <div className='font-bold text-xl'>Dashboard</div>
          <p className='text-sm text-gray-500'>
            Tổng quan về cửa hàng của bạn trong tuần này
          </p>
        </div>
        <span className='italic text-sm text-gray-500 text-right'>
          {time}
          <br />
          {date}
        </span>
      </div>

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
        <div className='col-span-1 bg-white rounded-lg p-6'>
          <div className='flex items-center gap-3 mb-3 text-gray-500'>
            <Coins />
            <span className='font-semibold text-sm'>Tổng Doanh thu</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-3xl font-bold flex flex-col gap-1/2'>
              <CountUp end={2158000} start={1.5} separator='.' />
              <span className='text-xs text-gray-600'>VNĐ</span>
            </span>
            <div className='flex flex-col items-end'>
              <div className='flex items-center gap-2 text-sm text-green-600'>
                <TrendingUp />
                <span>
                  +<CountUp end={6.0} start={1.5} decimals={2} />%
                </span>
              </div>
              <span className='text-xs text-gray-400'>so với tuần trước</span>
            </div>
          </div>

          <div></div>
        </div>

        <div className='col-span-1 bg-white rounded-lg p-6'>
          <div className='flex items-center gap-3 mb-3 text-gray-500'>
            <Package2 />
            <span className='font-semibold text-sm'>Tổng Sản phẩm</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-3xl font-bold flex flex-col gap-1/2'>
              <CountUp end={488} start={1.5} />
              <span className='text-xs text-gray-600'>sản phẩm</span>
            </span>
            <div className='flex flex-col items-end'>
              <div className='flex items-center gap-2 text-sm text-red-600'>
                <TrendingDown />
                <span>
                  -<CountUp end={6.0} start={1.5} decimals={2} />%
                </span>
              </div>
              <span className='text-xs text-gray-400'>so với tuần trước</span>
            </div>
          </div>

          <div></div>
        </div>

        <div className='col-span-1 bg-white rounded-lg p-6'>
          <div className='flex items-center gap-3 mb-3 text-gray-500'>
            <Layers />
            <span className='font-semibold text-sm'>Tổng Đơn hàng</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-3xl font-bold flex flex-col gap-1/2'>
              <CountUp end={123} start={1.5} />
              <span className='text-xs text-gray-600'>đơn hàng</span>
            </span>
            <div className='flex flex-col items-end'>
              <div className='flex items-center gap-2 text-sm text-red-600'>
                <TrendingDown />
                <span>
                  -<CountUp end={6.0} start={1.5} decimals={2} />%
                </span>
              </div>
              <span className='text-xs text-gray-400'>so với tuần trước</span>
            </div>
          </div>

          <div></div>
        </div>

        <div className='col-span-1 bg-white rounded-lg p-6'>
          <div className='flex items-center gap-3 mb-3 text-gray-500'>
            <Percent />
            <span className='font-semibold text-sm'>Tỉ lệ chuyển đổi</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-3xl font-bold flex flex-col gap-1/2'>
              <CountUp end={5.03} start={1.5} decimals={2} />
              <span className='text-xs text-gray-600'>%</span>
            </span>
            <div className='flex flex-col items-end'>
              <div className='flex items-center gap-2 text-sm text-red-600'>
                <TrendingDown />
                <span>
                  -<CountUp end={5.03} start={1.5} decimals={2} />%
                </span>
              </div>
              <span className='text-xs text-gray-400'>so với tuần trước</span>
            </div>
          </div>

          <div></div>
        </div>
      </div>

      <div className='grid grid-cols-10 gap-4 mb-4'>
        <div className='col-span-7 bg-white rounded-lg p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='font-semibold text-lg'>Tổng quan</div>
            <MoreHorizontal className='text-gray-400 cursor-pointer' />
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <MultiLineChartComponent />
            <PieChartComponent />
          </div>
        </div>

        <div className='col-span-3 bg-white rounded-lg p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='font-semibold text-lg'>Sản phẩm bán chạy nhất</div>
            <MoreHorizontal className='text-gray-400 cursor-pointer' />
          </div>

          <ul className='space-y-2'>
            {bestSoldProducts?.slice(0, 8)?.map((product) => (
              <li key={product?._id} className='flex items-center gap-4'>
                <div className='flex items-center gap-3 flex-1'>
                  <img
                    src={product?.avatar}
                    alt='Ảnh'
                    className='size-10 rounded-lg object-cover min-w-10'
                  />
                  <div className='flex flex-col'>
                    <span className='line-clamp-1'>{product?.name}</span>
                    <span className='text-sm text-muted-foreground'>
                      {product?.avgPrice.toLocaleString('vi-vn')}
                      <sup>đ</sup>
                    </span>
                  </div>
                </div>
                <div className='border rounded-lg py-1.5 px-2 text-sm font-semibold'>
                  {product?.sold} lượt bán
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='grid grid-cols-10 gap-4'>
        <div className='col-span-7 bg-white rounded-lg p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='font-semibold text-lg'>Đơn hàng mới nhất</div>
            <Button variant='outline' className=''>
              Tất cả
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow className='hover:bg-transparent'>
                <TableHead>Mã đơn hàng</TableHead>
                <TableHead>Ngày đặt</TableHead>
                <TableHead>Tên khách hàng</TableHead>
                <TableHead>Thành tiền</TableHead>
                <TableHead className='text-right'>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {latestOrders.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <div>{item._id}</div>
                  </TableCell>
                  <TableCell>
                    {dayjs(item.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>{item.buyerName}</TableCell>
                  <TableCell className='font-bold text-red-500'>
                    {item.finalPrice.toLocaleString('vi-vn')}
                    <sup>đ</sup>
                  </TableCell>
                  <TableCell className='text-right'>
                    <Badge
                      className={cn(
                        item.status === ORDER_STATUS.CANCELLED &&
                          'bg-muted-foreground/60 text-primary-foreground',
                        item.status === ORDER_STATUS.PENDING && 'bg-red-500',
                        item.status === ORDER_STATUS.SHIPPING && 'bg-amber-400',
                        item.status === ORDER_STATUS.SUCCESS && 'bg-green-600',
                        item.status === ORDER_STATUS.FAIL && 'bg-gray-600'
                      )}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className='col-span-3 bg-white rounded-lg p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='font-semibold text-lg'>Khách hàng thân thiết</div>
            <MoreHorizontal className='text-gray-400 cursor-pointer' />
          </div>

          <ul>
            <li className='flex items-center gap-4'>
              <div className='flex items-center gap-3 flex-1'>
                <Avatar>
                  <AvatarImage src={logo} />
                  <AvatarFallback>LV</AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                  <span className='line-clamp-1'>Tên khách hàng</span>
                  <span className='text-sm text-muted-foreground'>
                    15 đơn hàng
                  </span>
                </div>
              </div>
              <div className='border rounded-lg py-1.5 px-2 text-sm font-semibold'>
                Xem chi tiết
              </div>
            </li>
            <li className='flex items-center gap-4 mt-4'>
              <div className='flex items-center gap-3 flex-1'>
                <Avatar>
                  <AvatarImage src={logo} />
                  <AvatarFallback>LV</AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                  <span className='line-clamp-1'>Tên khách hàng</span>
                  <span className='text-sm text-muted-foreground'>
                    15 đơn hàng
                  </span>
                </div>
              </div>
              <div className='border rounded-lg py-1.5 px-2 text-sm font-semibold'>
                Xem chi tiết
              </div>
            </li>
            <li className='flex items-center gap-4 mt-4'>
              <div className='flex items-center gap-3 flex-1'>
                <Avatar>
                  <AvatarImage src={logo} />
                  <AvatarFallback>LV</AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                  <span className='line-clamp-1'>Tên khách hàng</span>
                  <span className='text-sm text-muted-foreground'>
                    15 đơn hàng
                  </span>
                </div>
              </div>
              <div className='border rounded-lg py-1.5 px-2 text-sm font-semibold'>
                Xem chi tiết
              </div>
            </li>
            <li className='flex items-center gap-4 mt-4'>
              <div className='flex items-center gap-3 flex-1'>
                <Avatar>
                  <AvatarImage src={logo} />
                  <AvatarFallback>LV</AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                  <span className='line-clamp-1'>Tên khách hàng</span>
                  <span className='text-sm text-muted-foreground'>
                    15 đơn hàng
                  </span>
                </div>
              </div>
              <div className='border rounded-lg py-1.5 px-2 text-sm font-semibold'>
                Xem chi tiết
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
