import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrentCartAPI, selectCurrentCart } from '~/redux/cart/cartSlice'

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

function CartPage() {
  const dispatch = useDispatch()
  const cart = useSelector(selectCurrentCart)

  useEffect(() => {
    dispatch(fetchCurrentCartAPI())
  }, [dispatch])


  // const showUpdateButton = (e, temp, indexRow) => {
  //   const updateButton =
  //     e.target.parentElement.parentElement.nextSibling.nextSibling.querySelector(
  //       '.delete-btn-1:nth-child(2)'
  //     )
  //   if (temp[indexRow] !== cart[indexRow].quantity) {
  //     updateButton.classList.remove('d-none')
  //   } else {
  //     updateButton.classList.add('d-none')
  //   }
  // }

  // // const handleIncreaseQuantity = (e) => {
  // //   const indexRow =
  // //     e.target.parentElement.parentElement.parentElement.getAttribute(
  // //       'data-row-key'
  // //     )
  // //   let temp = [...quantities]
  // //   temp[indexRow]++
  // //   showUpdateButton(e, temp, indexRow)
  // //   setQuantities(temp)
  // // }

  // // const handleDecreaseQuantity = (e) => {
  // //   const indexRow =
  // //     e.target.parentElement.parentElement.parentElement.getAttribute(
  // //       'data-row-key'
  // //     )
  // //   let temp = [...quantities]
  // //   temp[indexRow] = Math.max(temp[indexRow] - 1, 1)
  // //   showUpdateButton(e, temp, indexRow)
  // //   setQuantities(temp)
  // // }

  // // const handleDelete = (e) => {
  // //   const indexRow =
  // //     e.currentTarget.parentElement.parentElement.parentElement.getAttribute(
  // //       'data-row-key'
  // //     )
  // //   Swal.fire({
  // //     icon: 'warning',
  // //     showCancelButton: true,
  // //     showConfirmButton: true,
  // //     title: 'Cảnh báo!',
  // //     text: 'Bạn có chắc chắn muốn xóa?',
  // //     confirmButtonText: 'Xóa',
  // //     cancelButtonText: 'Hủy'
  // //   }).then((res) => {
  // //     if (res.isConfirmed) {
  // //       axiosApi
  // //         .post('/api/v1/cart/delete', {
  // //           cartId: localStorage.getItem('cartId'),
  // //           productId: cart[indexRow].id
  // //         })
  // //         .then(() => {
  // //           Swal.fire({
  // //             toast: true,
  // //             position: 'top-end',
  // //             showConfirmButton: false,
  // //             timer: 1500,
  // //             timerProgressBar: true,
  // //             didOpen: (toast) => {
  // //               toast.onmouseenter = Swal.stopTimer
  // //               toast.onmouseleave = Swal.resumeTimer
  // //             },
  // //             icon: 'success',
  // //             title: 'Xóa sản phẩm khỏi giỏ hàng thành công!'
  // //           })
  // //           dispatch(decreaseCartQuantity(1))
  // //         })
  // //         .catch((error) => {
  // //           console.log(error)
  // //         })
  // //     }
  // //   })
  // // }

  // // const handleUpdateQuantity = (e) => {
  // //   const indexRow =
  // //     e.currentTarget.parentElement.parentElement.parentElement.getAttribute(
  // //       'data-row-key'
  // //     )
  // //   const cartId = localStorage.getItem('cartId')
  // //   const productId = cart[indexRow].id
  // //   const quantity = parseInt(
  // //     e.currentTarget.parentElement.parentElement.previousSibling
  // //       .previousSibling.firstChild.firstChild.nextSibling.innerText
  // //   )
  // //   Swal.fire({
  // //     icon: 'warning',
  // //     showCancelButton: true,
  // //     showConfirmButton: true,
  // //     title: 'Cảnh báo!',
  // //     text: 'Bạn có chắc chắn muốn cập nhật?',
  // //     confirmButtonText: 'Cập nhật',
  // //     cancelButtonText: 'Hủy'
  // //   }).then((res) => {
  // //     if (res.isConfirmed) {
  // //       axiosApi
  // //         .patch('/api/v1/cart/update', {
  // //           cartId: cartId,
  // //           productId: productId,
  // //           quantity: quantity
  // //         })
  // //         .then(() => {
  // //           Swal.fire({
  // //             toast: true,
  // //             position: 'top-end',
  // //             showConfirmButton: false,
  // //             timer: 1500,
  // //             timerProgressBar: true,
  // //             didOpen: (toast) => {
  // //               toast.onmouseenter = Swal.stopTimer
  // //               toast.onmouseleave = Swal.resumeTimer
  // //             },
  // //             icon: 'success',
  // //             title: 'Cập nhật số lượng thành công!'
  // //           })
  // //           const updateButton = document.querySelector(
  // //             '.delete-btn-1:last-child'
  // //           )
  // //           updateButton.classList.add('d-none')
  // //           cart[indexRow].quantity = quantity
  // //           setCartList(cart)
  // //         })
  // //         .catch((error) => {
  // //           console.log(error)
  // //         })
  // //     }
  // //   })
  // // }


  // const handleSelectRow = (rowIndex, isSelected) => {
  //   if (isSelected) {
  //     setSelectedRows((prev) => [...prev, rowIndex]) // Thêm sản phẩm vào danh sách được chọn
  //   } else {
  //     setSelectedRows((prev) => prev.filter((index) => index !== rowIndex)) // Bỏ sản phẩm khỏi danh sách được chọn
  //   }
  // }
  // const columns = [
  //   {
  //     title: '',
  //     key: 'selected',
  //     dataIndex: 'selected',
  //     render: (_, record, index) => (
  //       <input
  //         type="checkbox"
  //         checked={selectedRows.includes(index)} // Kiểm tra trạng thái tick
  //         onChange={(e) => handleSelectRow(index, e.target.checked)} // Gọi hàm khi tick hoặc bỏ tick
  //       />
  //     )
  //   },

  //   {
  //     title: 'Ảnh sản phẩm',
  //     key: 'thumbnail',
  //     dataIndex: 'thumbnail',
  //     render: (thumbnail) => (
  //       <img src={thumbnail} alt="" width={'100px'} height="100px" />
  //     )
  //   },
  //   {
  //     title: 'Thông tin sản phẩm',
  //     key: 'info',
  //     dataIndex: 'info',
  //     render: ([name, category, id]) => (
  //       <div>
  //         <h5
  //           className="inner-name"
  //           onClick={() => {
  //             navigate(`/detailproduct/${id}`)
  //           }}
  //         >
  //           {name}
  //         </h5>
  //         <p>
  //           Phân loại: <i>{category}</i>
  //         </p>
  //       </div>
  //     )
  //   },
  //   {
  //     title: 'Đơn giá',
  //     key: 'price',
  //     dataIndex: 'price',
  //     render: (price) => (
  //       <>
  //         {price.toLocaleString()}
  //         <sup>đ</sup>
  //       </>
  //     )
  //   },
  //   {
  //     title: 'Số lượng',
  //     key: 'quantity',
  //     dataIndex: 'quantity',
  //     render: (quantity) => (
  //       <div
  //         style={{
  //           display: 'flex',
  //           alignItems: 'center',
  //           justifyContent: 'center',
  //           gap: '15px',
  //           border: '1px solid #ddd',
  //           borderRadius: '5px',
  //           width: 'fit-content'
  //         }}
  //       >
  //         <button
  //           style={{
  //             border: 'none',
  //             borderRight: '1px solid #ddd',
  //             background: 'none',
  //             textAlign: 'center',
  //             fontSize: '18px',
  //             padding: '0px 7px'
  //           }}
  //           onClick={handleDecreaseQuantity}
  //         >
  //           -
  //         </button>
  //         <div>{quantity}</div>
  //         <button
  //           style={{
  //             border: 'none',
  //             borderLeft: '1px solid #ddd',
  //             background: 'none',
  //             textAlign: 'center',
  //             fontSize: '18px',
  //             padding: '0px 5px'
  //           }}
  //           onClick={handleIncreaseQuantity}
  //         >
  //           +
  //         </button>
  //       </div>
  //     )
  //   },
  //   {
  //     title: 'Thành tiền',
  //     key: 'total_price',
  //     dataIndex: 'total_price',
  //     render: (total_price) => (
  //       <div
  //         style={{
  //           fontSize: '18px',
  //           color: 'red',
  //           fontWeight: 500,
  //           width: '110px'
  //         }}
  //       >
  //         {total_price.toLocaleString()}
  //         <sup>đ</sup>
  //       </div>
  //     )
  //   },
  //   {
  //     title: '',
  //     key: 'actions',
  //     dataIndex: 'actions',
  //     render: () => (
  //       <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
  //         <IconButton
  //           variant='outlined'
  //           sx={{
  //             transition: 'all 0.3s linear',
  //             border: '1px solid #ddd',
  //             borderRadius: '8px',
  //             bgcolor: 'transparent',
  //             p: '2px 6px',
  //             fontSize: '18px',
  //             width: 'fit-content',
  //             '&:hover': {
  //               bgcolor: 'rgba(0, 0, 0, 0.1)',
  //               transition: 'all 0.3s linear'
  //             }
  //           }}
  //           onClick={handleDelete}>
  //           <DeleteOutlined />
  //         </IconButton>
  //         <IconButton
  //           sx={{
  //             transition: 'all 0.3s linear',
  //             border: '1px solid #ddd',
  //             borderRadius: '8px',
  //             bgcolor: 'transparent',
  //             p: '2px 6px',
  //             fontSize: '18px',
  //             width: 'fit-content',
  //             borderColor: 'rgb(255, 141, 141)',
  //             color: 'red',
  //             '&:hover': {
  //               bgcolor: 'rgba(255, 0, 0, 0.1)',
  //               transition: 'all 0.3s linear'
  //             }
  //           }}
  //           className="delete-btn-1 d-none"
  //           onClick={handleUpdateQuantity}>
  //           <DiffOutlined />
  //         </IconButton>
  //       </div>
  //     )
  //   }
  // ]

  // const data = cart.map((item, index) => ({
  //   key: index,
  //   selected: false,
  //   thumbnail: item.thumbnail_url,
  //   info: [item.name, item.categories.name, item.id],
  //   price: (
  //     item.original_price *
  //     (1 - item.discount_rate / 100)
  //   ).toLocaleString(),
  //   quantity: quantities[index],
  //   total_price:
  //     quantities[index] * item.original_price * (1 - item.discount_rate / 100)
  // }))

  const totalPrice = () => {
    return cart?.fullProducts?.reduce(
      (sum, product, index) => sum + product?.price * cart?.products[index]?.quantity,
      0)
  }

  return (
    <div className='container mx-auto'>
      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-4 py-4 h-[100vh]">
          <div className='font-semibold text-2xl text-mainColor2-800 mb-4'>Giỏ Hàng Của Bạn</div>
          {!cart || !cart?.products.length
            ? <p>Giỏ hàng của bạn đang trống.</p>
            : <div>
              <Table>
                <TableCaption>Danh sách các mặt hàng</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ảnh sản phẩm</TableHead>
                    <TableHead>Tên sản phẩm</TableHead>
                    <TableHead>Giá sản phẩm</TableHead>
                    <TableHead className='text-center'>Số lượng</TableHead>
                    <TableHead className="text-right">Thành tiền</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {cart?.fullProducts?.map((product, index) => (
                    <TableRow key={product._id}>
                      <TableCell>
                        <img
                          src={product?.thumbnailUrl}
                          alt={product?.name}
                          className='w-20 h-20'
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product?.name}</TableCell>
                      <TableCell>{product?.price.toLocaleString('vi-VN')}<sup>đ</sup></TableCell>
                      <TableCell className='text-center'>
                        <div className='flex items-center justify-between rounded-lg p-1'>
                          <RiSubtractFill
                            className='cursor-pointer text-xl hover:bg-mainColor2-800/40 rounded-md'
                          />
                          <input
                            value={cart?.products[index]?.quantity}
                            // onChange={}
                            readOnly
                            className='w-[30px] text-center mx-1.5 border-none outline-none text-md'
                          />
                          <IoMdAdd
                            className='cursor-pointer text-xl hover:bg-mainColor2-800/40 rounded-md'
                          />
                        </div>
                      </TableCell>
                      <TableCell className='text-right'>
                        {(product?.price * cart?.products[index]?.quantity).toLocaleString('vi-VN')}
                        <sup>đ</sup>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4} className='font-bold text-mainColor2-800'>Tổng thành tiền</TableCell>
                    <TableCell className="text-right font-bold text-mainColor2-800 text-lg">
                      {totalPrice().toLocaleString('vi-VN')}
                      <sup>đ</sup>
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
                <span>{totalPrice().toLocaleString('vi-VN')}<sup>đ</sup></span>
                <span>{(0).toLocaleString('vi-VN')}<sup>đ</sup></span>
                <span>{(0).toLocaleString('vi-VN')}<sup>đ</sup></span>
              </div>
            </div>

            <Separator />

            <div className="my-4 flex items-end justify-between">
              <span className='font-semibold text-mainColor1-600'>Tổng tiền</span>
              <span className='font-bold text-xl text-mainColor1-800'>{totalPrice().toLocaleString('vi-VN')}<sup>đ</sup></span>
            </div>

            <Link to='#' className='bg-mainColor1-800 w-full block text-white uppercase py-4 text-center rounded-xl font-bold hover:drop-shadow-xl hover:scale-[102%] hover:duration-300 hover:bg-mainColor1-600 transition-all'>Thanh toán</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
