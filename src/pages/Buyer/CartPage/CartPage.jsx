import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrentCartAPI, selectCurrentCart, setCart } from '~/redux/cart/cartSlice'

import {
  Table,
  TableBody,
  TableCaption,
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
import { Badge } from '~/components/ui/badge'
import { cn } from '~/lib/utils'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useDebounceFn } from '~/hooks/useDebounceFn'
import { cloneDeep } from 'lodash'

function CartPage() {
  const dispatch = useDispatch()
  const cart = useSelector(selectCurrentCart)

  useEffect(() => {
    dispatch(fetchCurrentCartAPI())
  }, [dispatch])

  const handleDecreaseQuantity = (productId) => {
    const cloneCart = cloneDeep(cart)
    cloneCart.products.forEach((product) => {
      if (product.productId === productId) {
        if (product.quantity > 1) {
          product.quantity = product.quantity - 1
        }
      }
    })

    dispatch(setCart(cloneCart))
  }

  const handleIncreaseQuantity = (productId) => {
    const cloneCart = cloneDeep(cart)
    cloneCart.products.forEach((product) => {
      if (product.productId === productId) {
        product.quantity = product.quantity + 1
      }
    })

    dispatch(setCart(cloneCart))
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
      accessorKey: 'thumbnailUrl',
      cell: ({ row }) => <img
        src={row.getValue('thumbnailUrl')}
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
          {row.getValue('price').toLocaleString('vi-VN')}<sup>đ</sup>
        </div>
      )
    },
    {
      header: 'Số lượng',
      accessorKey: 'quantity',
      cell: ({ row }) => {
        return (
          <div className='flex items-center justify-between rounded-lg p-1'>
            <RiSubtractFill
              className='cursor-pointer text-xl hover:bg-mainColor2-800/40 rounded-md'
              onClick={() => { handleDecreaseQuantity(row.original._id) }}
            />
            <input
              value={cart?.products.find((product) => product.productId === row.original._id)?.quantity}
              readOnly
              className='w-[30px] text-center mx-1.5 border-none outline-none text-md'
            />
            <IoMdAdd
              className='cursor-pointer text-xl hover:bg-mainColor2-800/40 rounded-md'
              onClick={() => { handleIncreaseQuantity(row.original._id) }}
            />
          </div>
        )
      }
    },
    {
      header: () => <div className="text-right">Thành tiền</div>,
      accessorKey: 'totalPrice',
      cell: ({ row }) => {
        return <div className="text-right">{(row.getValue('price') * cart?.products.find((product) => product.productId === row.original._id)?.quantity).toLocaleString('vi-VN')}
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
    const result = rows.reduce((sum, row, index) => {
      if (row.getIsSelected()) {
        return sum + row.original.price * cart.products[index].quantity
      }
    }, 0)
    return result
  }

  return (
    <div className='container mx-auto'>
      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-3 py-4 h-[100vh]">
          <div className='font-semibold text-2xl text-mainColor2-800 mb-4'>Giỏ Hàng Của Bạn</div>
          {!cart || !cart?.products.length
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
                    <TableCell colSpan={5}>Tổng thành tiền</TableCell>
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

            <Link to='/buyer/checkout' className='bg-mainColor1-800 w-full block text-white uppercase py-4 text-center rounded-xl font-bold hover:drop-shadow-xl hover:scale-[102%] hover:duration-300 hover:bg-mainColor1-600 transition-all'>Thanh toán</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
