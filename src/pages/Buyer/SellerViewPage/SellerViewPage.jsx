import {
  Archive,
  Clock,
  MessageCircleMore,
  MessageSquareText,
  Plus,
  Star,
  UserRoundCheck,
  UsersRound
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import AllProductsTab from './Tabs/AllProductsTab'

function SellerViewPage() {
  return (
    <div className="bg-[#000]">
      <div className="bg-white">
        <div className="container mx-auto">
          <div className="flex justify-between items-center py-10">
            <div className="relative">
              <div className="w-[400px] h-[200px] border bg-[url('./assets/banner.jpg')] bg-center bg-no-repeat bg-cover">
                <div className="w-full h-full bg-black bg-opacity-65 flex items-center justify-evenly">
                  <div className="relative">
                    <div className="text-center w-28 h-28 relative text-white bg-black flex items-center justify-center rounded-full border-[7px] border-gray-400 ">
                      L&apos;OREAL
                      <br />
                      Paris
                    </div>
                    <div className="bg-red-600 text-white w-fit px-6 rounded-full relative -top-4">
                      Shop mall
                    </div>
                  </div>
                  <div className="text-white">
                    <p className="text-lg">L&apos;OREAL OFFICIAL</p>
                    <p>Online 2 phút trước</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-evenly w-[400px] relative -top-5">
                <div className="flex items-center justify-center gap-2 bg-purple-400 text-white w-36 rounded-full py-1">
                  <Plus />
                  Theo dõi
                </div>
                <div className="flex items-center justify-center gap-2 bg-purple-400 text-white w-36 rounded-full py-1">
                  <MessageCircleMore />
                  Chat
                </div>
              </div>
            </div>
            <div className="flex gap-20 lg:gap-80">
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <Archive />
                  <span className='whitespace-nowrap'>
                    Sản phẩm: <span className="text-red-600">329</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <UserRoundCheck />
                  <span className='whitespace-nowrap'>
                    Đang theo dõi: <span className="text-red-600">23</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquareText />
                  <span className='whitespace-nowrap'>
                    Tỉ lệ phản hồi: <span className="text-red-600">100%</span>
                  </span>
                </div>
              </div>
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <UsersRound />
                  <span className='whitespace-nowrap'>
                    Người theo dõi:{' '}
                    <span className="text-red-600">23.000.000</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Star />
                  <span className='whitespace-nowrap'>
                    Đánh giá:{' '}
                    <span className="text-red-600">4.9 (2.2tr đánh giá)</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock />
                  <span className='whitespace-nowrap'>
                    Tham gia: <span className="text-red-600">7 năm trước</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Tabs defaultValue="all_products" className="w-full bg-white">
          <div className="container mx-auto">
            <TabsList className="grid w-full grid-cols-4 bg-white text-black rounded-none h-fit p-0">
              <TabsTrigger
                value="all_products"
                className="data-[state=active]:text-red-700 data-[state=active]:border-b data-[state=active]:border-b-red-700 data-[state=active]:shadow-none data-[state=active]:rounded-none py-4"
              >
                Tất cả sản phẩm
              </TabsTrigger>
              <TabsTrigger
                value="makeup_remove"
                className="data-[state=active]:text-red-700 data-[state=active]:border-b data-[state=active]:border-b-red-700 data-[state=active]:shadow-none data-[state=active]:rounded-none py-4"
              >
                Nước tẩy trang
              </TabsTrigger>
              <TabsTrigger
                value="makeup_remove_cotton"
                className="data-[state=active]:text-red-700 data-[state=active]:border-b data-[state=active]:border-b-red-700 data-[state=active]:shadow-none data-[state=active]:rounded-none py-4"
              >
                Bông tẩy trang
              </TabsTrigger>
              <TabsTrigger
                value="cleanser"
                className="data-[state=active]:text-red-700 data-[state=active]:border-b data-[state=active]:border-b-red-700 data-[state=active]:shadow-none data-[state=active]:rounded-none py-4"
              >
                Sữa rửa mặt
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all_products" className="mt-0"><AllProductsTab /></TabsContent>
          <TabsContent value="makeup_remove" className="mt-0"></TabsContent>
          <TabsContent value="makeup_remove_cotton" className="mt-0"></TabsContent>
          <TabsContent value="cleanser" className="mt-0"></TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default SellerViewPage
