import { Form, Input, Button, Typography, Divider, Space } from 'antd'
import {
  GoogleOutlined,
  FacebookOutlined,
  MailOutlined,
  LockOutlined
} from '@ant-design/icons'
import bg from '~/assets/bg-admin-login.jpg'
import {
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '~/utils/validators'
import { asyncHandler } from '~/utils/asyncHandler'
import { useDispatch } from 'react-redux'
import { loginUserAPI } from '~/redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { PAGE_TYPE } from '~/utils/constants'
import { getMessageApi } from '~/utils/messageInstance'
import { useState } from 'react'

const { Title, Text, Link } = Typography

const LoginAdmin = () => {
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = async (values) => {
    setLoading(true)

    const hide = getMessageApi().loading('Đang xử lý...', 0)

    asyncHandler(
      dispatch(
        loginUserAPI({ ...values, role: PAGE_TYPE.ADMIN, rememberMe: false })
      )
    )
      .then(([res]) => {
        hide()
        if (res) {
          getMessageApi().success('Đăng nhập thành công')
          navigate('/admin')
        }
      })
      .finally(() => setLoading(false))
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <Title level={3} style={{ textAlign: 'center' }}>
          LEVI
        </Title>
        <Text
          type='secondary'
          style={{ display: 'block', textAlign: 'center', marginBottom: 24 }}
        >
          Bạn chưa tạo tài khoản? <Link>Đăng ký</Link>
        </Text>

        <Form layout='vertical' onFinish={onFinish}>
          <Space direction='vertical' style={{ width: '100%' }}>
            <Form.Item
              hasFeedback
              label='Email'
              name='email'
              rules={[
                {
                  required: true,
                  message: FIELD_REQUIRED_MESSAGE
                },
                {
                  type: 'email',
                  message: EMAIL_RULE_MESSAGE
                }
              ]}
              validateDebounce={1000}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder='admin@example.com'
              />
            </Form.Item>

            <Form.Item
              label='Mật khẩu'
              name='password'
              rules={[
                {
                  required: true,
                  message: FIELD_REQUIRED_MESSAGE
                },
                {
                  pattern: new RegExp(PASSWORD_RULE),
                  message: PASSWORD_RULE_MESSAGE
                }
              ]}
              hasFeedback
              validateDebounce={200}
            >
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                block
                size='large'
                loading={loading}
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Space>
        </Form>

        <Divider plain>hoặc đăng nhập với</Divider>

        <Space
          direction='horizontal'
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <Button icon={<GoogleOutlined />} shape='round'>
            Google
          </Button>
          <Button icon={<FacebookOutlined />} shape='round'>
            Facebook
          </Button>
        </Space>
      </div>
    </div>
  )
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${bg})`,
    fontFamily: '"Roboto", sans-serif'
  },
  card: {
    width: 400,
    padding: 32,
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
  }
}

export default LoginAdmin
