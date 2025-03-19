import { joiResolver } from '@hookform/resolvers/joi'
import { Item } from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'
import Joi from 'joi'
import React, { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import MultiSelect from '~/components/MultiSelect'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '~/components/ui/breadcrumb'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Textarea } from '~/components/ui/textarea'
import UploadImage from '~/components/UploadImage'

function CreateForm() {
  const date = new Date(Date.now())
  const formatter = new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
  const [time, setTime] = useState(new Date().toLocaleTimeString('vi-VN'))
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const timeString = now.toLocaleTimeString('vi-VN')
      setTime(timeString)
    }, 1000)
    return () => clearInterval(timer)
  })

  const shops = [
    { label: 'Store 1', value: '1' },
    { label: 'Store 2', value: '2' },
    { label: 'Store 3', value: '3' },
    { label: 'Store 4', value: '4' },
    { label: 'Store 5', value: '5' }
  ]

  const formSchema = Joi.object({
    name: Joi.string(),
    categoryId: Joi.string(),
    brandId: Joi.string(),
    shopIds: Joi.array().items(Joi.string()).required(),
    typePriceTuples: Joi.array().items({
      typeName: Joi.string(),
      typePrice: Joi.number()
    }).required(),
    description: Joi.string(),
    discount: Joi.number().min(0).max(100)
  })

  const form = useForm({
    resolver: joiResolver(formSchema),
    defaultValues: {
      name: '',
      categoryId: '',
      brandId: '',
      shopIds: [],
      typePriceTuples: [{ typeName: '', typePrice: '' }],
      description: '',
      discount: ''
    }
  })

  const updateShopIds = (data) => {
    form.setValue('shopIds', data)
  }

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'typePriceTuples'
  })

  const handleAddProduct = (data) => {
    console.log(data)
  }
  return (
    <div className='px-6 py-4'>
      <div className="flex items-center justify-between mb-4 gap-8">
        <div className="flex-1">
          <div className="font-bold text-xl mb-2">Thêm sản phẩm</div>
          <Breadcrumb>
            <BreadcrumbList className='text-sm'>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to='/seller'>Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link to='/seller/products'>Sản phẩm</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link to='/seller/products'>Quản lý sản phẩm</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Thêm sản phẩm</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <span className="italic text-sm text-gray-500 text-right">{time}<br />{formatter.format(date)}</span>
      </div>

      <div className='bg-white p-4 rounded-lg'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAddProduct)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className='grid grid-cols-3 mb-2'>
                  <div className="">
                    <FormLabel className='text-base'>Tên sản phẩm<span className="text-destructive">*</span></FormLabel>
                    <FormDescription className=''>
                      Điền tên sản phẩm
                    </FormDescription>
                  </div>
                  <div className='col-span-2'>
                    <FormControl>
                      <Input
                        placeholder="Vd: Cửa hàng ABC"
                        className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-lg focus:outline-none focus:border-[2px] border-[1px] ${!!form.formState.errors['name'] && 'border-red-500'}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className='grid grid-cols-3 mb-2'>
                  <div className="">
                    <FormLabel>Danh mục sản phẩm</FormLabel>
                    <FormDescription>Chọn danh mục sản phẩm</FormDescription>
                  </div>

                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục sản phẩm" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">m@example.com</SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">m@support.com</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brandId"
              render={({ field }) => (
                <FormItem className='grid grid-cols-3 mb-2'>
                  <div className="">
                    <FormLabel>Thương hiệu sản phẩm</FormLabel>
                    <FormDescription>Chọn thương hiệu sản phẩm</FormDescription>
                  </div>

                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn thương hiệu sản phẩm" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">m@example.com</SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">m@support.com</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shopIds"
              render={() => (
                <FormItem className='grid grid-cols-3 mb-2'>
                  <div className="">
                    <FormLabel>Cửa hàng hiện có</FormLabel>
                    <FormDescription>Chọn các cửa hàng đang bán sản phẩm này.</FormDescription>
                  </div>

                  <MultiSelect shops={shops} updateShopIds={updateShopIds}/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="typePriceTuples"
              render={() => (
                <FormItem className='grid grid-cols-3 mb-2'>
                  <div className="">
                    <FormLabel>Loại sản phẩm - Giá</FormLabel>
                    <FormDescription>Thêm các loại sản phẩm và giá tương ứng</FormDescription>
                  </div>

                  <div>
                    {fields.map((field, index) => (
                      <div key={field.id} className="flex gap-2 items-end my-2">
                        <FormField
                          control={form.control}
                          name={`typePriceTuples.${index}.typeName`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Nhập tên loại..." {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`typePriceTuples.${index}.typePrice`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Nhập giá..." {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <Button variant="destructive" type="button" onClick={() => remove(index)}>
                          Xóa
                        </Button>
                      </div>
                    ))}

                    <Button type="button" onClick={() => append({ name: '', email: '', phone: '' })} className={clsx({ 'mt-3': fields.length > 0 })}>
                      Thêm
                    </Button>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className='grid grid-cols-3 mb-2'>
                  <div className="">
                    <FormLabel className='text-base'>Mô tả</FormLabel>
                    <FormDescription className=''>
                      Ghi mô tả sản phẩm
                    </FormDescription>
                  </div>
                  <FormControl className='col-span-2'>
                    <Textarea
                      placeholder="Vd: Mô tả của sản phẩm"
                      className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-lg focus:outline-none focus:border-[2px] border-[1px] ${!!form.formState.errors['description'] && 'border-red-500'}`}
                      {...field}
                    />
                  </FormControl>

                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem className='grid grid-cols-3 mb-2'>
                  <div className="">
                    <FormLabel className='text-base'>Giảm giá</FormLabel>
                    <FormDescription className=''>
                      Điền phần trăm giảm giá. Mặc định là 0.
                    </FormDescription>
                  </div>
                  <FormControl className='col-span-2'>
                    <Input
                      type='number'
                      placeholder="Vd: Cửa hàng ABC"
                      className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-lg focus:outline-none focus:border-[2px] border-[1px] ${!!form.formState.errors['discount'] && 'border-red-500'}`}
                      {...field}
                    />
                  </FormControl>

                </FormItem>
              )}
            />

            <FormItem className='grid grid-cols-3 mb-2'>
              <div className="">
                <FormLabel className='text-base'>Hình ảnh</FormLabel>
                <FormDescription className=''>
                      Upload hình ảnh mặc định của sản phẩm
                </FormDescription>
              </div>
              <FormControl className='col-span-2'>
                {/* <Input
                      type='number'
                      placeholder="Vd: Cửa hàng ABC"
                      className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 rounded-lg focus:outline-none focus:border-[2px] border-[1px] ${!!form.formState.errors['discount'] && 'border-red-500'}`}
                      {...field}
                    /> */}
                <UploadImage />
              </FormControl>

            </FormItem>

            <div>
              <Button type='submit' className='mt-10 w-full'>Tạo sản phẩm</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CreateForm