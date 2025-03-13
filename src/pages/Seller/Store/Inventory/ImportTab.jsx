import { joiResolver } from '@hookform/resolvers/joi'
import { format } from 'date-fns'
import Joi from 'joi'
import { CalendarIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Calendar } from '~/components/ui/calendar'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { Textarea } from '~/components/ui/textarea'
import { cn } from '~/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '~/components/ui/table'
import productImg from '~/assets/logo.png'
import { useState } from 'react'
import UploadImage from '~/components/UploadImage'
import { Separator } from '~/components/ui/separator'

const items = [
  {
    sku: 'P001',
    productImg: productImg,
    productName: 'Áo thun nam',
    importQuantity: 100,
    importPrice: 120000,
    expireDate: null,
    note: 'Lô hàng mới'
  },
  {
    sku: 'P002',
    productImg: productImg,
    productName: 'Giày sneaker',
    importQuantity: 50,
    importPrice: 500000,
    expireDate: null,
    note: 'Lô hàng mới'
  }
]

function ImportTab() {
  const formSchema = Joi.object({})
  const subFormSchema = Joi.object({})

  const form = useForm({
    resolver: joiResolver(formSchema),
    defaultValues: {}
  })

  const subForm = useForm({
    resolver: joiResolver(subFormSchema),
    defaultValues: {}
  })

  const submitImport = () => {}
  const submitAddProduct = () => {}

  const [products, setProducts] = useState(items)

  return (
    <div className="">
      <div className='bg-white p-4 rounded-xl'>
        <div className='text-lg font-semibold mb-2'>Đợt nhập kho mới</div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitImport)} className="space-y-4">
            <div className="grid grid-cols-3 gap-10">
              <FormField
                control={form.control}
                name="importId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-base'>Mã nhập kho</FormLabel>
                    <FormControl>
                      <Input className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 focus:outline-none focus:border-[2px] border-[1px] w-[240px] ${!!form.formState.errors['importId'] && 'border-red-500'}`} {...field} />
                    </FormControl>
                    <FormDescription className=''>
                  Hệ thống sẽ tự động tạo mã. Bạn có thể tùy chỉnh nếu muốn.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="importDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-base block'>Ngày nhập kho</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'dd-MM-yyyy')
                            ) : (
                              <span>Chọn ngày nhập kho</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription className=''>
                  Mặc định sẽ là ngày hiện tại.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="importer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-base'>Người nhập kho</FormLabel>
                    <FormControl>
                      <Input className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 focus:outline-none focus:border-[2px] border-[1px] w-[240px] ${!!form.formState.errors['importer'] && 'border-red-500'}`} {...field} />
                    </FormControl>
                    <FormDescription className=''>
                    Mặc định sẽ là chủ cửa hàng này.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="importNote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base'>Ghi chú nhập kho</FormLabel>
                  <FormControl>
                    <Textarea className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 focus:outline-none focus:border-[2px] border-[1px] ${!!form.formState.errors['importNote'] && 'border-red-500'}`} {...field} />
                  </FormControl>
                  <FormDescription className=''>
                  Vd: Nhập hàng đợt khuyến mãi, bổ sung tồn kho
                  </FormDescription>
                </FormItem>
              )}
            />

            <Separator />

            <div className='text-md font-semibold mb-2'>Danh sách sản phẩm trong đợt nhập kho mới</div>

            <Form {...subForm}>
              <form onSubmit={subForm.handleSubmit(submitAddProduct)} className="grid grid-cols-7 gap-2">

                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU</FormLabel>
                      <FormControl>
                        <Input className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 focus:outline-none focus:border-[2px] border-[1px] ${!!form.formState.errors['importNote'] && 'border-red-500'}`} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productImg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ảnh sản phẩm</FormLabel>
                      <FormControl>
                        <UploadImage {...field}/>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên sản phẩm</FormLabel>
                      <FormControl>
                        <Input className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 focus:outline-none focus:border-[2px] border-[1px] ${!!form.formState.errors['importNote'] && 'border-red-500'}`} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="importQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số lượng nhập</FormLabel>
                      <FormControl>
                        <Input className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 focus:outline-none focus:border-[2px] border-[1px] ${!!form.formState.errors['importNote'] && 'border-red-500'}`} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="importPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giá nhập</FormLabel>
                      <FormControl>
                        <Input className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 focus:outline-none focus:border-[2px] border-[1px] ${!!form.formState.errors['importNote'] && 'border-red-500'}`} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expireDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hạn sử dụng</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'dd-MM-yyyy')
                              ) : (
                                <span></span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date('1900-01-01')}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ghi chú</FormLabel>
                      <FormControl>
                        <Input className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 focus:outline-none focus:border-[2px] border-[1px] ${!!form.formState.errors['importNote'] && 'border-red-500'}`} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className='col-span-6'></div>
                <Button type='submit' className=''>Thêm sản phẩm</Button>
              </form>
            </Form>


            <div className="[&>div]:max-h-96">
              <Table className="[&_td]:border-border [&_th]:border-border border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
                <TableHeader className="bg-background/90 sticky top-0 z-10 backdrop-blur-xs">
                  <TableRow className="hover:bg-transparent">
                    <TableHead>SKU</TableHead>
                    <TableHead>Hình ảnh</TableHead>
                    <TableHead>Tên sản phẩm</TableHead>
                    <TableHead>Số lượng nhập</TableHead>
                    <TableHead>Giá nhập</TableHead>
                    <TableHead>Hạn sử dụng (nếu có)</TableHead>
                    <TableHead>Ghi chú</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.sku}</TableCell>
                      <TableCell>
                        <img src={item.productImg} alt="" className='w-10 h-10 rounded-lg' />
                      </TableCell>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>{item.importQuantity}</TableCell>
                      <TableCell>{item.importPrice.toLocaleString('vi-VN')}<sup>đ</sup></TableCell>
                      <TableCell>{item.expireDate || 'Không có'}</TableCell>
                      <TableCell>{item.note}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>


            <Button type="submit" className='bg-mainColor1-800/85 rounded-lg w-full py-3 text-md'>Xác nhận đợt nhập kho</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default ImportTab