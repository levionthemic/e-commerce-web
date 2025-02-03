/* eslint-disable react/prop-types */
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import Rating from '@mui/material/Rating'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Divider } from '@mui/material'

function ProductItem({ product, loading, width }) {
  const navigate = useNavigate()

  if (loading) {
    // <Card className="product-card">
    //   <Skeleton height={160} />
    //   <Card.Body>
    //     <Card.Title>
    //       <Skeleton className="card-title" />
    //     </Card.Title>
    //     <Card.Text>
    //       <Skeleton className="product-price" />
    //     </Card.Text>
    //     <Card.Text>
    //       <Skeleton className="product-info" />
    //     </Card.Text>
    //     <Skeleton className="w-100 .btn" />
    //   </Card.Body>
    // </Card>
  }

  return (
    <Card
      onClick={() => {
        navigate(`/detailproduct/${product.id}`)
      }}
      sx={{ cursor: 'pointer', width: width }}
    >
      <CardMedia
        component="img"
        alt=""
        height="160"
        image={product?.thumbnail_url || '/images/default/default-product.png'}
      />
      <CardContent>
        <Typography
          component='div'
          sx={{
            fontSize: '0.95em',
            fontWeight: 500,
            color: '#333',
            marginBottom: '5px',
            height: '35px',
            lineHeight: '1.2',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {product?.name}
        </Typography>
        <Typography variant='p' sx={{
          fontSize: '1.1em',
          fontWeight: 'bold',
          color: '#ff4d4f',
          marginBottom: '5px',
          textAlign: 'justify'
        }}>
          {(
            product?.price *
                  (1 - product?.discount_rate / 100)
          ).toLocaleString()}
          <sup>đ</sup>
        </Typography>
        <Box sx={{
          fontSize: '0.85em',
          color: '#777',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          my: 1
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant='span'>{product?.rating_average || '0'}</Typography>
            <Rating
              size='small'
              name="rating-average"
              value={product?.rating_average || 0}
              precision={0.1}
              readOnly />
          </Box>

          <Typography variant='span'>| Đã bán: {product?.quantity_sold?.value || 0}</Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button size="small">Xem chi tiết</Button>
      </CardActions>
    </Card>


  )
}

export default memo(ProductItem)
