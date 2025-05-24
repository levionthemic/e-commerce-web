import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin
} from 'react-icons/fa'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Separator } from '~/components/ui/separator'

const Footer = () => {
  return (
    <footer className='bg-mainColor1-600/95 text-white pt-12 pb-6'>
      <footer className='container mx-auto'>
        <div className='grid grid-cols-5'>
          {/* Customer Support */}
          <div className=''>
            <h3 className='text-lg font-medium mb-2'>Chăm sóc khách hàng</h3>
            <ul className='text-sm flex flex-col gap-1'>
              <li>Trung tâm trợ giúp</li>
              <li>Blog</li>
              <li>Mall</li>
              <li>Hướng dẫn mua hàng</li>
              <li>Trả hàng & hoàn tiền</li>
            </ul>
          </div>

          {/* About Us */}
          <div className=''>
            <h3 className='text-lg font-medium mb-2'>Về chúng tôi</h3>
            <ul className='text-sm flex flex-col gap-1'>
              <li>
                <a href='/about'>Giới thiệu về công ty</a>
              </li>
              <li>
                <a href='/careers'>Tuyển dụng</a>
              </li>
              <li>
                <a href='/terms'>Điều khoản sử dụng</a>
              </li>
              <li>
                <a href='/privacy'>Chính sách bảo mật</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className=''>
            <h3 className='text-lg font-medium mb-2'>Liên hệ</h3>
            <div className='text-sm flex flex-col gap-1'>
              <p>Địa chỉ: Số 123, Đường ABC, Thành phố XYZ</p>
              <p>Điện thoại: 0123 456 789</p>
              <p>Email: support@example.com</p>
            </div>
          </div>

          {/* Follow Us */}
          <div className=''>
            <h3 className='text-lg font-medium mb-2'>Theo dõi chúng tôi</h3>
            <div className='text-sm flex flex-col gap-1'>
              <div className='flex items-center gap-2'>
                <FaFacebook /> <span>Facebook</span>
              </div>
              <div className='flex items-center gap-2'>
                <FaInstagram /> <span>Instagram</span>
              </div>
              <div className='flex items-center gap-2'>
                <FaTwitter /> <span>Twitter</span>
              </div>
              <div className='flex items-center gap-2'>
                <FaYoutube /> <span>YouTube</span>
              </div>
              <div className='flex items-center gap-2'>
                <FaLinkedin /> <span>LinkedIn</span>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className=''>
            <h3 className='text-lg font-medium mb-2'>Đăng ký nhận tin</h3>
            <form className='flex gap-1 items-center'>
              <Input
                type='email'
                className='text-white placeholder:text-white/50'
                placeholder='Nhập email của bạn'
                required
              />
              <Button
                type='submit'
                className='bg-mainColor2-800 hover:bg-mainColor2-800/80'
              >
                Đăng ký
              </Button>
            </form>
          </div>
        </div>

        <Separator className='my-6' />

        {/* Bottom Footer */}
        <div className='text-center text-sm'>
          <p>© 2024 Công ty TNHH LEVI. Tất cả các quyền được bảo lưu.</p>
        </div>
      </footer>
    </footer>
  )
}

export default Footer
