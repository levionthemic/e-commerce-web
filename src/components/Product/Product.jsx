import { useNavigate } from 'react-router-dom'
import Rating from 'react-rating'
import { clsx } from 'clsx'
import { MdAddShoppingCart } from 'react-icons/md'
import { BsHandbag } from 'react-icons/bs'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'
import { Separator } from '~/components/ui/separator'

import { IoMdStarOutline } from 'react-icons/io'
import { IoMdStar } from 'react-icons/io'
import { FaRegStar, FaStar } from 'react-icons/fa'

function Product({ product, loading }) {
  const navigate = useNavigate()
  return (
    <Card className={clsx({
      'border-none shadow-none': loading,
      'cursor-pointer border-gray-200 hover:border-[2px] border shadow hover:shadow-xl overflow-hidden': !loading
    })}>
      <CardContent className='p-2' onClick={() => navigate(`/buyer/product/${product._id}`)}>
        {loading
          ? <Skeleton className='w-full aspect-square'/>
          : <img src={product?.thumbnailUrl} alt="" className='w-full aspect-square object-contain'/>
        }
      </CardContent>

      <CardHeader className='px-4' onClick={() => navigate(`/buyer/product/${product._id}`)}>
        {loading
          ? <Skeleton className='h-[32px]'/>
          : <CardTitle className='line-clamp-2 min-h-[32px] text-mainColor1-600'>{product?.name}</CardTitle>
        }

        {loading
          ? <Skeleton className='h-[40px]'/>
          : <CardDescription>
            <div className='text-lg font-bold text-[#ff4d4f] mb-1 text-justify'>
              {(
                product?.price *
                (1 - product?.discountPercentage / 100)
              ).toLocaleString()}
              <sup>đ</sup>
            </div>
            <div className='text-sm text-gray-400 flex justify-between items-center my-2'>
              <div className='flex items-center gap-2'>
                <span>{product?.rate || '0'}</span>
                <Rating
                  emptySymbol={<FaRegStar />}
                  fullSymbol={<FaStar />}
                  initialRating={product?.rate || 0}
                  readonly
                  className='text-[#FBCA04] text-md leading-none'
                />
              </div>

              <span>| Đã bán: {product?.quantitySold || 0}</span>
            </div>
          </CardDescription>
        }
      </CardHeader>

      {!loading && <Separator className='border-gray-200'/>}

      {loading
        ? <Skeleton className='pl-4 py-2 h-4'/>
        : <CardFooter className='p-0 text-sm cursor-pointer grid grid-cols-2 text-center'>
          <div className='hover:bg-mainColor2-800 text-mainColor2-800 hover:text-white flex items-center justify-center p-2 border-r border-r-gray-200'>
            <MdAddShoppingCart className='text-2xl' />
          </div>
          <div className='hover:bg-mainColor1-800 p-2 text-mainColor1-800 hover:text-white flex items-center justify-center'>
            <BsHandbag className='text-2xl' />
          </div>
        </CardFooter>
      }
    </Card>
  )
}

export default Product
