import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating'
import { clsx } from 'clsx'

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

function Product({ product, loading }) {

  return (
    <Card className={clsx({
      'border-none shadow-none': loading,
      'cursor-pointer border-mainColor2-100/60 border shadow hover:drop-shadow-xl': !loading
    })}>
      <CardContent className='p-2'>
        {loading
          ? <Skeleton className='w-full aspect-square'/>
          : <img src={product?.thumbnailUrl} alt="" className='w-full aspect-square object-contain'/>
        }

      </CardContent>

      <CardHeader className='px-4'>
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
              <div className='flex items-center gap-1'>
                <span>{product?.rate || '0'}</span>
                <Rating
                  size='small'
                  name="rate"
                  value={product?.rate || 0}
                  precision={0.1}
                  readOnly />
              </div>

              <span>| Đã bán: {product?.quantitySold || 0}</span>
            </div>
          </CardDescription>
        }

      </CardHeader>

      {!loading && <Separator className='bg-mainColor2-100/60'/>}

      {loading
        ? <Skeleton className='pl-4 py-2 h-4'/>
        : <CardFooter className='pl-4 py-2 text-sm text-mainColor2-800 hover:text-mainColor1-800 cursor-pointer'>
          <Link to={`/buyer/product/${product._id}`}>Xem chi tiết</Link>
        </CardFooter>
      }
    </Card>
  )
}

export default Product
