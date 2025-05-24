/* eslint-disable react-hooks/exhaustive-deps */
import { cn } from '~/lib/utils'
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
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  Pagination,
  PaginationContent,
  PaginationItem
} from '~/components/ui/pagination'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '~/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '~/components/ui/table'
import {
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import {
  ChevronDownIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleAlertIcon,
  CircleXIcon,
  Columns3Icon,
  EllipsisIcon,
  FilterIcon,
  ListFilterIcon,
  TrashIcon
} from 'lucide-react'
import { useId, useMemo, useRef, useState } from 'react'

// Custom filter function for multi-column searching
const multiColumnFilterFn = (row, columnId, filterValue) => {
  const searchableRowContent =
    `${row.original._id} ${row.original.email}`.toLowerCase()
  const searchTerm = (filterValue ?? '').toLowerCase()
  return searchableRowContent.includes(searchTerm)
}

const statusFilterFn = (row, columnId, filterValue) => {
  if (!filterValue?.length) return true
  const status = row.getValue(columnId)
  return filterValue.includes(status)
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
    size: 20,
    enableSorting: false,
    enableHiding: false
  },
  {
    id: '_id',
    header: 'Mã đơn hàng',
    accessorKey: '_id',
    cell: ({ row }) => (
      <div className='font-medium text-ellipsis overflow-x-hidden'>
        {row.getValue('_id')}
      </div>
    ),
    filterFn: multiColumnFilterFn,
    enableHiding: false,
    size: 80
  },
  {
    id: 'sellerId',
    header: 'Người bán',
    accessorKey: 'sellerId',
    cell: ({ row }) => (
      <div className='font-medium text-ellipsis overflow-x-hidden'>
        {row.getValue('sellerId')}
      </div>
    ),
    size: 80
  },
  {
    id: 'itemList',
    header: 'Danh sách sản phẩm',
    accessorKey: 'itemList',
    size: 200,
    cell: ({ row }) => (
      <>
        {row
          .getValue('itemList')
          .slice(0, 2)
          .map((item, index) => (
            <div
              key={item._id}
              className={`flex items-center gap-2 ${index != row.getValue('itemList').length - 1 && 'mb-2'}`}
            >
              <div>
                <img
                  src={item.avatar}
                  alt=''
                  className='size-10 rounded-md border border-gray-300 p-0.5'
                />
              </div>
              <div className='flex-1'>
                <div className='line-clamp-1'>{item.productName}</div>
                <div className='line-clamp-1 text-xs text-muted-foreground'>
                  Loại: {item.typeName}
                </div>
              </div>
            </div>
          ))}
        {row.getValue('itemList').length > 2 && (
          <div className='mt-2 text-muted-foreground'>
            + {row.getValue('itemList').length - 2} sản phẩm
          </div>
        )}
      </>
    )
  },
  {
    id: 'shippingMethod',
    header: <div className='text-center flex-1'>Đơn vị vận chuyển</div>,
    accessorKey: 'shippingMethod',
    size: 80,
    cell: ({ row }) => (
      <div className='text-center'>
        {row.getValue('shippingMethod') === 'ghn'
          ? 'Giao hàng nhanh'
          : 'Giao hàng tiết kiệm'}
      </div>
    )
  },
  {
    id: 'buyerAddress',
    header: 'Địa chỉ nhận hàng',
    accessorKey: 'buyerAddress'
  },
  {
    id: 'status',
    header: <div className='text-center flex-1'>Trạng thái</div>,
    accessorKey: 'status',
    cell: ({ row }) => (
      <div className='flex justify-center'>
        <Badge
          className={cn(
            row.getValue('status') === 'Inactive' &&
              'bg-muted-foreground/60 text-primary-foreground'
          )}
        >
          {row.getValue('status')}
        </Badge>
      </div>
    ),
    size: 70,
    filterFn: statusFilterFn
  },
  {
    id: 'finalPrice',
    header: 'Giá trị đơn hàng',
    accessorKey: 'finalPrice',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('finalPrice'))
      const formatted = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(amount)
      return <div className='font-bold text-lg text-red-500'>{formatted}</div>
    },
    size: 80
  },
  {
    id: 'actions',
    header: <div className='text-center'>Thao tác</div>,
    cell: <RowActions />,
    size: 30,
    enableHiding: false
  }
]

