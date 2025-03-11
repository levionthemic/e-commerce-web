import { CiSearch } from 'react-icons/ci'
import { CiBellOn } from 'react-icons/ci'
import { BsHandbag } from 'react-icons/bs'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { House } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '~/components/ui/badge'
import { selectCurrentCart } from '~/redux/cart/cartSlice'

function UserHeader() {
  const currentUser = useSelector(selectCurrentUser)
  const currentCart = useSelector(selectCurrentCart)

  return (
    <div className='flex items-center justify-between my-10'>
      <Link to='/buyer'>
        <House className='text-mainColor1-800 cursor-pointer' />
      </Link>
      <CiSearch className='text-mainColor1-800 font-bold text-2xl cursor-pointer' />
      <div className='flex items-center justify-between gap-8'>
        <CiBellOn className='text-mainColor1-800 font-bold text-2xl cursor-pointer'/>
        <div className='relative cursor-pointer hover:scale-105 hover:ease-out hover:duration-300 transition-transform'>
          <BsHandbag className='text-mainColor1-600 text-xl' />
          <Badge className="w-2 h-2 rounded-full p-2 text-center absolute -top-3 -right-3 bg-mainColor1-400">
            {currentCart?.products?.length || 0}
          </Badge>
        </div>
        <div className='flex items-center justify-between gap-2'>
          <Avatar className='w-8 h-8'>
            <AvatarImage src={currentUser?.avatar} />
            <AvatarFallback>LV</AvatarFallback>
          </Avatar>
          <div className='text-sm text-mainColor1-800'>Xin chào, <b>{currentUser?.displayName}</b>!</div>
        </div>
      </div>
    </div>
  )
}

export default UserHeader