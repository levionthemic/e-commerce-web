import { Link, useNavigate } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubItem
} from '~/components/ui/sidebar'
import { Box, ChevronDown, House, NotepadText, Store } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible'
import { LuSettings } from 'react-icons/lu'
import { IoMdHelpCircleOutline } from 'react-icons/io'
import { LuLogOut } from 'react-icons/lu'
import { Separator } from '~/components/ui/separator'

function SellerSidebar() {
  const navigate = useNavigate()

  return (
    <Sidebar className='px-4 bg-mainColor1-800 border-none pb-4 rounded-tr-2xl rounded-br-2xl'>
      <SidebarHeader className='p-0'>
        <span
          className='text-4xl font-medium text-white text-center cursor-pointer hover:scale-105 transition-transform hover:duration-500 my-10'
          onClick={() => navigate('/')}
        >
          LEVI
        </span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>

          <SidebarMenuItem>
            <SidebarMenuButton className='text-white hover:bg-white/15 hover:text-white hover:rounded-lg' asChild>
              <Link to='/seller'>
                <House />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton className='text-white hover:bg-white/15 hover:text-white hover:rounded-lg' asChild>
              <Link to='/seller/store'>
                <Store />
                <span>Cửa hàng</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className='text-white group-data-[state=open]/collapsible:hover:bg-white/15 hover:bg-white/15 group-data-[state=open]/collapsible:hover:text-white hover:text-white'>
                  <Box />
                  <span>Sản phẩm</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton asChild className='text-white hover:bg-white/15 hover:text-white hover:rounded-lg'>
                      <Link to='/seller/products'>Quản lí sản phẩm</Link>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className='text-white group-data-[state=open]/collapsible:hover:bg-white/15 hover:bg-white/15 group-data-[state=open]/collapsible:hover:text-white hover:text-white'>
                  <NotepadText />
                  <span>Đơn hàng</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton asChild className='text-white hover:bg-white/15 hover:text-white hover:rounded-lg'>
                      <Link to='/seller/orders'>Quản lí đơn hàng</Link>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

        </SidebarMenu>

        <Separator className='my-6' />

        <SidebarGroup className='p-0'>
          <SidebarGroupLabel className='text-gray-300 mb-1'>CHUNG</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className='text-white hover:bg-white/15 hover:text-white hover:rounded-lg' asChild>
                  <a href='/seller/settings'>
                    <LuSettings />
                    <span>Cài đặt</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton className='text-white hover:bg-white/15 hover:text-white hover:rounded-lg' asChild>
                  <a href='/seller/help'>
                    <IoMdHelpCircleOutline />
                    <span>Trợ giúp</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton className='text-white hover:bg-white/15 hover:text-white hover:rounded-lg' asChild>
                  <a href='#'>
                    <LuLogOut />
                    <span>Đăng xuất</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default SellerSidebar