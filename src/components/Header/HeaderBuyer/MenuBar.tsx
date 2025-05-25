import { IoMenu } from 'react-icons/io5'
import { FaPhoneAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function MenuBar() {
  return (
    <div
      className='rounded-full bg-mainColor1-400'
      style={{
        boxShadow:
          'rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px'
      }}
    >
      <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
          <IoMenu className='text-2xl text-white transition-transform cursor-pointer hover:scale-110 hover:ease-in-out hover:duration-300' />
          <ul className='flex items-center gap-8 text-sm text-white'>
            <li className='px-4 py-2 transition-all cursor-pointer hover:text-mainColor1-400 hover:bg-white hover:ease-in-out hover:duration-300'>
              <Link to={'/buyer'}>Trang chủ</Link>
            </li>
            <li className='px-4 py-2 transition-all cursor-pointer hover:text-mainColor1-400 hover:bg-white hover:ease-in-out hover:duration-300'>
              Sản phẩm
            </li>
            <li className='px-4 py-2 transition-all cursor-pointer hover:text-mainColor1-400 hover:bg-white hover:ease-in-out hover:duration-300'>
              Giới thiệu
            </li>
            <li className='px-4 py-2 transition-all cursor-pointer hover:text-mainColor1-400 hover:bg-white hover:ease-in-out hover:duration-300'>
              Liên hệ
            </li>
          </ul>
          <div className='flex items-center gap-3 text-sm text-white'>
            <FaPhoneAlt className='animate-phoneShake' /> 0798 576 809
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuBar
