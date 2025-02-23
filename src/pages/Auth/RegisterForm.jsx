import { Link, useNavigate } from 'react-router-dom'
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
import {
  EMAIL_RULE,
  PASSWORD_RULE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE_MESSAGE,
  EMAIL_RULE_MESSAGE
} from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { useForm } from 'react-hook-form'
import { registerUserAPI } from '~/apis'
import { toast } from 'react-toastify'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'

function RegisterForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const navigate = useNavigate()

  const submitRegister = (data) => {
    const { email, password, role } = data
    toast.promise(
      registerUserAPI({ email, password, role }),
      { pending: 'Đang đăng ký...' }
    ).then(user => {
      navigate(`/login?registeredEmail=${user.email}`)
    })
  }

  return (
    <form onSubmit={handleSubmit(submitRegister)}>
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
            ĐĂNG KÝ
          </Box>

          <Box sx={{ padding: '1em 1em 1em 1em' }}>
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
              <FieldErrorAlert errors={errors} fieldName={'password'}/>
            </Box>

            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label="Nhập Mật khẩu Xác nhận..."
                type="password"
                variant="outlined"
                error={!!errors['password_confirmation']}
                {...register('password_confirmation', {
                  validate: (value) => {
                    if (value === watch('password')) return true
                    return 'Mật khẩu Xác nhận không trùng khớp!'
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={'password_confirmation'}/>
            </Box>

            <Box sx={{ marginTop: '1em' }}>
              <FormLabel id="role-radio">Vai trò:</FormLabel>
              <RadioGroup row aria-labelledby="role-radio" name='role'>
                <FormControlLabel
                  value="buyer"
                  control={
                    <Radio {...register('role', { required: FIELD_REQUIRED_MESSAGE })}/>
                  }
                  label="Người mua"
                />
                <FormControlLabel
                  value="seller"
                  control={<Radio {...register('role', { required: FIELD_REQUIRED_MESSAGE })}/>
                  }
                  label="Người bán"
                />
                <FormControlLabel
                  value="admin"
                  control={
                    <Radio {...register('role', { required: FIELD_REQUIRED_MESSAGE })}/>
                  }
                  label="Quản trị viên"
                />
              </RadioGroup>
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
              Đăng kí
            </Button>
          </CardActions>

          <Box sx={{ padding: '1em 1em 1em 1em', textAlign: 'center' }}>
            <Typography>Đã có tài khoản?</Typography>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}>Đăng nhập!</Typography>
            </Link>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  )
}

export default RegisterForm
