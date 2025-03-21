import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import Rating from '~/components/ui/rating'
import { Textarea } from '~/components/ui/textarea'

function ReviewPage() {
  const product =
  {
    '_id': '67da753807afbe0b444c103a',
    'sellerId': '67da740249640e6c5c000c01',
    'name': 'Áo thun nam cổ tròn basic',
    'categoryId': '67da766d07afbe0b444c1044',
    'brandId': '67da78cb07afbe0b444c1053',
    'description': 'Áo thun nam cổ tròn chất liệu cotton co giãn, thấm hút tốt, phù hợp mặc hàng ngày.',
    'features': [
      {
        'field': 'Chất liệu',
        'content': '100% cotton'
      },
      {
        'field': 'Màu sắc',
        'content': 'Trắng, Đen, Xám'
      },
      {
        'field': 'Size',
        'content': 'M, L, XL, XXL'
      }
    ],
    'discount': 0,
    'avgPrice': 153750,
    'medias': [],
    'avatar': 'https://res.cloudinary.com/djxo5a9x6/image/upload/v1742374855/gdvosroriy1urqpmvrva.jpg',
    'rating': 0,
    'sold': 0,
    'score': 0,
    'createdAt': 1710851200000,
    'updatedAt': 1710851200000,
    '_deleted': false,
    type: {
      'typeId': '67da75a007afbe0b444c103b',
      'typeName': 'Áo thun nam cổ tròn basic - Đen - Size M',
      'price': 150000,
      'discount': 0,
      'stock': 100
    }
  }

  const formSchema = Joi.object({
    rating: Joi.number().required(),
    comment: Joi.string()
  })
  const form = useForm({
    resolver: joiResolver(formSchema),
    defaultValues: {}
  })

  const onSubmitReview = (data) => {
    console.log(data)
  }

  return (
    <div className='container mx-auto py-4'>
      <div className='mb-4 text-2xl text-mainColor1-600 font-bold'>Thông tin sản phẩm</div>

      <div className='flex items-center gap-10 border border-mainColor1-100 rounded-xl p-3 h-fit'>
        <div className="w-20">
          <img src={product.avatar} alt="" className='w-full aspect-square object-contain'/>
        </div>

        <div className='flex flex-col justify-between h-20 flex-1'>
          <div className='text-xl font-semibold text-mainColor1-600'>{product.name}</div>
          <div>{product?.type?.typeName}</div>
        </div>
      </div>

      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitReview)} className="space-y-8 max-w-3xl mx-auto py-10">

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel className='text-base'>Đánh giá</FormLabel>
                  <FormControl className="w-full">
                    <Rating onChange={field.onChange} defaultSelected={field.value} />
                  </FormControl>
                  <FormDescription>Hãy chọn số sao đánh giá cho sản phẩm vừa mua của bạn.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base'>Bình luận</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Bình luận..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Bạn có thể viết bình luận kèm theo.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Gửi</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default ReviewPage