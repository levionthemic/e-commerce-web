import coverImg from '~/assets/banner.jpg'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import GeneralTab from './GeneralTab'
import ContactTab from './ContactTab'


function Profile() {
  return (
    <div className=''>
      <div className="h-32 xl:h-52 w-full relative">
        <img src={coverImg} alt="" className='h-full w-full object-cover'/>

        <Avatar className='w-24 h-24 xl:w-32 xl:h-32 absolute -bottom-[50%] left-16 border-[5px] border-[#F3F3F3]'>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="absolute -bottom-[40%] xl:-bottom-[34%] left-44 xl:left-52">
          <div className="text-xl xl:text-2xl font-semibold mb-1">Tên cửa hàng</div>
          <div className='line-clamp-1 text-muted-foreground text-xs xl:text-sm'>Mô tả ngắn của cửa hàng</div>
        </div>
      </div>


      {/* Content */}
      <div className="p-4 mt-14 xl:mt-24 h-full">
        <Tabs defaultValue="1" className="w-full">
          <TabsList className='w-full grid grid-cols-4'>
            <TabsTrigger value="1">Tổng quan</TabsTrigger>
            <TabsTrigger value="2">Liên hệ</TabsTrigger>
            <TabsTrigger value="3">Chính sách</TabsTrigger>
            <TabsTrigger value="4">Đánh giá</TabsTrigger>
          </TabsList>

          <TabsContent value="1">
            <GeneralTab />
          </TabsContent>

          <TabsContent value="2">
            <ContactTab />
          </TabsContent>

          <TabsContent value="3">Change your password here.</TabsContent>

          <TabsContent value="4">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Profile