
import { useEffect, useState } from 'react'
import banner from '~/assets/images/banner.png'
import 'react-multi-carousel/lib/styles.css'
import Product from '~/components/Product/Product'
import { animateScroll } from 'react-scroll'
import { Button } from '~/components/ui/button'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import styled from 'styled-components'
import Carousel from 'react-multi-carousel'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import HighQualityIcon from '@mui/icons-material/HighQuality'
import CategoryBar from './CategoryBar/CategoryBar'
import { getCategoriesAPI, getProductsAPI } from '~/apis'

const responsiveCarousel = {
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
    <Carousel responsive={responsiveCarousel} infinite autoPlay>
      {children}
    </Carousel>
  </div>
)
const CustomCarousel = styled(Div)`
  .react-multi-carousel-item {
    display: flex;
    justify-content: center;
    padding-bottom: 5px;
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
function HomePage() {
  const [bestSellingProducts, setBestSellingProducts] = useState([])
  const [recommendedProducts, setRecommendedProducts] = useState([])
  const [productsDisplayed, setProductsDisplayed] = useState(30)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getProductsAPI().then((data) => {
      const bestSellingProducts = data
        .filter((product) => product.quantitySold > 0 )
        .sort((a, b) => b.quantitySold - a.quantitySold)
        .slice(0, 50)
      const recommendedProducts = data
        .filter((product) => product.rate !== null && product.rate !== undefined)
        .sort((a, b) => b.rate - a.rate)
      setBestSellingProducts(bestSellingProducts)
      setRecommendedProducts(recommendedProducts)
    })
  }, [])

  useEffect(() => {
    getCategoriesAPI().then((data) => setCategories(data))
  }, [])

  const loadMoreRecommendedProducts = () => {
    animateScroll.scrollToBottom({
      duration: 800,
      smooth: true
    })
    setProductsDisplayed((prev) => prev + 21)
  }

  return (
    <>
      <CategoryBar categories={categories} />
      <Container disableGutters maxWidth="xl">
        <Box py={2}>
          <img src={banner} width="100%" height="auto" alt="" />
        </Box>

        <Box py={2}>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '1.5em',
              color: '#333',
              margin: '0 auto 35px auto',
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
                <Product
                  product={product}
                  key={product._id}
                  width={'240px'}
                />
              ))
              : [...Array(6)].map((_, index) => (
                <Product
                  product={null}
                  key={index}
                  loading={true}
                  width={'240px'}
                />
              ))}
          </CustomCarousel>
        </Box>

        <Box
          py={2}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            fontWeight: 'bold',
            marginTop: '40px',
            marginBottom: '40px',
            color: '#000'
          }}
        >
          <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <LocalShippingIcon style={{ fontSize: 40 }} />
            <Typography variant="span">Giao hàng nhanh chóng</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <SupportAgentIcon style={{ fontSize: 40 }} />
            <Typography variant="span">Hỗ trợ trực tuyến</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <CurrencyExchangeIcon style={{ fontSize: 40 }} />
            <Typography variant="span">Hoàn tiền nhanh chóng</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <HighQualityIcon style={{ fontSize: 40 }} />
            <Typography variant="span">Sản phẩm chất lượng cao</Typography>
          </Box>
        </Box>

        <Box py={2}>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '1.5em',
              color: '#333',
              margin: '0 auto 35px auto',
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
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '10px'
            }}
          >
            {recommendedProducts.length > 0
              ? recommendedProducts
                .slice(0, productsDisplayed)
                .map((product) => (
                  <Product product={product} key={product._id} />
                ))
              : [...Array(40)].map((_, index) => (
                <Product product={null} loading={true} key={index} />
              ))}
          </Box>
        </Box>

        <Box py={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            className='bg-mainMint-50'
            onClick={loadMoreRecommendedProducts}
          >
            Xem thêm
          </Button>
        </Box>
      </Container>
    </>
  )
}

export default HomePage
