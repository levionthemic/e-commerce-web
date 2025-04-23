import { FaBars } from 'react-icons/fa6'
import { FaFacebookF } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaTiktok } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { Button } from '~/components/ui/button'

function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className='w-[100vw] h-[100vh] bg-[url("~/assets/bg-landing-page.jpg")] bg-contain bg-no-repeat bg-right-bottom flex flex-col justify-between px-10 py-8 animate-fadeIn'>
      <div className="flex justify-between items-center animate-fadeInTop">
        <div className='text-4xl font-medium text-mainColor1-600'>LEVI</div>
        <div className='flex items-center justify-center gap-12 text-mainColor1-600 font-normal'>
          <div className='levi-menu-item'>Trang chủ</div>
          <div className='levi-menu-item'>Về chúng tôi</div>
          <div className='levi-menu-item'>Sản phẩm</div>
          <div className='levi-menu-item'>Liên hệ</div>
          <FaBars className='cursor-pointer text-3xl' />
        </div>
      </div>

      <div className="w-[60%]">
        <div className="mb-8">
          <div className='text-mainColor1-600 text-8xl font-semibold tracking-wide mb-2 animate-fadeIn'>E-Commerce</div>
          <div className='text-mainColor1-400 font-medium text-3xl mb-16 animate-fadeIn'>Hàng ngàn sản phẩm, giá cực tốt!</div>
          <div className='text-mainColor1-400 text-justify w-[60%] mb-10 animate-fadeIn'>Trải nghiệm mua sắm trực tuyến tiện lợi với giá tốt nhất. Chúng tôi cung cấp đa dạng sản phẩm, giao hàng nhanh chóng và hỗ trợ khách hàng tận tâm. Bắt đầu mua sắm ngay hôm nay!</div>
          <button className='bg-gradient-to-l from-mainColor2-800 to-mainColor2-100 text-white text-lg font-semibold uppercase px-8 py-3 rounded-full animate-fadeInTop hover:scale-90 hover:duration-300 hover:ease-in-out transition-all' onClick={() => navigate('/buyer')}>Mua sắm ngay!</button>
          <div className='mt-10 flex items-center gap-6'>
            <Button className='font-semibold rounded-full animate-fadeInTop' onClick={() => navigate('/login', { state: { role: 'seller' } })}>Đăng nhập quyền Người bán</Button>
            <Button variant='outline' className=' font-semibold rounded-full animate-fadeInTop' onClick={() => navigate('/admin/login')}>Đăng nhập quyền Quản trị viên</Button>
          </div>

        </div>
      </div>

      <div className='text-mainColor1-400 flex items-center gap-12 text-xl'>
        <FaFacebookF />
        <FaInstagram />
        <FaTiktok />
      </div>
    </div>
  )
}

export default LandingPage