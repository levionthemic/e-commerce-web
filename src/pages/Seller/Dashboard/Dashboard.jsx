import { Coins, Layers, Package2, Percent, TrendingDown, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'

function Dashboard () {
  const date = new Date(Date.now())
  const formatter = new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  const [time, setTime] = useState()
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const timeString = now.toLocaleTimeString('vi-VN')
      setTime(timeString)
    }, 1000)
    return () => clearInterval(timer)
  })

  return (
    <div className="py-4 px-6">
      <div className="flex items-end justify-between mb-4">
        <div className="">
          <div className="font-bold text-xl">Dashboard</div>
          <p className="text-sm text-gray-500">Tổng quan về cửa hàng của bạn trong tuần này</p>
        </div>
        <span className="italic text-sm text-gray-500 text-right">{time}<br />{formatter.format(date)}</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="col-span-1 bg-white rounded-lg px-4 py-2">
          <div className="flex items-center gap-3 mb-3 text-gray-500">
            <Coins />
            <span className="font-medium text-sm">Tổng Doanh thu</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold flex flex-col gap-1/2">
              <span>2.158.000</span>
              <span className="text-xs text-gray-600">VNĐ</span>
            </span>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 text-sm text-green-600">
                <TrendingUp />
                <span>+6.00%</span>
              </div>
              <span className="text-xs text-gray-400">so với tuần trước</span>
            </div>
          </div>

          <div>

          </div>
        </div>

        <div className="col-span-1 bg-white rounded-lg px-4 py-2">
          <div className="flex items-center gap-3 mb-3 text-gray-500">
            <Package2 />
            <span className="font-medium text-sm">Tổng Sản phẩm</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold flex flex-col gap-1/2">
              <span>488</span>
              <span className="text-xs text-gray-600">sản phẩm</span>
            </span>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 text-sm text-red-600">
                <TrendingDown />
                <span>+6.00%</span>
              </div>
              <span className="text-xs text-gray-400">so với tuần trước</span>
            </div>
          </div>

          <div>

          </div>
        </div>

        <div className="col-span-1 bg-white rounded-lg px-4 py-2">
          <div className="flex items-center gap-3 mb-3 text-gray-500">
            <Layers />
            <span className="font-medium text-sm">Tổng Đơn hàng</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold flex flex-col gap-1/2">
              <span>123</span>
              <span className="text-xs text-gray-600">đơn hàng</span>
            </span>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 text-sm text-red-600">
                <TrendingDown />
                <span>+6.00%</span>
              </div>
              <span className="text-xs text-gray-400">so với tuần trước</span>
            </div>
          </div>

          <div>

          </div>
        </div>

        <div className="col-span-1 bg-white rounded-lg px-4 py-2">
          <div className="flex items-center gap-3 mb-3 text-gray-500">
            <Percent />
            <span className="font-medium text-sm">Tỉ lệ chuyển đổi</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold flex flex-col gap-1/2">
              <span>5.03</span>
              <span className="text-xs text-gray-600">%</span>
            </span>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 text-sm text-red-600">
                <TrendingDown />
                <span>+6.00%</span>
              </div>
              <span className="text-xs text-gray-400">so với tuần trước</span>
            </div>
          </div>

          <div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
