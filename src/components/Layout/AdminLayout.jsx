import { Outlet } from 'react-router-dom'
import { PAGE_TYPE } from '~/utils/constants'
import { Button, Layout, theme } from 'antd'
import { useState } from 'react'
import AdminSidebar from '../Sidebar/AdminSidebar'
import LeviHeader from '~/components/Header/Header'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

const { Header, Sider, Content } = Layout

const siderStyle = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable'
}

function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)

  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  return (
    <Layout style={{ minHeight: '100vh' }} hasSider>
      <Sider
        style={siderStyle}
        breakpoint='lg'
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        trigger={null}
      >
        <AdminSidebar collapsed={collapsed} />
      </Sider>
      <Layout>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            padding: 0,
            background: colorBgContainer
          }}
        >
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64
            }}
          />
          <LeviHeader type={PAGE_TYPE.ADMIN} />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
