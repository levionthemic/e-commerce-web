import { Link, useNavigate } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '~/components/ui/sidebar'
import { FaArrowRight } from 'react-icons/fa'
import { CiUser } from 'react-icons/ci'
import { LuTruck } from 'react-icons/lu'
import { IoMdHeartEmpty } from 'react-icons/io'
import { IoSettingsOutline } from 'react-icons/io5'

function UserSidebar() {
  const navigate = useNavigate()

  const items = [
    {
      title: 'Hồ sơ',
      url: '/user/profile',
      icon: <CiUser />
    },
    {
      title: 'Đơn hàng',
      url: '/user/order',
      icon: <LuTruck />
    },
    {
      title: 'Yêu thích',
      url: '#',
      icon: <IoMdHeartEmpty />
    },
    {
      title: 'Cài đặt',
      url: '#',
      icon: <IoSettingsOutline />
    }
  ]
  return (
    <Sidebar className='px-4 bg-white border-none pb-4'>
      <SidebarHeader className='p-0'>
        <span
          className='text-4xl font-medium text-mainColor1-600 cursor-pointer hover:scale-105 transition-transform hover:duration-500 my-10'
          onClick={() => navigate('/')}
        >
          LEVI
        </span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className='p-0'>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className='h-fit py-2 text-md mb-4 cursor-pointer text-white bg-mainColor1-800 hover:bg-mainColor1-800/90 hover:text-white rounded-lg' asChild>
                    <Link to={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='p-0'>
        <div className='bg-mainColor1-100/30 rounded-xl p-4'>
          <div className='text-mainColor1-800 font-medium text-lg mb-4'>Có Sản phẩm trong giỏ hàng của bạn</div>
          <div className='flex items-center justify-end gap-4'>
            <p className='text-sm'>Kiểm tra ngay</p>
            <div className='rounded-full bg-white p-2'>
              <FaArrowRight className='text-mainColor1-600 cursor-pointer' onClick={() => navigate('/buyer/cart')}/>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default UserSidebar