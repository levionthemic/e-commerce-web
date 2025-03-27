import { joiResolver } from '@hookform/resolvers/joi'
import clsx from 'clsx'
import Joi from 'joi'
import { useFieldArray, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '~/components/ui/breadcrumb'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Textarea } from '~/components/ui/textarea'
import UploadImage from '~/components/UploadImage'
import { useTimeCount } from '~/hooks/use-time-count'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'

function CreateForm() {
  const { date, time } = useTimeCount()

  const formSchema = Joi.object({
    name: Joi.string().required().messages({
      'string.empty': FIELD_REQUIRED_MESSAGE
    }),
    categoryId: Joi.string().required().messages({
      'string.empty': FIELD_REQUIRED_MESSAGE
    }),
    brandId: Joi.string().required().messages({
      'string.empty': FIELD_REQUIRED_MESSAGE
    }),
    typeFeatures: Joi.array().min(1).required().items(Joi.object({
      typeId: Joi.string().required().messages({
        'string.empty': FIELD_REQUIRED_MESSAGE
      }),
      typeName: Joi.string().required().trim().strict().messages({
        'string.empty': FIELD_REQUIRED_MESSAGE
      }),
      discount: Joi.number().default(0).messages({
        'number.base': FIELD_REQUIRED_MESSAGE
      }),
      price: Joi.number().required().default(0).messages({
        'number.base': FIELD_REQUIRED_MESSAGE
      })
    })).messages({
      'array.min': FIELD_REQUIRED_MESSAGE
    }),
    shopTypes: Joi.array().min(1).required().items(Joi.object({
      shopId: Joi.string().required().messages({
        'string.empty': FIELD_REQUIRED_MESSAGE
      }),
      typeId: Joi.string().required().messages({
        'string.empty': FIELD_REQUIRED_MESSAGE
      }),
      stock: Joi.number().required().default(0).messages({
        'number.base': FIELD_REQUIRED_MESSAGE
      })
    })).messages({
      'array.min': FIELD_REQUIRED_MESSAGE
    }),
    description: Joi.string().allow(''),
    // avatar: Joi.string().required(),
    features: Joi.array().items(Joi.object({
      field: Joi.string().required().trim().strict().messages({
        'string.empty': FIELD_REQUIRED_MESSAGE
      }),
      content: Joi.string().required().trim().strict().messages({
        'string.empty': FIELD_REQUIRED_MESSAGE
      })
    }))
  })

  const form = useForm({
    resolver: joiResolver(formSchema),
    defaultValues: {
      name: '',
      categoryId: '',
      brandId: '',
      typeFeatures: [{ typeId: '', typeName: '', discount: '', price: '' }],
      shopTypes: [{ shopId: '', typeId: '', stock: '' }],
      features: [{ field: '', content: '' }],
      description: ''
    }
  })

  const formFieldArrayForTypeFeatures = useFieldArray({
    control: form.control,
    name: 'typeFeatures'
  })

  const formFieldArrayForFeatures = useFieldArray({
    control: form.control,
    name: 'features'
  })

  const formFieldArrayForShopTypes = useFieldArray({
    control: form.control,
    name: 'shopTypes'
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
        <span className="italic text-sm text-gray-500 text-right">{time}<br />{date}</span>
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
                    <FormLabel>Tên sản phẩm<span className="text-destructive">*</span></FormLabel>
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
                    <FormMessage className='mt-2' />
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

                  <div className="col-span-2">
                    <Select onValueChange={field.onChange} defaultValue={field.value} >
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
                      <FormMessage className='mt-2'/>
                    </Select>
                  </div>
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

                  <div className='col-span-2'>
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
                    <FormMessage className='mt-2'/>
                  </div>

                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="features"
              render={() => (
                <FormItem className='grid grid-cols-3 mb-2'>
                  <div className="">
                    <FormLabel>Đặc điểm sản phẩm</FormLabel>
                    <FormDescription>Thêm các đặc điểm sản phẩm theo cặp. Nếu không có, vui lòng bấm &quot;Xóa&quot;.</FormDescription>
                  </div>

                  <div className='col-span-2'>
                    {formFieldArrayForFeatures.fields.map((field, index) => (
                      <div key={field.id} className="flex gap-2 items-start mb-2">
                        <FormField
                          control={form.control}
                          name={`features.${index}.field`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Tên đặc điểm..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`features.${index}.content`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Giá trị..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button variant="destructive" type="button" onClick={() => formFieldArrayForFeatures.remove(index)}>
                          Xóa
                        </Button>
                      </div>
                    ))}

                    <Button type="button" onClick={() => formFieldArrayForFeatures.append({ field: '', content: '' })} className={clsx({ 'mt-2': formFieldArrayForFeatures.fields.length > 0 })}>
                      Thêm
                    </Button>
                    <FormMessage className='mt-2'/>
                  </div>

                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="typeFeatures"
              render={() => (
                <FormItem className='grid grid-cols-3 mb-2'>
                  <div className="">
                    <FormLabel>Thông tin loại sản phẩm</FormLabel>
                    <FormDescription>Thêm các loại sản phẩm với các trường tương ứng</FormDescription>
                  </div>

                  <div className='col-span-2'>
                    {formFieldArrayForTypeFeatures.fields.map((field, index) => (
                      <div key={field.id} className="flex gap-2 items-start mb-2">
                        <FormField
                          control={form.control}
                          name={`typeFeatures.${index}.typeId`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Mã loại..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`typeFeatures.${index}.typeName`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Tên loại..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`typeFeatures.${index}.discount`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Giảm giá..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`typeFeatures.${index}.price`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Đơn giá..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button variant="destructive" type="button" onClick={() => formFieldArrayForTypeFeatures.remove(index)}>
                          Xóa
                        </Button>
                      </div>
                    ))}

                    <Button type="button" onClick={() => formFieldArrayForTypeFeatures.append({ typeId: '', typeName: '', discount: '', price: '' })} className={clsx({ 'mt-2': formFieldArrayForTypeFeatures.fields.length > 0 })}>
                      Thêm
                    </Button>
                    <FormMessage className='mt-2' />
                  </div>

                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shopTypes"
              render={() => (
                <FormItem className='grid grid-cols-3 mb-2'>
                  <div className="">
                    <FormLabel>Quản lý loại sản phẩm trong từng shop</FormLabel>
                    <FormDescription>Thêm các loại sản phẩm vào các shop với số lượng tương ứng</FormDescription>
                  </div>

                  <div className='col-span-2'>
                    {formFieldArrayForShopTypes.fields.map((field, index) => (
                      <div key={field.id} className="flex gap-2 items-start mb-2">
                        <FormField
                          control={form.control}
                          name={`shopTypes.${index}.shopId`}
                          render={({ field }) => (
                            <FormItem>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Tên shop..." />
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
                          name={`shopTypes.${index}.typeId`}
                          render={({ field }) => (
                            <FormItem>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Tên loại..." />
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
                          name={`shopTypes.${index}.stock`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input type='number' placeholder="Số lượng..." {...field} />
                              </FormControl>
                              <FormMessage className='mt-2' />
                            </FormItem>
                          )}
                        />
                        <Button variant="destructive" type="button" onClick={() => formFieldArrayForShopTypes.remove(index)}>
                          Xóa
                        </Button>
                      </div>
                    ))}

                    <Button type="button" onClick={() => formFieldArrayForShopTypes.append({ shopId: '', typeId: '', stock: '' })} className={clsx({ 'mt-2': formFieldArrayForShopTypes.fields.length > 0 })}>
                      Thêm
                    </Button>
                    <FormMessage className='mt-2' />
                  </div>
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