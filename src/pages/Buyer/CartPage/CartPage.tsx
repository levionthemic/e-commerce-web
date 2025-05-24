import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteItemAPI,
  selectCurrentCart,
  setCart,
  updateCartQuantityAPI
} from '~/redux/cart/cartSlice'

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
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { cloneDeep } from 'lodash'
import { Button } from '~/components/ui/button'
import { toast } from 'sonner'
import {
  ChevronDown,
  ChevronUp,
  EllipsisIcon,
  Store,
  Trash2Icon
} from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '~/components/ui/alert-dialog'
import { useRef, useState } from 'react'
import { selectCurrentUser } from '~/redux/user/userSlice'

function CartPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector(selectCurrentCart)
  const currentUser = useSelector(selectCurrentUser)

  const changesRef = useRef(new Map())
  const timerRef = useRef()

  const updateQuantity = () => {
    const updates = Array.from(changesRef.current.values())

    Promise.all(
      updates.map((update) => dispatch(updateCartQuantityAPI(update)))
    ).then(() => {
      changesRef.current.clear()
    })
  }

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

    if (currentUser) {
      const key = `${productId}-${typeId}`
      changesRef.current.set(key, {
        productId,
        typeId,
        quantity: newQuantity
      })

      if (timerRef.current) clearTimeout(timerRef.current)

      timerRef.current = setTimeout(() => {
        updateQuantity()
      }, 1000)
    }
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

    if (currentUser) {
      const key = `${productId}-${typeId}`
      changesRef.current.set(key, {
        productId,
        typeId,
        quantity: newQuantity
      })

      if (timerRef.current) clearTimeout(timerRef.current)

      timerRef.current = setTimeout(() => {
        updateQuantity()
      }, 1000)
    }
  }

  const handleDeleteItemCart = (product) => {
    let itemList = cloneDeep(cart.itemList)
    let fullProducts = cloneDeep(cart.fullProducts)

    itemList = itemList.filter(
      (item) =>
        !(item.productId === product._id && item.typeId === product.type.typeId)
    )
    fullProducts = fullProducts.filter(
      (item) =>
        !(item._id === product._id && item.type.typeId === product.type.typeId)
    )

    let updateCart = cloneDeep(cart)
    updateCart.itemList = itemList
    updateCart.fullProducts = fullProducts

    dispatch(setCart(updateCart))

    if (currentUser) {
      toast.promise(
        dispatch(
          deleteItemAPI({
            productId: product._id,
            typeId: product.type.typeId
          })
        ),
        {
          loading: 'Đang xóa...',
          success: (res) => {
            if (!res.error) return 'Xóa sản phẩm khỏi giỏ hàng thành công!'
            throw res
          }
        }
      )
    }
  }

  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      size: 30
    },
    {
      id: 'sellerId',
      header: 'Người bán',
      accessorKey: 'sellerId',
      cell: ({ row }) => (
        <div className='line-clamp-1 text-ellipsis'>
          {row.getValue('sellerId')}
        </div>
      ),
      size: 60,
      enableGrouping: true,
      enableHiding: true
    },
    {
      header: 'Ảnh',
      accessorKey: 'avatar',
      cell: ({ row }) => (
        <img
          src={row.getValue('avatar')}
          alt={row.getValue('name')}
          className='w-16 h-16 rounded'
        />
      ),
      size: 60
    },
    {
      header: 'Tên sản phẩm',
      accessorKey: 'name',
      cell: ({ row }) => (
        <div className='font-medium'>{row.getValue('name')}</div>
      )
    },
    {
      header: 'Giá sản phẩm',
      accessorKey: 'price',
      cell: ({ row }) => (
        <div>
          {row.original?.type?.price.toLocaleString('vi-VN')}
          <sup>đ</sup>
        </div>
      ),
      size: 80
    },
    {
      header: 'Loại sản phẩm',
      accessorKey: 'type',
      cell: ({ row }) => <div>{row.original?.type?.typeName}</div>
    },
    {
      id: 'quantity',
      header: 'Số lượng',
      accessorKey: 'quantity',
      cell: ({ row }) => {
        return (
          <div className='flex items-center justify-between rounded-lg p-1 border border-gray-300 w-fit'>
            <RiSubtractFill
              className='cursor-pointer text-xl hover:bg-mainColor2-800/40 rounded-md'
              onClick={() => {
                handleDecreaseQuantity(
                  row.original._id,
                  row.original.type.typeId
                )
              }}
            />
            <input
              value={
                cart?.itemList.find(
                  (product) =>
                    product.productId === row.original._id &&
                    product.typeId === row.original.type?.typeId
                )?.quantity
              }
              readOnly
              className='w-[30px] text-center mx-1.5 border-none outline-none text-md bg-transparent'
            />
            <IoMdAdd
              className='cursor-pointer text-xl hover:bg-mainColor2-800/40 rounded-md'
              onClick={() => {
                handleIncreaseQuantity(
                  row.original._id,
                  row.original.type.typeId
                )
              }}
            />
          </div>
        )
      },
      size: 80
    },
    {
      header: () => <div className='text-right'>Thành tiền</div>,
      accessorKey: 'totalPrice',
      cell: ({ row }) => {
        return (
          <div className='text-right font-semibold'>
            {(
              row.original.type?.price *
              cart?.itemList?.find(
                (product) =>
                  product.productId === row.original._id &&
                  product.typeId === row.original.type?.typeId
              )?.quantity
            ).toLocaleString('vi-VN')}
            <sup>đ</sup>
          </div>
        )
      },
      size: 80
    },
    {
      header: <div className='text-right'>Thao tác</div>,
      accessorKey: 'actions',
      cell: ({ row }) => (
        <div className='flex items-center justify-end gap-1'>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className='hover:bg-red-200 hover:text-red-500 p-1.5 rounded-md cursor-pointer transition-all hover:ease-in-out hover:duration-300'>
                <Trash2Icon className='size-4' />
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
                <AlertDialogDescription>
                  Hành động này sẽ không thể khôi phục.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDeleteItemCart(row.original)}
                >
                  Xóa
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <div
            className='hover:bg-gray-200 p-1.5 rounded-md cursor-pointer transition-all hover:ease-in-out hover:duration-300'
            onClick={() => navigate(`/buyer/product/${row.original._id}`)}
          >
            <EllipsisIcon className='size-4' />
          </div>
        </div>
      ),
      size: 80
    }
  ]

  const [grouping, setGrouping] = useState(['sellerId'])

  const table = useReactTable({
    data: cart?.fullProducts || [],
    columns,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      grouping,
      expanded: true,
      columnVisibility: {
        sellerId: false
      }
    },
    onGroupingChange: setGrouping
  })

  const totalPrice = () => {
    if (!cart) return 0
    const rows = table.getRowModel().rows
    const result = rows.reduce((sum, row) => {
      let temp = 0
      if (row.getIsSelected() && !row.getIsGrouped()) {
        temp +=
          row.original.type.price *
          cart.itemList.find(
            (product) =>
              product.productId === row.original._id &&
              product.typeId === row.original.type.typeId
          ).quantity
      }
      return sum + temp
    }, 0)
    return result
  }

  const handleCheckout = () => {
    const rows = table.getRowModel().rows
    const selectedRows = rows
      .filter((row) => row.getIsSelected())
      .map((row) => ({
        ...row.original,
        quantity: cart.itemList[row.index].quantity
      }))
    if (!selectedRows.length) {
      toast.error('Bạn chưa chọn sản phẩm!')
      return
    }

    if (!currentUser) {
      toast.error('Bạn phải đăng nhập để có thể thực hiện thanh toán!', {
        position: 'top-right'
      })
      return
    }
    navigate('/buyer/checkout', { state: { selectedRows: selectedRows } })
  }

  return (
    <div className='container mx-auto'>
      <div className='grid grid-cols-4 gap-5 relative max-h-full my-4'>
        <div className='col-span-3 py-4 h-fit'>
          <div className='font-semibold text-2xl text-mainColor2-800 mb-6'>
            Giỏ Hàng Của Bạn
          </div>
          {!cart || !cart?.itemList?.length ? (
            <p>Giỏ hàng của bạn đang trống.</p>
          ) : (
            <div>
              <Table className='table-fixed'>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow
                      key={headerGroup.id}
                      className='hover:bg-transparent'
                    >
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead
                            key={header.id}
                            style={{ width: `${header.getSize()}px` }}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table?.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => {
                      if (row.getIsGrouped()) {
                        // Nếu là hàng nhóm, hiển thị tiêu đề nhóm
                        return (
                          <TableRow
                            key={row.id}
                            className='bg-mainColor1-100/50 hover:bg-mainColor1-100/50 cursor-pointer'
                            onClick={row.getToggleExpandedHandler()}
                          >
                            <TableCell colSpan={1}>
                              <Checkbox
                                checked={row.getIsSelected()}
                                onCheckedChange={(value) =>
                                  row.toggleSelected(!!value)
                                }
                                aria-label='Select row'
                              />
                            </TableCell>
                            <TableCell colSpan={columns.length - 3}>
                              <div className='flex items-center gap-2'>
                                <Store />
                                <span>
                                  {row.groupingColumnId}: {row.groupingValue}{' '}
                                  <b>({row.subRows.length} sản phẩm)</b>
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {row.getCanExpand() && (
                                <div className='flex justify-end'>
                                  {row.getIsExpanded() ? (
                                    <ChevronUp />
                                  ) : (
                                    <ChevronDown />
                                  )}
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        )
                      }
                      return (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && 'selected'}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      )
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className='h-24 text-center'
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter className='bg-transparent'>
                  <TableRow className='hover:bg-transparent'>
                    <TableCell colSpan={6}>Tổng thành tiền</TableCell>
                    <TableCell className='text-right'>
                      <div className='total-price text-right font-bold text-lg'>
                        {totalPrice()?.toLocaleString('vi-VN') || 0}
                        <sup>đ</sup>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          )}
        </div>
        <div className='col-span-1 bg-[#ECEEF6] sticky top-32 rounded-lg left-0 max-h-[80%] min-h-fit'>
          <div className='bg-white rounded-lg m-4 p-4'>
            <div className='uppercase tracking-wide text-sm font-semibold text-mainColor1-600 text-center py-4'>
              Tóm tắt
            </div>

            <Separator />

            <div className='flex justify-between my-4 text-sm'>
              <div className='flex flex-col gap-1.5'>
                <span>Tổng thành tiền</span>
                <span>Phí vận chuyển</span>
                <span>Giảm giá</span>
              </div>
              <div className='flex flex-col gap-1.5 items-end'>
                <span>
                  {totalPrice()?.toLocaleString('vi-VN') || 0}
                  <sup>đ</sup>
                </span>
                <span>
                  {(0).toLocaleString('vi-VN')}
                  <sup>đ</sup>
                </span>
                <span>
                  {(0).toLocaleString('vi-VN')}
                  <sup>đ</sup>
                </span>
              </div>
            </div>

            <Separator />

            <div className='my-4 flex items-end justify-between'>
              <span className='font-semibold text-mainColor1-600'>
                Tổng tiền
              </span>
              <span className='font-bold text-xl text-mainColor1-800'>
                {totalPrice()?.toLocaleString('vi-VN') || 0}
                <sup>đ</sup>
              </span>
            </div>

            <Button
              onClick={handleCheckout}
              className='bg-mainColor1-800 w-full text-white uppercase py-4 text-center rounded-xl font-bold hover:drop-shadow-xl hover:scale-[102%] hover:duration-300 hover:bg-mainColor1-600 transition-all'
            >
              Thanh toán
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
