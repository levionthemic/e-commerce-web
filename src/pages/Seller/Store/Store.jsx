import coverImg from '~/assets/banner.jpg'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

function Store() {
  return (
    <div className='h-52 w-full relative'>
      <img src={coverImg} alt="" className='h-52 w-full object-cover'/>

      <Avatar className='w-32 h-32 absolute -bottom-[50%] left-16 border-[5px] border-[#F3F3F3]'>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="absolute -bottom-[34%] left-52">
        <div className="text-2xl font-semibold mb-1">Tên cửa hàng</div>
        <div className='line-clamp-1 text-muted-foreground text-sm'>Mô tả ngắn của cửa hàng</div>
      </div>
    </div>
  )
}

export default Store