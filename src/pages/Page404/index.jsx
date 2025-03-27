import { useNavigate } from 'react-router-dom'
import { Button } from '~/components/ui/button'

function Page404() {
  const navigate = useNavigate()
  return (
    <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">404 Page Not Found</h1>
          <p className="text-gray-500">Xin lỗi, chúng tôi không tìm thấy trang web ứng với URL của bạn.</p>
        </div>
        <Button onClick={() => navigate(-1, { replace: true })}>
          Quay lại
        </Button>
      </div>
    </div>
  )
}

export default Page404
