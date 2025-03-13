import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '~/components/ui/breadcrumb'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import GeneralTab from './GeneralTab'

function Inventory() {
  const date = new Date(Date.now())
  const formatter = new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
  const [time, setTime] = useState(new Date().toLocaleTimeString('vi-VN'))
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const timeString = now.toLocaleTimeString('vi-VN')
      setTime(timeString)
    }, 1000)
    return () => clearInterval(timer)
  })

  return (
    <div className='px-6 py-4'>
      <Tabs defaultValue="1">
        <div className="flex items-center justify-between mb-4 gap-8">
          <div className="">
            <div className="font-bold text-xl mb-2">Quản lý kho hàng</div>
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
                    <Link to='/seller/store/profile'>Đơn hàng</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Quản lý kho hàng</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <TabsList className='flex-1 w-full grid grid-cols-6'>
            <TabsTrigger value="1">Tổng quan</TabsTrigger>
            <TabsTrigger value="2">Nhập kho</TabsTrigger>
            <TabsTrigger value="3">Xuất kho</TabsTrigger>
            <TabsTrigger value="4">Kiểm kê</TabsTrigger>
            <TabsTrigger value="5">Cảnh báo</TabsTrigger>
            <TabsTrigger value="6">Báo cáo</TabsTrigger>
          </TabsList>

          <span className="italic text-sm text-gray-500 text-right">{time}<br />{formatter.format(date)}</span>
        </div>

        <div>
          <TabsContent value="1">
            <GeneralTab />
          </TabsContent>
          <TabsContent value="2">Nhập kho</TabsContent>
          <TabsContent value="3">Xuất kho</TabsContent>
          <TabsContent value="4">Kiểm kê</TabsContent>
          <TabsContent value="5">Cảnh báo</TabsContent>
          <TabsContent value="6">Báo cáo</TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

export default Inventory