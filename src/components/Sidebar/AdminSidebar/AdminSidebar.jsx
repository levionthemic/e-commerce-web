import { useNavigate } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupLabel
} from '~/components/ui/sidebar'
import { ChevronDown } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible'
import { RxDashboard } from 'react-icons/rx'
import { MdStorefront } from 'react-icons/md'
import { LuBox } from 'react-icons/lu'
import { BiCategoryAlt } from 'react-icons/bi'
import { LuUsersRound } from 'react-icons/lu'
import { RiBillLine } from 'react-icons/ri'
import { PiStack } from 'react-icons/pi'
import { TbTruckDelivery } from 'react-icons/tb'
import { TbReportAnalytics } from 'react-icons/tb'
import { LuSettings } from 'react-icons/lu'
import { IoMdHelpCircleOutline } from 'react-icons/io'
import { LuLogOut } from 'react-icons/lu'

function AdminSidebar() {
  const navigate = useNavigate()

  return (
    <Sidebar className='px-4 bg-[#15161B] border-none pb-4'>
      <SidebarHeader className='p-0'>
        <span
          className='text-4xl font-medium text-white text-center cursor-pointer hover:scale-105 transition-transform hover:duration-500 my-10'
          onClick={() => navigate('/')}
        >
          LEVI
        </span>
      </SidebarHeader>

      <SidebarContent>

        <Collapsible defaultOpen className="group/collapsible mb-5">
          <SidebarGroup className='p-0'>
            <SidebarGroupLabel asChild className='text-gray-300 mb-2'>
              <CollapsibleTrigger>
                GENERAL
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>

                  <SidebarMenuItem className='hover:bg-opacity-20'>
                    <SidebarMenuButton className='text-white hover:bg-white/15 hover:text-white hover:rounded-lg' asChild>
                      <a href='#'>
                        <RxDashboard />
                        <span>Dashboard</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton className='text-white hover:bg-white/15 hover:text-white hover:rounded-lg' asChild>
                      <a href='#'>
                        <MdStorefront />
                        <span>Stores</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>

          </SidebarGroup>
        </Collapsible>

        <Collapsible defaultOpen className="group/collapsible mb-5">
          <SidebarGroup className='p-0'>
            <SidebarGroupLabel asChild className='text-gray-300 mb-2'>
              <CollapsibleTrigger>
                INVENTORY
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>

                  <SidebarMenuItem>
                    <SidebarMenuButton className='text-white hover:bg-white/15 hover:text-white hover:rounded-lg' asChild>
                      <a href='#'>
                        <LuBox />
                        <span>Products</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton className='text-white hover:bg-white/15 hover:text-white hover:rounded-lg' asChild>
                      <a href='#'>
                        <BiCategoryAlt />
                        <span>Category</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton className='text-white hover:bg-white/15 hover:text-white hover:rounded-lg' asChild>
                      <a href='#'>
                        <LuUsersRound />
                        <span>Suppliers</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton className='text-white hover:bg-white/15 hover:text-white hover:rounded-lg' asChild>
                      <a href='#'>
                        <RiBillLine />
                        <span>Billing</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton className='text-white hover:bg-white/15 hover:text-white hover:rounded-lg' asChild>
                      <a href='#'>
                        <PiStack />
                        <span>Orders</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton className='text-white hover:bg-white/15 hover:text-white hover:rounded-lg' asChild>
                      <a href='#'>
                        <TbTruckDelivery />
                        <span>Delivery</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton className='text-white hover:bg-white/15 hover:text-white hover:rounded-lg' asChild>
                      <a href='#'>
                        <TbReportAnalytics />
                        <span>Report</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>

          </SidebarGroup>
        </Collapsible>

        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup className='p-0'>
            <SidebarGroupLabel asChild className='text-gray-300 mb-2'>
              <CollapsibleTrigger>
                GENERAL
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>

                  <SidebarMenuItem>
                    <SidebarMenuButton className='text-white hover:bg-white/15 hover:text-white hover:rounded-lg' asChild>
                      <a href='#'>
                        <LuSettings />
                        <span>Settings</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton className='text-white hover:bg-white/15 hover:text-white hover:rounded-lg' asChild>
                      <a href='#'>
                        <IoMdHelpCircleOutline />
                        <span>Help</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton className='text-white hover:bg-white/15 hover:text-white hover:rounded-lg' asChild>
                      <a href='#'>
                        <LuLogOut />
                        <span>Logout</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>

          </SidebarGroup>
        </Collapsible>

      </SidebarContent>
    </Sidebar>
  )
}

export default AdminSidebar