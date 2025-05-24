import {
  FileOutlined,
  HomeFilled,
  HomeOutlined,
  PaperClipOutlined,
  ProductOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Menu } from 'antd'

function getItem(label, key, icon, children, type) {
  return { key, icon, children, label, type }
}

const items = [
  getItem('Chính', 'g1', null, null, 'group'),
  getItem('Dashboard', '1', <HomeOutlined />),
  getItem('Quản lý sản phẩm', '2', <ProductOutlined />),
  getItem('Quản lý đơn hàng', 'sub1', <PaperClipOutlined />, [
    getItem('Danh sách đơn hàng', '3'),
    getItem('fds', '4'),
    getItem('Alex', '5')
  ]),
  getItem('Quản lý tài khoản', 'sub2', <UserOutlined />, [
    getItem('Team 1', '6'),
    getItem('Team 2', '7')
  ]),

  getItem('Chính', 'g2', null, null, 'group'),
  getItem('Cấu hình hệ thống', '8', <SettingOutlined />),
  getItem('Đăng xuất', '9', <FileOutlined />)
]

const handleSelect = ({ selectedKeys }) => {
  console.log(selectedKeys)
}

function AdminSidebar({ collapsed }) {
  return (
    <div>
      <div className='text-gray-200 text-3xl font-bold text-center mt-6 mb-8'>
        {collapsed ? <HomeFilled /> : 'ADMIN'}
      </div>
      <Menu
        theme='dark'
        defaultSelectedKeys={['1']}
        mode='inline'
        items={items}
        onSelect={handleSelect}
      />
    </div>
  )
}

export default AdminSidebar
