import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import Rating from '~/components/ui/rating'
import { Button } from '~/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Textarea } from '~/components/ui/textarea'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import { useEffect, useState } from 'react'
import { socketIoInstance } from '~/socket'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { useSelector } from 'react-redux'

function ReviewModal({ onSubmitReview, product }) {
  const currentUser = useSelector(selectCurrentUser)

  const formSchema = Joi.object({
    rating: Joi.number().required().messages({
      'any.required': FIELD_REQUIRED_MESSAGE
    }),
    content: Joi.string().default('')
  })

  const form = useForm({
    resolver: joiResolver(formSchema),
    defaultValues: {
      rating: 0
    }
  })

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      socketIoInstance.emit('FE_START_REVIEW', {
        productId : product._id,
        userId: currentUser._id
      })
    } else {
      socketIoInstance.emit('FE_STOP_REVIEW', {
        productId : product._id,
        userId: currentUser._id
      })
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='bg-mainColor2-800 hover:bg-mainColor2-800/80'>
          Đánh giá
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitReview)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Đánh giá sản phẩm</DialogTitle>
              <DialogDescription>
                Gửi đánh giá sản phẩm kèm bình luận cho sản phẩm.
              </DialogDescription>
            </DialogHeader>

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
              name="content"
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

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant='outline'>Hủy</Button>
              </DialogClose>
              <Button type="submit">Hoàn tất</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ReviewModal