import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { useId } from 'react'
import { useForm } from 'react-hook-form'
import { BsTiktok } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa6'
import coverImg from '~/assets/banner.jpg'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { Textarea } from '~/components/ui/textarea'
import UploadImage from '~/components/UploadImage'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELD_REQUIRED_MESSAGE } from '~/utils/validators'


function Store() {
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
      `,
      socialNetworks: ['', '', '']
    }
  })

  const handleUpdateStoreGeneralInformation = (data) => {

  }

  const items = [
    { value: '1', label: 'Đang hoạt động' },
    { value: '2', label: 'Tạm ngưng' },
    { value: '3', label: 'Ngừng hoạt động' }
  ]
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
                          <FormMessage />
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
                          <FormMessage />
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
                          <FormMessage />
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className='bg-mainColor1-800/85 rounded-lg w-full py-3 text-md'>Cập nhật chỉnh sửa</Button>
                </form>
              </Form>
            </div>
          </TabsContent>

          <TabsContent value="2">
            <div className="bg-white p-4 rounded-lg">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleUpdateStoreGeneralInformation)}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-4 mb-4">
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-3">
                              <div className="col-span-1">
                                <FormLabel className='text-base whitespace-nowrap'>Số điện thoại</FormLabel>
                                <FormDescription className=''>
                                  Chỉ dùng 1 số.
                                </FormDescription>
                              </div>
                              <FormControl className='col-span-2'>
                                <Input
                                  placeholder="Vd: 0123456789"
                                  className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-lg focus:outline-none focus:border-[2px] border-[1px] ${!!form.formState.errors['phoneNumber'] && 'border-red-500'}`}
                                  {...field}
                                />
                              </FormControl>
                            </div>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-3">
                              <div className="col-span-1">
                                <FormLabel classame='text-base'>Email</FormLabel>
                                <FormDescription className=''>
                                  Chỉ dùng 1 email.
                                </FormDescription>
                              </div>

                              <FormControl className='col-span-2'>
                                <Input placeholder='Vd: abc@example.com' className='placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-lg focus:outline-none focus:border-[2px] border-[1px]' {...field} />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='address'
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-3">
                              <div className="">
                                <FormLabel className='text-base'>Địa chỉ cửa hàng</FormLabel>
                                <FormDescription className=''>
                                  Dùng địa chỉ vật lý của bạn.
                                </FormDescription>
                              </div>

                              <FormControl className='col-span-2'>
                                <Input className='placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-lg focus:outline-none focus:border-[2px] border-[1px]' {...field} />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="">
                      <div className="flex items-end gap-4 mb-3.5">
                        <FormLabel className='text-base'>Liên kết mạng xã hội</FormLabel>
                        <FormDescription>Điền các liên kết mạng xã hội (nếu có).</FormDescription>
                      </div>
                      <FormField
                        control={form.control}
                        name='socialNetworks.0'
                        render={({ field }) => (
                          <FormItem className='mb-1'>
                            <FormControl>
                              <div className='relative'>
                                <Input placeholder='Facebook' className='peer ps-9 placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-lg focus:outline-none focus:border-[2px] border-[1px]' {...field} />
                                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                  <FaFacebookF size={16} />
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='socialNetworks.1'
                        render={({ field }) => (
                          <FormItem className='mb-1'>
                            <FormControl>
                              <div className='relative'>
                                <Input placeholder='Instagram' className='peer ps-9 placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-lg focus:outline-none focus:border-[2px] border-[1px]' {...field} />
                                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                  <FaInstagram size={16} />
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='socialNetworks.2'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className='relative'>
                                <Input placeholder='Tiktok' className='peer ps-9 placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-lg focus:outline-none focus:border-[2px] border-[1px]' {...field} />
                                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                  <BsTiktok size={16} />
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>


                  <Button type="submit" className='bg-mainColor1-800/85 rounded-lg w-full py-3 text-md mt-8'>Cập nhật chỉnh sửa</Button>
                </form>
              </Form>
            </div>
          </TabsContent>

          <TabsContent value="3">Change your password here.</TabsContent>

          <TabsContent value="4">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Store