export default function OrderTable({ data, setData }) {
  const id = useId()
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })
  const inputRef = useRef(null)

  const [sorting, setSorting] = useState([
    {
      id: '_id',
      desc: false
    }
  ])

  const handleDeleteRows = () => {
    const selectedRows = table.getSelectedRowModel().rows
    const updatedData = data.filter(
      (item) => !selectedRows.some((row) => row.original._id === item._id)
    )
    setData(updatedData)
    table.resetRowSelection()
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility
    }
  })

  // Get unique status values
  const uniqueStatusValues = useMemo(() => {
    const statusColumn = table.getColumn('status')

    if (!statusColumn) return []

    const values = Array.from(statusColumn.getFacetedUniqueValues().keys())

    return values.sort()
  }, [data])

  // Get counts for each status
  const statusCounts = useMemo(() => {
    const statusColumn = table.getColumn('status')
    if (!statusColumn) return new Map()
    return statusColumn.getFacetedUniqueValues()
  }, [data])

  const selectedStatuses = useMemo(() => {
    const filterValue = table.getColumn('status')?.getFilterValue()
    return filterValue ?? []
  }, [data])

  const handleStatusChange = (checked, value) => {
    const filterValue = table.getColumn('status')?.getFilterValue()
    const newFilterValue = filterValue ? [...filterValue] : []

    if (checked) {
      newFilterValue.push(value)
    } else {
      const index = newFilterValue.indexOf(value)
      if (index > -1) {
        newFilterValue.splice(index, 1)
      }
    }

    table
      .getColumn('status')
      ?.setFilterValue(newFilterValue.length ? newFilterValue : undefined)
  }

  return (
    <div className='space-y-4'>
      {/* Filters */}
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div className='flex items-center gap-3'>
          {/* Filter by orderId */}
          <div className='relative'>
            <Input
              id={`${id}-input`}
              ref={inputRef}
              className={cn(
                'peer min-w-60 ps-9',
                Boolean(table.getColumn('_id')?.getFilterValue()) && 'pe-9'
              )}
              value={table.getColumn('_id')?.getFilterValue() ?? ''}
              onChange={(e) =>
                table.getColumn('_id')?.setFilterValue(e.target.value)
              }
              placeholder='Lọc theo mã đơn hàng...'
              type='text'
              aria-label='Lọc theo mã đơn hàng'
            />
            <div className='text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50'>
              <ListFilterIcon size={16} aria-hidden='true' />
            </div>
            {Boolean(table.getColumn('_id')?.getFilterValue()) && (
              <button
                className='text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                aria-label='Clear filter'
                onClick={() => {
                  table.getColumn('_id')?.setFilterValue('')
                  if (inputRef.current) {
                    inputRef.current.focus()
                  }
                }}
              >
                <CircleXIcon size={16} aria-hidden='true' />
              </button>
            )}
          </div>
          {/* Filter by status */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='outline'>
                <FilterIcon
                  className='-ms-1 opacity-60'
                  size={16}
                  aria-hidden='true'
                />
                Trạng thái
                {selectedStatuses.length > 0 && (
                  <span className='bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium'>
                    {selectedStatuses.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto min-w-36 p-3' align='start'>
              <div className='space-y-3'>
                <div className='text-muted-foreground text-xs font-medium'>
                  Bộ lọc
                </div>
                <div className='space-y-3'>
                  {uniqueStatusValues.map((value, i) => (
                    <div key={value} className='flex items-center gap-2'>
                      <Checkbox
                        id={`${id}-${i}`}
                        checked={selectedStatuses.includes(value)}
                        onCheckedChange={(checked) =>
                          handleStatusChange(checked, value)
                        }
                      />
                      <Label
                        htmlFor={`${id}-${i}`}
                        className='flex grow justify-between gap-2 font-normal'
                      >
                        {value}{' '}
                        <span className='text-muted-foreground ms-2 text-xs'>
                          {statusCounts.get(value)}
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          {/* Toggle columns visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline'>
                <Columns3Icon
                  className='-ms-1 opacity-60'
                  size={16}
                  aria-hidden='true'
                />
                Hiển thị
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Hiển thị cột</DropdownMenuLabel>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                      onSelect={(event) => event.preventDefault()}
                    >
                      {column.columnDef.header?.props?.children ||
                        column.columnDef.header}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='flex items-center gap-3'>
          {/* Delete button */}
          {table.getSelectedRowModel().rows.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className='ml-auto' variant='outline'>
                  <TrashIcon
                    className='-ms-1 opacity-60'
                    size={16}
                    aria-hidden='true'
                  />
                  Delete
                  <span className='bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium'>
                    {table.getSelectedRowModel().rows.length}
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <div className='flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4'>
                  <div
                    className='flex size-9 shrink-0 items-center justify-center rounded-full border'
                    aria-hidden='true'
                  >
                    <CircleAlertIcon className='opacity-80' size={16} />
                  </div>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete{' '}
                      {table.getSelectedRowModel().rows.length} selected{' '}
                      {table.getSelectedRowModel().rows.length === 1
                        ? 'row'
                        : 'rows'}
                      .
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteRows}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>

      {/* Table */}
      <div className='bg-background overflow-hidden rounded-md border'>
        <Table className='table-fixed'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='hover:bg-transparent'>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      // style={{ width: `${header.getSize()}px` }}
                      className='h-11'
                      {...{
                        colSpan: header.colSpan,
                        style: {
                          width: header.getSize()
                        }
                      }}
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <div
                          className={cn(
                            header.column.getCanSort() &&
                              'flex h-full cursor-pointer items-center justify-between gap-2 select-none'
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            // Enhanced keyboard handling for sorting
                            if (
                              header.column.getCanSort() &&
                              (e.key === 'Enter' || e.key === ' ')
                            ) {
                              e.preventDefault()
                              header.column.getToggleSortingHandler()?.(e)
                            }
                          }}
                          tabIndex={header.column.getCanSort() ? 0 : undefined}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: (
                              <ChevronUpIcon
                                className='shrink-0 opacity-60'
                                size={16}
                                aria-hidden='true'
                              />
                            ),
                            desc: (
                              <ChevronDownIcon
                                className='shrink-0 opacity-60'
                                size={16}
                                aria-hidden='true'
                              />
                            )
                          }[header.column.getIsSorted()] ?? null}
                        </div>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='last:py-0'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  Không có dữ liệu.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-between gap-8'>
        {/* Results per page */}
        <div className='flex items-center gap-3'>
          <Label htmlFor={id} className='max-sm:sr-only'>
            Số dòng / trang
          </Label>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger id={id} className='w-fit whitespace-nowrap'>
              <SelectValue placeholder='Select number of results' />
            </SelectTrigger>
            <SelectContent className='[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2'>
              {[5, 10, 25, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Page number information */}
        <div className='text-muted-foreground flex grow justify-end text-sm whitespace-nowrap'>
          <p
            className='text-muted-foreground text-sm whitespace-nowrap'
            aria-live='polite'
          >
            <span className='text-foreground'>
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
              -
              {Math.min(
                Math.max(
                  table.getState().pagination.pageIndex *
                    table.getState().pagination.pageSize +
                    table.getState().pagination.pageSize,
                  0
                ),
                table.getRowCount()
              )}
            </span>{' '}
            của{' '}
            <span className='text-foreground'>
              {table.getRowCount().toString()}
            </span>
          </p>
        </div>

        {/* Pagination buttons */}
        <div>
          <Pagination>
            <PaginationContent>
              {/* First page button */}
              <PaginationItem>
                <Button
                  size='icon'
                  variant='outline'
                  className='disabled:pointer-events-none disabled:opacity-50'
                  onClick={() => table.firstPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label='Go to first page'
                >
                  <ChevronFirstIcon size={16} aria-hidden='true' />
                </Button>
              </PaginationItem>
              {/* Previous page button */}
              <PaginationItem>
                <Button
                  size='icon'
                  variant='outline'
                  className='disabled:pointer-events-none disabled:opacity-50'
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label='Go to previous page'
                >
                  <ChevronLeftIcon size={16} aria-hidden='true' />
                </Button>
              </PaginationItem>
              {/* Next page button */}
              <PaginationItem>
                <Button
                  size='icon'
                  variant='outline'
                  className='disabled:pointer-events-none disabled:opacity-50'
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label='Go to next page'
                >
                  <ChevronRightIcon size={16} aria-hidden='true' />
                </Button>
              </PaginationItem>
              {/* Last page button */}
              <PaginationItem>
                <Button
                  size='icon'
                  variant='outline'
                  className='disabled:pointer-events-none disabled:opacity-50'
                  onClick={() => table.lastPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label='Go to last page'
                >
                  <ChevronLastIcon size={16} aria-hidden='true' />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}

function RowActions() {
  return (
    <div className='flex justify-center'>
      <Button
        size='icon'
        variant='ghost'
        className='shadow-none'
        aria-label='Edit item'
      >
        <EllipsisIcon size={16} aria-hidden='true' />
      </Button>
    </div>
  )
}
