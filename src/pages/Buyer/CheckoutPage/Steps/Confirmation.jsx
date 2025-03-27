import ghnLogo from '~/assets/ghn-logo.png'
import ghtkLogo from '~/assets/ghtk-logo.png'
import { Separator } from '~/components/ui/separator'
import { Button } from '~/components/ui/button'

function Confirmation({ checkoutInfo, setStep }) {
  return (
    <div className="my-6 border border-b-[#ddd] rounded-md p-4 w-[95%]">
      <div className="text-mainColor1-600 font-medium text-lg mb-1">Xác nhận thông tin</div>
      <p className='text-[0.8rem] text-muted-foreground'>Kiểm tra kỹ trước khi đặt hàng!</p>
      <p className='mb-6 text-[0.8rem] text-muted-foreground'>Nếu thông tin đơn hàng đã trùng khớp, hãy bấm &quot;Đặt hàng&quot;!</p>

      <div className='flex items-center justify-between mx-20 mb-2'>
        <span className='text-sm text-gray-400'>Tên người nhận hàng:</span>
        <span className='font-semibold'>{checkoutInfo?.name}</span>
      </div>

      <div className='flex items-center justify-between mx-20 mb-2'>
        <span className='text-sm text-gray-400'>Địa chỉ nhận hàng:</span>
        <span className='font-semibold'>{checkoutInfo?.shortAddress}</span>
      </div>

      <div className='flex items-center justify-between mx-20 mb-4'>
        <span className='text-sm text-gray-400'>Số điện thoại liên hệ:</span>
        <span className='font-semibold'>{checkoutInfo?.phone}</span>
      </div>

      <Separator />

      <div className='flex items-center justify-between mx-20 mb-2 mt-4'>
        <span className='text-sm text-gray-400'>Dịch vụ vận chuyển:</span>
        <div className='font-semibold text-mainColor1-600 flex items-center gap-4'>
          <img src={checkoutInfo?.shipping.type === 'ghn' ? ghnLogo : ghtkLogo} alt="" width={20} height={20}/>
          {checkoutInfo?.shipping.type === 'ghn' && 'Giao hàng nhanh'}
          {checkoutInfo?.shipping.type === 'ghtk' && 'Giao hàng tiết kiệm'}
        </div>
      </div>

      <div className='flex items-center justify-between mx-20 mb-8'>
        <span className='text-sm text-gray-400'>Phương thức thanh toán:</span>
        <span className='font-semibold text-mainColor1-600'>Thanh toán bằng tiền mặt</span>
      </div>

      <div className='grid grid-cols-1 gap-5'>
        <Button type='submit' className='border bg-white text-mainColor1-600  border-mainColor1-600 hover:bg-white text-md font-semibold rounded-lg hover:drop-shadow-xl' onClick={() => setStep(3)}>Quay lại</Button>
      </div>
    </div>
  )
}

export default Confirmation