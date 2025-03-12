import { useDispatch, useSelector } from 'react-redux'
import { logoutUserAPI, selectCurrentUser } from '~/redux/user/userSlice'
import UploadAvatar from '~/components/UploadAvatar'
import { IoIosLogOut } from 'react-icons/io'
import OrderTable from '~/pages/Buyer/User/UserOrder/OrderTable'
import { CheckCheck, Loader, Package, TrendingDown, TrendingUp, Truck } from 'lucide-react'
import UserHeader from '~/pages/Buyer/User/UserHeader'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '~/components/ui/alert-dialog'

function UserOrder() {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)

  const handleLogout = async () => {
    toast.promise(dispatch(logoutUserAPI()), {
      loading: 'Đang đăng xuất...'
    })
  }

  return (
    <div className='px-4'>
      <div className="flex items-center bg-white rounded-lg h-[100vh] overflow-auto relative">
        <div className="px-2 h-full w-[75%]">
          {/* Header */}
          <UserHeader />

          {/* Content */}
          <div className='mb-6'>
            <div className='text-3xl text-mainColor1-800 font-semibold uppercase'>Đơn hàng</div>
            <p className='text-gray-500 text-sm'>Hãy xem những hoạt động mua hàng của bạn trong tuần vừa qua!</p>
          </div>

          <OrderTable />
        </div>

        <div className="flex-1 px-6 flex items-center sticky top-0 right-0 min-h-[100vh] w-full">
          <div className='bg-gray-100/80 h-[95vh] rounded-3xl flex-1'>
            <div className="text-center relative py-32">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <IoIosLogOut className='absolute top-3 right-3 text-mainColor1-800 text-xl cursor-pointer'/>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Bạn có chắc chắn muốn đăng xuất?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Bạn sẽ cần phải đăng nhập lại trước khi truy cập vào hệ thống.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>Đăng xuất</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <UploadAvatar previewUrl={currentUser?.avatar} />
              <div className='text-xl mt-2 text-mainColor2-800 font-medium'>{currentUser.displayName}</div>
              <div className='text-xs text-mainColor2-800/90'>{currentUser.email}</div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="mx-6 py-2 bg-white rounded-lg">
                <div className='text-md text-mainColor1-600 px-4 py-1.5 rounded-lg font-medium flex items-center justify-between'>
                  <span>Tổng số đơn hàng</span>
                  <div className='bg-[#F7F7FE] p-2 rounded-full'><Package /></div>
                </div>
                <div className="flex items-end gap-10">
                  <span className='font-bold ml-4 my-1 text-2xl leading-none'>2380</span>
                  <div className="flex items-center gap-2 text-sm text-green-500">
                    <TrendingUp className='w-4 leading-none'/>
                    <span>6.53%</span>
                  </div>
                </div>
              </div>

              <div className="mx-6 py-2 bg-white rounded-lg">
                <div className='text-md text-mainColor2-800/90 px-4 py-1.5 rounded-lg font-medium flex items-center justify-between'>
                  <span>Đơn đang xử lý</span>
                  <div className='bg-[#F9F6FE] p-2 rounded-full'><Loader /></div>
                </div>
                <div className="flex items-end gap-10">
                  <span className='font-bold ml-4 my-1 text-2xl leading-none'>32</span>
                  <div className="flex items-center gap-2 text-sm text-red-500">
                    <TrendingDown className='w-4 leading-none'/>
                    <span>6.53%</span>
                  </div>
                </div>
              </div>

              <div className="mx-6 py-2 bg-white rounded-lg">
                <div className='text-md text-red-500 px-4 py-1.5 rounded-lg font-medium flex items-center justify-between'>
                  <span>Đơn đang vận chuyển</span>
                  <div className='bg-[#FEF6F5] p-2 rounded-full'><Truck /></div>
                </div>
                <div className="flex items-end gap-10">
                  <span className='font-bold ml-4 my-1 text-2xl leading-none'>127</span>
                  <div className="flex items-center gap-2 text-sm text-green-500">
                    <TrendingUp className='w-4 leading-none'/>
                    <span>6.53%</span>
                  </div>
                </div>
              </div>

              <div className="mx-6 py-2 bg-white rounded-lg">
                <div className='text-md text-green-500 px-4 py-1.5 rounded-lg font-medium flex items-center justify-between'>
                  <span>Đơn đã giao</span>
                  <div className='bg-[#F3FEF8] p-2 rounded-full'><CheckCheck /></div>
                </div>
                <div className="flex items-end gap-10">
                  <span className='font-bold ml-4 my-1 text-2xl leading-none'>29</span>
                  <div className="flex items-center gap-2 text-sm text-red-500">
                    <TrendingDown className='w-4 leading-none'/>
                    <span>6.53%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserOrder
