import { Avatar, AvatarImage } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'

function CategoryBar({ categories = [], onClickCategory }) {
  return (
    <div className='h-fit max-h-[100vh] sticky top-5 left-0 overflow-y-scroll scroll-smooth scroll-pr-3'>
      <div className='font-semibold text-mainColor1-600 text-xl'>Danh mục:</div>
      <div className='mt-2 flex flex-col gap-2 items-start'>
        {categories?.map((item) => (
          <Badge
            key={item._id}
            className='border bg-white text-mainColor1-800 font-medium border-mainColor1-800 py-0.5 hover:bg-mainColor1-100 hover:text-white transition-all hover:ease-in-out hover:duration-300 cursor-pointer'
            onClick={() => { onClickCategory(item._id) }}
          >
            <Avatar className='flex items-center justify-center h-7 w-7'>
              <AvatarImage src={item.iconUrl} className='h-full w-full'/>
            </Avatar>
            <p className='text-ellipsis'>{item.name}</p>
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default CategoryBar