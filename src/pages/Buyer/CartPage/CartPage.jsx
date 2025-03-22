import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentCart, setCart, updateCartQuantityAPI } from '~/redux/cart/cartSlice'

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '~/components/ui/table'
import { Separator } from '~/components/ui/separator'
import { RiSubtractFill } from 'react-icons/ri'
import { IoMdAdd } from 'react-icons/io'
import { Checkbox } from '~/components/ui/checkbox'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { cloneDeep } from 'lodash'
import { Button } from '~/components/ui/button'
import { toast } from 'sonner'

function CartPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector(selectCurrentCart)

  const handleDecreaseQuantity = (productId, typeId) => {
    const cloneCart = cloneDeep(cart)
    let newQuantity = 0
    cloneCart.itemList.forEach((product) => {
      if (product.productId === productId && product.typeId === typeId) {
        if (product.quantity > 1) {
          product.quantity = product.quantity - 1
          newQuantity = product.quantity
        }
      }
    })

    dispatch(setCart(cloneCart))

    dispatch(updateCartQuantityAPI({ productId, typeId, quantity: newQuantity }))
  }

  const handleIncreaseQuantity = (productId, typeId) => {
    const cloneCart = cloneDeep(cart)
    let newQuantity = 0
    cloneCart.itemList.forEach((product) => {
      if (product.productId === productId && product.typeId === typeId) {
        product.quantity = product.quantity + 1
        newQuantity = product.quantity
      }
    })

    dispatch(setCart(cloneCart))
    dispatch(updateCartQuantityAPI({ productId, typeId, quantity: newQuantity }))
  }

  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      )
    },
    {
      header: 'Ảnh sản phẩm',
      accessorKey: 'avatar',
      cell: ({ row }) => <img
        src={row.getValue('avatar')}
        alt={row.getValue('name')}
        className='w-20 h-20'
      />
    },
    {
      header: 'Tên sản phẩm',
      accessorKey: 'name',
      cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>
    },
    {
      header: 'Giá sản phẩm',
      accessorKey: 'price',
      cell: ({ row }) => (
        <div>
          {row.original.type.price.toLocaleString('vi-VN')}<sup>đ</sup>
        </div>
      )
    },
    {
      header: 'Loại sản phẩm',
      accessorKey: 'type',
      cell: ({ row }) => (
        <div>
          {row.original.type.typeName}
        </div>
      )
    },
    {
      id: 'quantity',
      header: 'Số lượng',
      accessorKey: 'quantity',
      cell: ({ row }) => {
        return (
          <div className='flex items-center justify-between rounded-lg p-1'>
            <RiSubtractFill
              className='cursor-pointer text-xl hover:bg-mainColor2-800/40 rounded-md'
              onClick={() => { handleDecreaseQuantity(row.original._id, row.original.type.typeId) }}
            />
            <input
              value={cart?.itemList.find((product) => product.productId === row.original._id && product.typeId === row.original.type.typeId)?.quantity}
              readOnly
              className='w-[30px] text-center mx-1.5 border-none outline-none text-md'
            />
            <IoMdAdd
              className='cursor-pointer text-xl hover:bg-mainColor2-800/40 rounded-md'
              onClick={() => { handleIncreaseQuantity(row.original._id, row.original.type.typeId) }}
            />
          </div>
        )
      }
    },
    {
      header: () => <div className="text-right">Thành tiền</div>,
      accessorKey: 'totalPrice',
      cell: ({ row }) => {
        return <div className="text-right">{(row.original.type.price * cart?.itemList.find((product) => product.productId === row.original._id && product.typeId === row.original.type.typeId)?.quantity).toLocaleString('vi-VN')}
          <sup>đ</sup></div>
      }
    }
  ]

  const [data] = useState(cart.fullProducts)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  const totalPrice = () => {
    const rows = table.getRowModel().rows
    const result = rows.reduce((sum, row) => {
      let temp = 0
      if (row.getIsSelected()) {
        temp += row.original.type.price * cart.itemList.find((product) => product.productId === row.original._id && product.typeId === row.original.type.typeId).quantity
      }
      return sum + temp
    }, 0)
    return result
  }

  const handleCheckout = () => {
    const rows = table.getRowModel().rows
    const selectedRows = rows.filter(row => row.getIsSelected()).map(row => ({
      ...row.original,
      quantity: cart.itemList[row.index].quantity
    }))
    if (!selectedRows.length) {
      toast.error('Bạn chưa chọn sản phẩm!')
      return
    }
    navigate('/buyer/checkout', { state: { selectedRows: selectedRows } })
  }

  return (
    <div className='container mx-auto'>
      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-3 py-4 h-fit">
          <div className='font-semibold text-2xl text-mainColor2-800 mb-4'>Giỏ Hàng Của Bạn</div>
          {!cart || !cart?.itemList.length
            ? <p>Giỏ hàng của bạn đang trống.</p>
            : <div>
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="hover:bg-transparent">
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter className="bg-transparent">
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={6}>Tổng thành tiền</TableCell>
                    <TableCell className="text-right">
                      <div className="total-price text-right">{totalPrice()?.toLocaleString('vi-VN') || 0}
                        <sup>đ</sup></div>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          }
        </div>
        <div className="col-span-1 bg-[#ECEEF6]">
          <div className='bg-white rounded-lg m-4 p-4'>
            <div className='uppercase tracking-wide text-sm font-semibold text-mainColor1-600 text-center py-4'>Tóm tắt</div>

            <Separator />

            <div className='flex justify-between my-4 text-sm'>
              <div className="flex flex-col gap-1.5">
                <span>Tổng thành tiền</span>
                <span>Phí vận chuyển</span>
                <span>Giảm giá</span>
              </div>
              <div className="flex flex-col gap-1.5 items-end">
                <span>{totalPrice()?.toLocaleString('vi-VN') || 0}<sup>đ</sup></span>
                <span>{(0).toLocaleString('vi-VN')}<sup>đ</sup></span>
                <span>{(0).toLocaleString('vi-VN')}<sup>đ</sup></span>
              </div>
            </div>

            <Separator />

            <div className="my-4 flex items-end justify-between">
              <span className='font-semibold text-mainColor1-600'>Tổng tiền</span>
              <span className='font-bold text-xl text-mainColor1-800'>{totalPrice()?.toLocaleString('vi-VN') || 0}<sup>đ</sup></span>
            </div>

            <Button onClick={handleCheckout} className='bg-mainColor1-800 w-full text-white uppercase py-4 text-center rounded-xl font-bold hover:drop-shadow-xl hover:scale-[102%] hover:duration-300 hover:bg-mainColor1-600 transition-all'>Thanh toán</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
