import { CollapsibleTrigger } from '@radix-ui/react-collapsible'
import { ChevronDown } from 'lucide-react'
import { Collapsible, CollapsibleContent } from '~/components/ui/collapsible'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem } from '~/components/ui/sidebar'

function CategoryBar({ categories = [], onClickCategory }) {
  return (
    <div className='flex-1 h-96 max-h-96 sticky top-5 left-0 overflow-y-scroll scroll-smooth scroll-pr-1'>
      <div className='font-semibold text-mainColor1-600 text-xl'>Danh mục:</div>
      <SidebarMenu className='mt-2 flex flex-col gap-2 items-start'>
        {categories?.map((item) => (
          <Collapsible key={item._id} className="group/collapsible w-full">
            <SidebarMenuItem>
              <CollapsibleTrigger className='w-full'>
                <SidebarMenuButton className='flex items-center justify-between w-full'>
                  {item.name}
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>SubMenuItem</SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </div>
  )
}

export default CategoryBar