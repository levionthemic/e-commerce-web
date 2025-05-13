import {
  Coins,
  Layers,
  MoreHorizontal,
  Package2,
  Percent,
  TrendingDown,
  TrendingUp
} from 'lucide-react'
import CountUp from 'react-countup'
import logo from '~/assets/ghn-logo.png'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
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
import { MultiLineChartComponent } from '~/pages/Seller/Dashboard/MultiLineChartComponent'
import { PieChartComponent } from '~/pages/Seller/Dashboard/PieChartComponent'

const items = [
  {
    id: '1',
    name: 'Alex Thompson',
    username: '@alexthompson',
    image:
      'https://res.cloudinary.com/dlzlfasou/image/upload/v1736358071/avatar-40-02_upqrxi.jpg',
    email: 'alex.t@company.com',
    location: 'San Francisco, US',
    status: 'Active',
    balance: '$1,250.00'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    username: '@sarahchen',
    image:
      'https://res.cloudinary.com/dlzlfasou/image/upload/v1736358073/avatar-40-01_ij9v7j.jpg',
    email: 'sarah.c@company.com',
    location: 'Singapore',
    status: 'Active',
    balance: '$600.00'
  },
  {
    id: '4',
    name: 'Maria Garcia',
    username: '@mariagarcia',
    image:
      'https://res.cloudinary.com/dlzlfasou/image/upload/v1736358072/avatar-40-03_dkeufx.jpg',
    email: 'm.garcia@company.com',
    location: 'Madrid, Spain',
    status: 'Active',
    balance: '$0.00'
  },
  {
    id: '5',
    name: 'David Kim',
    username: '@davidkim',
    image:
      'https://res.cloudinary.com/dlzlfasou/image/upload/v1736358070/avatar-40-05_cmz0mg.jpg',
    email: 'd.kim@company.com',
    location: 'Seoul, KR',
    status: 'Active',
    balance: '-$1,000.00'
  }
]

function Dashboard() {
  const { date, time } = useTimeCount()

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

          <ul>
            <li className='flex items-center gap-4'>
              <div className='flex items-center gap-3 flex-1'>
                <img src={logo} alt='Ảnh' className='w-10 h-10 rounded-lg' />
                <div className='flex flex-col'>
                  <span className='line-clamp-1'>Tên sản phẩm</span>
                  <span className='text-sm text-muted-foreground'>
                    Mã sản phẩm
                  </span>
                </div>
              </div>
              <div className='border rounded-lg py-1.5 px-2 text-sm font-semibold'>
                128 lượt bán
              </div>
            </li>
            <li className='flex items-center gap-4 mt-4'>
              <div className='flex items-center gap-3 flex-1'>
                <img src={logo} alt='Ảnh' className='w-10 h-10 rounded-lg' />
                <div className='flex flex-col'>
                  <span className='line-clamp-1'>Tên sản phẩm</span>
                  <span className='text-sm text-muted-foreground'>
                    Mã sản phẩm
                  </span>
                </div>
              </div>
              <div className='border rounded-lg py-1.5 px-2 text-sm font-semibold'>
                128 lượt bán
              </div>
            </li>
            <li className='flex items-center gap-4 mt-4'>
              <div className='flex items-center gap-3 flex-1'>
                <img src={logo} alt='Ảnh' className='w-10 h-10 rounded-lg' />
                <div className='flex flex-col'>
                  <span className='line-clamp-1'>Tên sản phẩm</span>
                  <span className='text-sm text-muted-foreground'>
                    Mã sản phẩm
                  </span>
                </div>
              </div>
              <div className='border rounded-lg py-1.5 px-2 text-sm font-semibold'>
                128 lượt bán
              </div>
            </li>
            <li className='flex items-center gap-4 mt-4'>
              <div className='flex items-center gap-3 flex-1'>
                <img src={logo} alt='Ảnh' className='w-10 h-10 rounded-lg' />
                <div className='flex flex-col'>
                  <span className='line-clamp-1'>Tên sản phẩm</span>
                  <span className='text-sm text-muted-foreground'>
                    Mã sản phẩm
                  </span>
                </div>
              </div>
              <div className='border rounded-lg py-1.5 px-2 text-sm font-semibold'>
                128 lượt bán
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className='grid grid-cols-10 gap-4'>
        <div className='col-span-7 bg-white rounded-lg p-4'>
          <div className='flex items-center justify-between'>
            <div className='font-semibold text-lg'>Đơn hàng mới nhất</div>
            <Button variant='outline' className=''>
              Tất cả
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow className='hover:bg-transparent'>
                <TableHead>Sản phẩm</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Mã đơn hàng</TableHead>
                <TableHead>Ngày đặt hàng</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <img
                        className='rounded-lg'
                        src={item.image}
                        width={40}
                        height={40}
                        alt={item.name}
                      />
                      <div>
                        <div className='font-medium'>{item.name}</div>
                        <span className='text-muted-foreground mt-0.5 text-xs'>
                          {item.username}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell className='text-right'>{item.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className='col-span-3 bg-white rounded-lg p-4'>
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
