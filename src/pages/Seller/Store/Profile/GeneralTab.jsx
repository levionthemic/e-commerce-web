import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { useId } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { Textarea } from '~/components/ui/textarea'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'

function GeneralTab() {
  const id = useId()
  const formSchema = Joi.object({
    storeName: Joi.string().required().messages({
      'string.empty': FIELD_REQUIRED_MESSAGE
    })
  })
  const form = useForm({
    resolver: joiResolver(formSchema),
    defaultValues: {
      storeName: 'Tên cửa hàng',
      description: `
        ✨ LEVI Store - Thời Trang Đẳng Cấp, Phong Cách Bền Vững ✨
        Chào mừng bạn đến với LEVI Store, nơi mang đến những sản phẩm thời trang chất lượng cao, thiết kế tinh tế và đậm chất cá tính. Chúng tôi tự hào cung cấp các bộ sưu tập mới nhất, từ quần jeans, áo thun, sơ mi đến phụ kiện cao cấp, giúp bạn tự tin thể hiện phong cách riêng.
        💎 Cam kết của chúng tôi: <br />
        ✔ Sản phẩm chính hãng, chất lượng cao <br />
        ✔ Chính sách đổi trả linh hoạt, bảo hành uy tín <br />
        ✔ Giao hàng nhanh chóng, tiện lợi
      `
    }
  })

  const items = [
    { value: '1', label: 'Đang hoạt động' },
    { value: '2', label: 'Tạm ngưng' },
    { value: '3', label: 'Ngừng hoạt động' }
  ]

  const handleUpdateStoreGeneralInformation = () => {

  }

  return (
    <div className='bg-white rounded-lg p-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdateStoreGeneralInformation)}>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <FormField
              control={form.control}
              name="storeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base'>Tên cửa hàng</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Vd: Cửa hàng ABC"
                      className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-lg focus:outline-none focus:border-[2px] border-[1px] ${!!form.formState.errors['storeName'] && 'border-red-500'}`}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className=''>
                          Bạn có thể thay đổi tên cửa hàng.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='createDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base'>Ngày thành lập</FormLabel>
                  <FormControl>
                    <Input className='placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-lg focus:outline-none focus:border-[2px] border-[1px]' {...field} />
                  </FormControl>
                  <FormDescription className=''>
                          Bạn không thể thay đổi ngày bạn thành lập cửa hàng.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base'>Trạng thái cửa hàng</FormLabel>
                  <FormControl>
                    <RadioGroup className="flex flex-wrap gap-2" defaultValue="1" onValueChange={field.onChange}>
                      {items.map((item) => (
                        <div
                          key={`${id}-${item.value}`}
                          className="border-input has-data-[state=checked]:border-ring relative flex flex-col items-start gap-4 rounded-md border p-3 shadow-xs outline-none"
                        >
                          <div className="flex items-center gap-2">
                            <RadioGroupItem
                              id={`${id}-${item.value}`}
                              value={item.value}
                              className="after:absolute after:inset-0"
                            />
                            <Label htmlFor={`${id}-${item.value}`}>{item.label}</Label>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormDescription className=''>
                            Quyết định việc cửa hàng của bạn có được phép bán hàng hay không.
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='mb-8'>
                <FormLabel className='text-base'>Mô tả</FormLabel>
                <FormControl>
                  <Textarea className='placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-lg focus:outline-none focus:border-[2px] border-[1px] h-52' {...field} />
                </FormControl>
                <FormDescription className=''>
                          Mô tả cửa hàng của bạn.
                </FormDescription>
              </FormItem>
            )}
          />

          <Button type="submit" className='bg-mainColor1-800/85 rounded-lg w-full py-3 text-md'>Cập nhật chỉnh sửa</Button>
        </form>
      </Form>
    </div>
  )
}

export default GeneralTab