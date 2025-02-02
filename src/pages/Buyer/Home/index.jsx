/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import { memo, useEffect, useState } from 'react'
import banner from '~/assets/images/banner.png'
import 'react-multi-carousel/lib/styles.css'
import { axiosApi } from '~/services/ApiService'
import ProductItem from '~/components/ProductItem/ProductItem'
import { animateScroll } from 'react-scroll'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Typography } from '@mui/material'
import styled from 'styled-components'
import Carousel from 'react-multi-carousel'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import HighQualityIcon from '@mui/icons-material/HighQuality'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1536 },
    items: 6
  },
  desktop: {
    breakpoint: { max: 1536, min: 1024 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
}
const Div = ({ className, children }) => (
  <div className={className}>
    <Carousel responsive={responsive} infinite autoPlay>
      {children}
    </Carousel>
  </div>
)
const CustomCarousel = styled(Div)`
  .react-multi-carousel-item {
    display: flex;
    justify-content: center;
  }

  .react-multiple-carousel__arrow {
    background: rgba(0, 0, 0, 0.1);
    min-width: 20px;
    min-height: 20px;
    border-radius: 50%;
  }

  .react-multiple-carousel__arrow--left {
    left: 0;
  }

  .react-multiple-carousel__arrow--right {
    right: 0;
  }

  .react-multiple-carousel__arrow::before {
    font-size: 10px;
  }
`
function Home() {
  const [bestSellingProducts, setBestSellingProducts] = useState([])
  const [recommendedProducts, setRecommendedProducts] = useState([])
  const [productsDisplayed, setProductsDisplayed] = useState(30)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    axiosApi
      .get('/api/v1/products')
      .then((res) => {
        const sortedProducts = res.data.data
          .filter(
            (product) =>
              product.quantity_sold && product.quantity_sold.value > 0
          )
          .sort((a, b) => b.quantity_sold.value - a.quantity_sold.value)
          .slice(0, 50)
        setBestSellingProducts(sortedProducts)
      })
      .catch((error) => {
        console.error('Có lỗi khi lấy dữ liệu sản phẩm:', error)
        window.location.reload()
      })
  }, [])

  useEffect(() => {
    axiosApi
      .get('/api/v1/products')
      .then((res) => {
        const sortedProducts = res.data.data
          .filter(
            (product) =>
              product.rating_average !== null &&
              product.rating_average !== undefined
          )
          .sort((a, b) => b.rating_average - a.rating_average)

        setRecommendedProducts(sortedProducts)
      })
      .catch((error) => {
        console.error('Có lỗi khi lấy dữ liệu sản phẩm:', error)
        window.location.reload()
      })
  }, [])

  useEffect(() => {
    axiosApi
      .get('/api/v1/category')
      .then((res) => {
        setCategories(res.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const loadMoreRecommendedProducts = () => {
    animateScroll.scrollToBottom({
      duration: 800,
      smooth: true
    })
    setProductsDisplayed((prev) => prev + 21)
  }

  return (
    <Container disableGutters maxWidth='xl'>
      <Box py={2} sx={{
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '5px'
      }}>
        {categories?.map((item) => (
          <Box
            sx={{
              width: 'calc(100% / 11)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': { cursor: 'pointer', transform: 'translateY(-3px)' }
            }}
            key={item.id}
          >
            <Box sx={{ border: '1px solid #ddd', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={item.icon_url} alt="" height={50} width={50} />
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant='span'
                style={{
                  fontSize: '12px',
                  whiteSpace: 'wrap',
                  fontWeight: '500'
                }}
              >
                {item.text}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Box py={2}>
        <img src={banner} width='100%' height='auto' alt="" />
      </Box>

      <Box py={2}>
        <Typography
          variant='h2'
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.5em',
            color: '#333',
            margin: '35px auto',
            '&::after': {
              content: '""',
              borderBottom: '2px solid #ddd',
              display: 'block',
              height: '1px',
              width: '10%',
              margin: '0 auto',
              position: 'relative',
              top: '10px'
            }
          }}
        >
          Sản phẩm bán chạy
        </Typography>

        <CustomCarousel>
          {bestSellingProducts.length > 0
            ? bestSellingProducts.map((product) => (
              <ProductItem product={product} key={product.id} width={'240px'} />
            ))
            : [...Array(6)].map((_, index) => (
              <ProductItem product={null} key={index} loading={true} width={'240px'} />
            ))}
        </CustomCarousel>
      </Box>

      <Box py={2} sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        fontWeight: 'bold',
        marginTop: '40px',
        marginBottom: '40px',
        color: '#000'
      }}>
        <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <LocalShippingIcon style={{ fontSize: 40 }}/>
          <Typography variant='span'>Giao hàng nhanh chóng</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <SupportAgentIcon style={{ fontSize: 40 }}/>
          <Typography variant='span'>Hỗ trợ trực tuyến</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <CurrencyExchangeIcon style={{ fontSize: 40 }}/>
          <Typography variant='span'>Hoàn tiền nhanh chóng</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <HighQualityIcon style={{ fontSize: 40 }}/>
          <Typography variant='span'>Sản phẩm chất lượng cao</Typography>
        </Box>
      </Box>

      <Box py={2}>
        <Typography
          variant='h2'
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.5em',
            color: '#333',
            margin: '35px auto',
            '&::after': {
              content: '""',
              borderBottom: '2px solid #ddd',
              display: 'block',
              height: '1px',
              width: '10%',
              margin: '0 auto',
              position: 'relative',
              top: '10px'
            }
          }}
        >
          Sản phẩm đề xuất
        </Typography>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '10px'
        }}>
          {recommendedProducts.length > 0
            ? recommendedProducts
              .slice(0, productsDisplayed)
              .map((product) => (
                <ProductItem product={product} key={product.id}/>
              ))
            : [...Array(40)].map((_, index) => (
              <ProductItem product={null} loading={true} key={index}/>
            ))}
        </Box>
      </Box>

      <Box py={2} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant='contained'
          sx={{
            textTransform: 'none',
            color: 'white',
            backgroundColor: 'black',
            borderRadius: '8px',
            padding: '4px 12px',
            fontSize: '14px',
            '&:hover': {
              backgroundColor: 'rgba($color: #000000, $alpha: 0.8)'
            }
          }}
          onClick={loadMoreRecommendedProducts}
        >
          Xem thêm
        </Button>
      </Box>

    </Container>

  )
}

export default memo(Home)
