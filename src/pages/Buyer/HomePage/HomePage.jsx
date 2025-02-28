
import { useEffect, useState } from 'react'
import banner from '~/assets/images/banner.png'
import 'react-multi-carousel/lib/styles.css'
import Product from '~/components/Product/Product'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import HighQualityIcon from '@mui/icons-material/HighQuality'
import CategoryBar from './CategoryBar/CategoryBar'
import { getCategoriesAPI, getProductsAPI } from '~/apis'

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '~/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { DEFAULT_ITEMS_PER_PAGE } from '~/utils/constants'

function HomePage() {
  const [bestSellingProducts, setBestSellingProducts] = useState([])
  const [recommendedProducts, setRecommendedProducts] = useState([])
  const [productsDisplayed] = useState(DEFAULT_ITEMS_PER_PAGE)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getProductsAPI().then((data) => {
      const bestSellingProducts = data.products
        .filter((product) => product.quantitySold > 0 )
        .sort((a, b) => b.quantitySold - a.quantitySold)
        .slice(0, 50)
      const recommendedProducts = data.products
        .filter((product) => product.rate !== null && product.rate !== undefined)
        .sort((a, b) => b.rate - a.rate)
      setBestSellingProducts(bestSellingProducts)
      setRecommendedProducts(recommendedProducts)
    })
  }, [])

  useEffect(() => {
    getCategoriesAPI().then((data) => setCategories(data))
  }, [])


  const handleClickCategory = (categoryId) => {
    //
  }

  return (
    <div className="bg-[#F5F5FA]">
      <div className='container mx-auto py-6'>
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-1 bg-white rounded-lg pl-3 py-4 pr-0.5">
            <CategoryBar categories={categories} onClickCategory={handleClickCategory}/>
          </div>
          <div className="col-span-5">
            <div>
              <div>
                <img src={banner} width="100%" height="auto" alt="" />
              </div>

              <div className='bg-white rounded-lg p-4 mt-4'>
                <div
                  className='text-center font-bold text-2xl text-mainColor1-600 mx-auto mb-9 after:border after:border-mainColor1-100/50 after:block after:h-px after:w-[10%] after:mx-auto after:relative after:top-2'
                >
                Sản phẩm bán chạy
                </div>

                <Carousel plugins={[Autoplay({ playOnInit: true, delay: 3000 })]}>
                  <CarouselContent>
                    {bestSellingProducts.length > 0
                      ? bestSellingProducts.map((product) => (
                        <CarouselItem className='basis-1/5' key={product._id}>
                          <Product
                            product={product}
                            loading={false}
                          />
                        </CarouselItem>

                      ))
                      : [...Array(6)].map((_, index) => (
                        <Product
                          product={null}
                          key={index}
                          loading={true}
                        />
                      ))}
                    <CarouselItem>...</CarouselItem>
                  </CarouselContent>
                </Carousel>
              </div>

              <div className='bg-white rounded-lg p-4 my-4 flex justify-between items-center relative font-bold text-mainColor1-400'>
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
              </div>

              <div className='bg-white rounded-lg p-4 mt-4'>
                <div
                  className='text-center font-bold text-2xl text-mainColor1-600 mx-auto mb-9 after:border after:border-mainColor1-100/50 after:block after:h-px after:w-[10%] after:mx-auto after:relative after:top-2'
                >
                Sản phẩm đề xuất
                </div>
                <div className='list-recommended-products grid grid-cols-5 gap-2.5'>
                  {recommendedProducts.length > 0
                    ? recommendedProducts
                      .slice(0, productsDisplayed)
                      .map((product) => (
                        <Product product={product} key={product._id} />
                      ))
                    : [...Array(40)].map((_, index) => (
                      <Product product={null} loading={true} key={index} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
