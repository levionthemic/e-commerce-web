import { useDispatch, useSelector } from 'react-redux'
import { logoutUserAPI, selectCurrentUser } from '~/redux/user/userSlice'
import { TbBellRinging2 } from 'react-icons/tb'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Popconfirm } from 'antd'
import { Input } from 'antd'
import { Link } from 'react-router-dom'
import { getMessageApi } from '~/utils/messageInstance'
import { asyncHandler } from '~/utils/asyncHandler'
const { Search } = Input

function HeaderAdmin() {
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    const hide = getMessageApi().loading('Đang đăng xuất...', 0)
    const [res] = await asyncHandler(dispatch(logoutUserAPI()))

    if (res) {
      hide()
      getMessageApi().success('Đăng xuất thành công!')
    }
  }

  const items = [
    {
      label: <Link to='/admin/profile'>Hồ sơ tài khoản</Link>,
      key: '1'
    },
    {
      label: 'Cài đặt',
      key: '2'
    },
    {
      type: 'divider'
    },
    {
      label: (
        <Popconfirm
          title='Cảnh báo!'
          description='Bạn có chắc chắn muốn đăng xuất?'
          onConfirm={handleLogout}
          okText='Đăng xuất'
          cancelText='Hủy'
        >
          <div
            className='text-red-500 hover:font-bold'
            onClick={(e) => e.stopPropagation()}
          >
            Đăng xuất
          </div>
        </Popconfirm>
      ),

      key: '3'
    }
  ]

  const handleSearch = (data) => {
    console.log(data)
  }

  return (
    <div className='grid grid-cols-4 p-4 gap-8 w-full'>
      <div className='col-span-3 flex items-center justify-between'>
        <Search placeholder='Search...' onSearch={handleSearch} />
      </div>
      <div className='col-span-1'>
        <Dropdown menu={{ items }} trigger={['click']}>
          <div className='flex items-center gap-3 cursor-pointer hover:bg-gray-100 py-2 px-4 rounded-lg'>
            <Avatar icon={<UserOutlined />} />
            <div>
              <div className='text-sm font-semibold'>{currentUser?.name}</div>
              <div className='text-xs text-gray-400'>Quản trị viên</div>
            </div>
          </div>
        </Dropdown>
        {/* 
        <div className='bg-white p-2 rounded-lg'>
          <TbBellRinging2 className='text-xl text-gray-400' />
        </div> */}
      </div>
    </div>
  )
}

export default HeaderAdmin
