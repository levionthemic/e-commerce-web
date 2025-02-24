import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import LockIcon from '@mui/icons-material/Lock'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import { ReactComponent as WebIcon } from '~/assets/webicon.svg'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import Alert from '@mui/material/Alert'
import { Controller, useForm } from 'react-hook-form'
import {
  EMAIL_RULE,
  PASSWORD_RULE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE_MESSAGE,
  EMAIL_RULE_MESSAGE
} from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { useDispatch } from 'react-redux'
import { loginUserAPI } from '~/redux/user/userSlice'
import { toast } from 'react-toastify'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

import FormLabel from '@mui/material/FormLabel'
import { PAGE_TYPE } from '~/utils/constants'

function LoginForm() {
  const { register, handleSubmit, formState: { errors }, control } = useForm()

  const [searchParams] = useSearchParams()
  const registeredEmail = searchParams.get('registeredEmail')
  const verifiedEmail = searchParams.get('verifiedEmail')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitLogIn = (data) => {
    const { email, password, role } = data
    toast.promise(
      dispatch(loginUserAPI({ email, password, role })),
      { pending: 'Đang đăng nhập...' }
    ).then(res => {
      // Đoạn này phải kiểm tra không có lỗi (login thành công) thì mới redirect về route '/'
      if (!res.error) navigate('/')
    })
  }

  return (
    <form onSubmit={handleSubmit(submitLogIn)}>
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <MuiCard sx={{ minWidth: 400, maxWidth: 400 }}>
          <Box sx={{
            margin: '1em',
            display: 'flex',
            justifyContent: 'center',
            gap: 1
          }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}><LockIcon /></Avatar>
            <Avatar sx={{ bgcolor: 'primary.main' }}><WebIcon /></Avatar>
          </Box>

          <Box sx={{ marginTop: '1em', display: 'flex', justifyContent: 'center', color: theme => theme.palette.grey[500] }}>
            Chào mừng bạn đến với website của chúng tôi!
          </Box>

          <Box sx={{ marginTop: '1em', display: 'flex', justifyContent: 'center', color: theme => theme.palette.grey[900], fontSize: '1.5rem' }}>
            ĐĂNG NHẬP
          </Box>

          <Box sx={{ marginTop: '1em', display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '0 1em' }}>
            {verifiedEmail &&
              <Alert severity="success" sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
                Email của bạn:&nbsp;
                <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{verifiedEmail}</Typography>
                &nbsp;đã được xác thực.<br />Ngay bây giờ bạn có thể đăng nhập để có thể trải nghiệm dịch vụ của chúng tôi! Chúc bạn một ngày tốt lành!
              </Alert>
            }
            {registeredEmail &&
              <Alert severity="info" sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
              Chúng tôi đã gửi 1 email đến email:&nbsp;
                <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{registeredEmail}</Typography>
                <br />Hãy kiểm tra và xác thực trước khi đăng nhập!
              </Alert>
            }
          </Box>

          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                autoComplete="nope"
                autoFocus
                fullWidth
                label="Nhập Email..."
                type="text"
                variant="outlined"
                error={!!errors['email']} // Dùng prop này để hiện viền đỏ khi có error
                {...register('email', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: EMAIL_RULE,
                    message: EMAIL_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={'email'}/>
            </Box>

            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label="Nhập Mật khẩu..."
                type="password"
                variant="outlined"
                error={!!errors['password']}
                {...register('password', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={'password'} />
            </Box>

            <Box sx={{ marginTop: '1em' }}>
              <FormLabel id="role-radio">Vai trò:</FormLabel>
              <Controller
                name="role"
                defaultValue={PAGE_TYPE.BUYER}
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    row
                    onChange={(event, value) => field.onChange(value)}
                    value={field.value}
                  >
                    <FormControlLabel
                      value={PAGE_TYPE.BUYER}
                      control={<Radio size="small" />}
                      label="Người mua"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value={PAGE_TYPE.SELLER}
                      control={<Radio size="small" />}
                      label="Người bán"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value={PAGE_TYPE.ADMIN}
                      control={<Radio size="small" />}
                      label="Quản trị viên"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                )}
              />
              <FieldErrorAlert errors={errors} fieldName={'role'} />
            </Box>
          </Box>

          <CardActions sx={{ padding: '0 1em 1em 1em' }}>
            <Button
              className='interceptor-loading'
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Login
            </Button>
          </CardActions>

          <Box sx={{ padding: '1em 1em 1em 1em', textAlign: 'center' }}>
            <Typography>Lần đầu đăng nhập?</Typography>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}>Tạo tài khoản!</Typography>
            </Link>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  )
}

export default LoginForm
