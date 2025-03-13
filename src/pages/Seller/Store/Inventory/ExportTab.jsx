import { joiResolver } from '@hookform/resolvers/joi'
import { format } from 'date-fns'
import Joi from 'joi'
import { CalendarIcon, CircleUserRoundIcon } from 'lucide-react'
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
import { Separator } from '~/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'

const items = [
  {
    sku: 'P001',
    productImg: productImg,
    productName: 'Áo thun nam',
    exportQuantity: 50,
    exportPurpose: 'Bán hàng',
    note: 'Giao cho đơn #12345'
  },
  {
    sku: 'P002',
    productImg: productImg,
    productName: 'Giày sneaker',
    exportQuantity: 20,
    exportPurpose: 'Trả nhà cung cấp',
    note: 'Hàng lỗi từ đợt nhập 10/03'
  }
]

function ExportTab() {
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

  const [searchProduct, setSearchProduct] = useState({})

  return (
    <div className="">
      <div className='bg-white p-4 rounded-xl'>
        <div className='text-lg font-semibold mb-2'>Đợt xuất kho mới</div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitImport)} className="space-y-4">
            <div className="grid grid-cols-3 gap-10">
              <FormField
                control={form.control}
                name="importId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-base'>Mã xuất kho</FormLabel>
                    <FormControl>
                      <Input className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 focus:outline-none focus:border-[2px] border-[1px] w-[240px] ${!!form.formState.errors['importId'] && 'border-red-500'}`} {...field} />
                    </FormControl>
                    <FormDescription className=''>
                      Tự động tạo hoặc nhập tay.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="importDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-base block'>Ngày xuất kho</FormLabel>
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
                              <span>Chọn ngày xuất kho</span>
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
                    <FormLabel className='text-base'>Người thực hiện</FormLabel>
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

            <div className="grid grid-cols-3 gap-8">
              <FormField
                control={form.control}
                name="exportReason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-base'>Lí do xuất kho</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn lí do" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Xuất bán hàng</SelectItem>
                        <SelectItem value="2">Xuất hủy hàng lỗi</SelectItem>
                        <SelectItem value="3">Xuất trả nhà cung cấp</SelectItem>
                        <SelectItem value="4">Xuất để điều chuyển nội bộ</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="importNote"
                render={({ field }) => (
                  <FormItem className='col-span-2'>
                    <FormLabel className='text-base'>Ghi chú xuất kho</FormLabel>
                    <FormControl>
                      <Textarea className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 focus:outline-none focus:border-[2px] border-[1px] ${!!form.formState.errors['importNote'] && 'border-red-500'}`} {...field} />
                    </FormControl>
                    <FormDescription className=''>
                      Vd: Xuất hàng theo đơn hàng XYZ, hàng lỗi cần tiêu hủy
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>


            <Separator />

            <div className='text-md font-semibold mb-2'>Danh sách sản phẩm trong đợt xuất kho mới</div>

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
                <div className="">
                  <FormLabel>Ảnh sản phẩm</FormLabel>
                  <div
                    className="mt-2 border-input relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md border"
                    aria-label={searchProduct?.productImg ? 'Preview of uploaded image' : 'Default user avatar'}>
                    {searchProduct?.productImg ? (
                      <img
                        className="h-full w-full object-cover"
                        src={searchProduct?.productImg}
                        alt="Preview of uploaded image"
                        width={32}
                        height={32} />
                    ) : (
                      <div aria-hidden="true">
                        <CircleUserRoundIcon className="opacity-60" size={16} />
                      </div>
                    )}
                  </div>
                </div>

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
                  name="exportQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số lượng xuất</FormLabel>
                      <FormControl>
                        <Input className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 focus:outline-none focus:border-[2px] border-[1px] ${!!form.formState.errors['importNote'] && 'border-red-500'}`} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="exportPurpose"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mục đích xuất</FormLabel>
                      <FormControl>
                        <Input className={`placeholder:text-green-50 placeholder:text-sm placeholder:text-opacity-50 focus:outline-none focus:border-[2px] border-[1px] ${!!form.formState.errors['importNote'] && 'border-red-500'}`} {...field} />
                      </FormControl>
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
                <div className='flex items-end'>
                  <Button type='submit' >Thêm sản phẩm</Button>
                </div>

              </form>
            </Form>


            <div className="[&>div]:max-h-96">
              <Table className="[&_td]:border-border [&_th]:border-border border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
                <TableHeader className="bg-background/90 sticky top-0 z-10 backdrop-blur-xs">
                  <TableRow className="hover:bg-transparent">
                    <TableHead>SKU</TableHead>
                    <TableHead>Hình ảnh</TableHead>
                    <TableHead>Tên sản phẩm</TableHead>
                    <TableHead>Số lượng xuất</TableHead>
                    <TableHead>Mục đích</TableHead>
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
                      <TableCell>{item.exportQuantity}</TableCell>
                      <TableCell>{item.exportPurpose}</TableCell>
                      <TableCell>{item.note}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>


            <Button type="submit" className='bg-mainColor1-800/85 rounded-lg w-full py-3 text-md'>Xác nhận đợt xuất kho</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default ExportTab