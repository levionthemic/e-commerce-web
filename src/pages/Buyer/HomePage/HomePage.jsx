import { useEffect, useState } from 'react'
import Product from '~/components/Product/Product'
import CategoryBar from './CategoryBar/CategoryBar'
import { getCategoriesAPI, getProductsAPI } from '~/apis'

import { FaShippingFast } from 'react-icons/fa'
import { MdSupportAgent } from 'react-icons/md'
import { MdCurrencyExchange } from 'react-icons/md'
import { MdHighQuality } from 'react-icons/md'

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
                <img src={''} width="100%" height="auto" alt="" />
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
                <div className='flex gap-5 items-center'>
                  <FaShippingFast className='text-2xl' />
                  <span>Giao hàng nhanh chóng</span>
                </div>
                <div className='flex gap-5 items-center'>
                  <MdSupportAgent className='text-2xl' />
                  <span>Hỗ trợ trực tuyến</span>
                </div>
                <div className='flex gap-5 items-center'>
                  <MdCurrencyExchange className='text-2xl'/>
                  <span>Hoàn tiền nhanh chóng</span>
                </div>
                <div className='flex gap-5 items-center'>
                  <MdHighQuality className='text-2xl'/>
                  <span>Sản phẩm chất lượng cao</span>
                </div>
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
