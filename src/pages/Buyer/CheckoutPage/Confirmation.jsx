import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import shippingMethodLogo from '~/assets/ghtk-logo.png'
import { Separator } from '~/components/ui/separator'


function Confirmation() {
  const currentUser = useSelector(selectCurrentUser)
  return (
    <div className="my-6 border border-b-[#ddd] rounded-md p-4 w-[95%]">
      <div className="text-mainColor1-600 font-medium text-lg mb-1">Xác nhận thông tin</div>
      <p className='text-[0.8rem] text-muted-foreground'>Kiểm tra kỹ trước khi đặt hàng!</p>
      <p className='mb-6 text-[0.8rem] text-muted-foreground'>Nếu thông tin đơn hàng đã trùng khớp, hãy bấm &quot;Đặt hàng&quot;!</p>

      <div className='flex items-center justify-between mx-20 mb-2'>
        <span className='text-sm text-gray-400'>Tên người nhận hàng:</span>
        <span className='font-semibold text-mainColor1-600'>{currentUser?.fullName || 'Hồ Trần Ngọc Liêm'}</span>
      </div>

      <div className='flex items-center justify-between mx-20 mb-2'>
        <span className='text-sm text-gray-400'>Địa chỉ nhận hàng:</span>
        <span className='font-semibold text-mainColor1-600'>{currentUser?.address || '123 đường ABC, phường X, quận Y, TPHCM'}</span>
      </div>

      <div className='flex items-center justify-between mx-20 mb-4'>
        <span className='text-sm text-gray-400'>Số điện thoại liên hệ:</span>
        <span className='font-semibold text-mainColor1-600'>{currentUser?.phoneNumber || '0862484683'}</span>
      </div>

      <Separator />

      <div className='flex items-center justify-between mx-20 mb-2 mt-4'>
        <span className='text-sm text-gray-400'>Dịch vụ vận chuyển:</span>
        <div className='font-semibold text-mainColor1-600 flex items-center gap-4'>
          <img src={shippingMethodLogo} alt="" width={20} height={20}/>
          Giao hàng tiết kiệm
        </div>
      </div>

      <div className='flex items-center justify-between mx-20 mb-2'>
        <span className='text-sm text-gray-400'>Phương thức thanh toán:</span>
        <span className='font-semibold text-mainColor1-600'>Thanh toán bằng tiền mặt</span>
      </div>

    </div>
  )
}

export default Confirmation