import { useNavigate } from 'react-router-dom'
import { Button } from '~/components/ui/button'

function Page401() {
  const navigate = useNavigate()
  return (
    <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">401 Unauthorized</h1>
          <p className="text-gray-500">Xin lỗi, bạn không có quyền truy cập đường link này.</p>
        </div>
        <Button onClick={() => navigate(-1, { replace: true })}>
          Quay lại
        </Button>
      </div>
    </div>
  )
}

export default Page401
