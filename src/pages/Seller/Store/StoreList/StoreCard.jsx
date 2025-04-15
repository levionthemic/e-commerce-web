import { Card, CardContent } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Package, DollarSign, CalendarDays } from 'lucide-react'

const statusColor = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-700',
  pending: 'bg-yellow-100 text-yellow-700'
}

export default function StoreCard({
  logoUrl,
  name,
  status,
  createdAt,
  productCount,
  revenue,
  onView,
  onEdit
}) {
  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
      <CardContent className="p-4 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={logoUrl}
              alt={name}
              className="w-12 h-12 rounded-lg object-cover border"
            />
            <div>
              <h2 className="text-lg font-semibold">{name}</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                {createdAt}
              </p>
            </div>
          </div>

          <Badge className={statusColor[status]}>
            {status === 'active'
              ? 'Đang hoạt động'
              : status === 'inactive'
                ? 'Tạm dừng'
                : 'Chờ duyệt'}
          </Badge>
        </div>

        {/* Info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground px-1">
          <div className="flex items-center gap-1">
            <Package className="w-4 h-4" />
            <span>{productCount} sản phẩm</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>{revenue}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 justify-end">
          <Button variant="outline" size="sm" onClick={onEdit}>
            Chỉnh sửa
          </Button>
          <Button size="sm" onClick={onView}>
            Xem chi tiết
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
