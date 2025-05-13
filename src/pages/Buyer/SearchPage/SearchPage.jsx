import { useState, useEffect, useCallback } from 'react'
import Product from '~/components/Product/Product'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { getProductsAPI, getProductsWithFiltersAPI } from '~/apis/buyerApis'

import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from '~/utils/constants'
import PaginationComponent from '~/components/Pagination/PaginationComponent'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '~/components/ui/form'
import { Button } from '~/components/ui/button'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'
import Rating from 'react-rating'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { useLoading } from '~/contexts/LoadingContext'

function SearchPage() {
  const [products, setProducts] = useState([])
  const [totalProducts, setTotalProducts] = useState(1)
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])

  const { startLoading, endLoading, apiLoadingCount } = useLoading()

  const [searchParams, setSearchParams] = useSearchParams()
  const keyword = searchParams.get('keyword')
  const page = parseInt(searchParams.get('page')) || DEFAULT_PAGE

  const [filterByRate, setFilterByRate] = useState()
  const [filterByPrice, setFilterByPrice] = useState()
  const [filterByCategory, setFilterByCategory] = useState()
  const [filterByBrand, setFilterByBrand] = useState()

  const getPriceRange = (rate) => {
    let minPrice = 0,
      maxPrice = 0
    switch (rate) {
      case '1':
        minPrice = 0
        maxPrice = 500000
        break
      case '500':
        minPrice = 500000
        maxPrice = 1000000
        break
      case '1000':
        minPrice = 1000000
        maxPrice = 5000000
        break
      case '5000':
        minPrice = 5000000
        maxPrice = 10000000
        break
      case '10000':
        minPrice = 10000000
        maxPrice = 1000000000
        break
      default:
        break
    }
    return { minPrice, maxPrice }
  }

  const handlePaginate = useCallback(
    (page) => {
      searchParams.set('page', page)
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams]
  )

  useEffect(() => {
    // const { sortKey, sortValue } = defineSort(sortOption)
    startLoading()

    const searchObject = {
      'q[name]': keyword,
      page: page
    }

    let filterFlag = false

    if (filterByRate && filterByRate !== 'all') {
      searchObject['q[rating]'] = filterByRate
      filterFlag = true
    }
    if (filterByPrice && filterByPrice !== 'all') {
      filterFlag = true
      const { minPrice, maxPrice } = getPriceRange(filterByPrice)
      searchObject['q[minPrice]'] = minPrice
      searchObject['q[maxPrice]'] = maxPrice
    }
    if (filterByCategory) {
      searchObject['q[categoryId]'] = filterByCategory
      filterFlag = true
    }
    if (filterByBrand) {
      searchObject['q[brandId]'] = filterByBrand
      filterFlag = true
    }

    const searchPath = `?${createSearchParams(searchObject)}`

    if (!filterFlag) {
      getProductsAPI(searchPath)
        .then((data) => {
          setProducts(data?.products || [])
          setTotalProducts(data?.totalProducts || 0)
          setCategories(data?.categories || [])
          setBrands(data?.brands || [])
        })
        .finally(() => {
          window.scrollTo(top)
          endLoading()
        })
    } else {
      handlePaginate(1)
      getProductsWithFiltersAPI(searchPath)
        .then((data) => {
          setProducts(data?.products || [])
          setTotalProducts(data?.totalProducts || 0)
        })
        .finally(() => {
          window.scrollTo(top)
          endLoading()
        })
    }
  }, [
    page,
    keyword,
    filterByRate,
    filterByPrice,
    filterByCategory,
    filterByBrand,
    handlePaginate
  ])

  const form = useForm({
    defaultValues: {
      filterByRate: 'all',
      filterByPrice: 'all'
    }
  })

  const handleFilter = (data) => {
    setFilterByRate(data.filterByRate)
    setFilterByPrice(data.filterByPrice)
    setFilterByCategory(data.filterByCategory)
    setFilterByBrand(data.filterByBrand)
  }

  // if (loading) {
  //   return <Loader caption={'Đang tải...'} />
  // }

  return (
    <div className='container mx-auto my-6'>
      <div className='flex gap-6 h-full relative'>
        <div className='w-[20%] px-6 h-full sticky top-36 left-0 max-h-full'>
          <div className='text-mainColor2-800 font-medium text-xl'>
            Bộ lọc sản phẩm
          </div>

          <div className='mt-4'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleFilter)}
                className='space-y-6'
              >
                <FormField
                  control={form.control}
                  name='filterByRate'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-base'>
                        Số sao đánh giá
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className='flex flex-col gap-2'
                        >
                          <FormItem className='flex items-center space-x-3 space-y-0 px-4 rounded-md cursor-pointer'>
                            <FormControl>
                              <RadioGroupItem
                                value={'all'}
                                className='bg-white'
                              />
                            </FormControl>
                            <FormLabel className='font-normal cursor-pointer'>
                              Tất cả
                            </FormLabel>
                          </FormItem>

                          <FormItem className='flex items-center space-x-3 space-y-0 px-4 rounded-md cursor-pointer'>
                            <FormControl>
                              <RadioGroupItem
                                value={'5'}
                                className='bg-white'
                              />
                            </FormControl>
                            <FormLabel className='font-normal cursor-pointer flex items-center gap-1.5'>
                              <Rating
                                emptySymbol={<FaRegStar />}
                                fullSymbol={<FaStar />}
                                initialRating={5}
                                readonly
                                className='text-[#FBCA04] text-md leading-none'
                              />
                              <span>từ 5 sao</span>
                            </FormLabel>
                          </FormItem>

                          <FormItem className='flex items-center space-x-3 space-y-0 px-4 rounded-md cursor-pointer'>
                            <FormControl>
                              <RadioGroupItem
                                value={'4'}
                                className='bg-white'
                              />
                            </FormControl>
                            <FormLabel className='font-normal cursor-pointer flex items-center gap-1.5'>
                              <Rating
                                emptySymbol={<FaRegStar />}
                                fullSymbol={<FaStar />}
                                initialRating={4}
                                readonly
                                className='text-[#FBCA04] text-md leading-none'
                              />
                              <span>từ 4 sao</span>
                            </FormLabel>
                          </FormItem>

                          <FormItem className='flex items-center space-x-3 space-y-0 px-4 rounded-md cursor-pointer'>
                            <FormControl>
                              <RadioGroupItem
                                value={'3'}
                                className='bg-white'
                              />
                            </FormControl>
                            <FormLabel className='font-normal cursor-pointer flex items-center gap-1.5'>
                              <Rating
                                emptySymbol={<FaRegStar />}
                                fullSymbol={<FaStar />}
                                initialRating={3}
                                readonly
                                className='text-[#FBCA04] text-md leading-none'
                              />
                              <span>từ 3 sao</span>
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='filterByPrice'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-base'>Khoảng giá</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className='flex flex-col gap-2'
                        >
                          <FormItem className='flex items-center space-x-3 space-y-0 px-4 rounded-md cursor-pointer'>
                            <FormControl>
                              <RadioGroupItem
                                value={'all'}
                                className='bg-white'
                              />
                            </FormControl>
                            <FormLabel className='font-normal cursor-pointer'>
                              Tất cả
                            </FormLabel>
                          </FormItem>

                          <FormItem className='flex items-center space-x-3 space-y-0 px-4 rounded-md cursor-pointer'>
                            <FormControl>
                              <RadioGroupItem
                                value={'1'}
                                className='bg-white'
                              />
                            </FormControl>
                            <FormLabel className='font-normal cursor-pointer'>
                              {'< 500.000đ'}
                            </FormLabel>
                          </FormItem>

                          <FormItem className='flex items-center space-x-3 space-y-0 px-4 rounded-md cursor-pointer'>
                            <FormControl>
                              <RadioGroupItem
                                value={'500'}
                                className='bg-white'
                              />
                            </FormControl>
                            <FormLabel className='font-normal cursor-pointer'>
                              500.000đ - 1.000.000đ
                            </FormLabel>
                          </FormItem>

                          <FormItem className='flex items-center space-x-3 space-y-0 px-4 rounded-md cursor-pointer'>
                            <FormControl>
                              <RadioGroupItem
                                value={'1000'}
                                className='bg-white'
                              />
                            </FormControl>
                            <FormLabel className='font-normal cursor-pointer'>
                              1.000.000đ - 5.000.000đ
                            </FormLabel>
                          </FormItem>

                          <FormItem className='flex items-center space-x-3 space-y-0 px-4 rounded-md cursor-pointer'>
                            <FormControl>
                              <RadioGroupItem
                                value={'5000'}
                                className='bg-white'
                              />
                            </FormControl>
                            <FormLabel className='font-normal cursor-pointer'>
                              5.000.000đ - 10.000.000đ
                            </FormLabel>
                          </FormItem>

                          <FormItem className='flex items-center space-x-3 space-y-0 px-4 rounded-md cursor-pointer'>
                            <FormControl>
                              <RadioGroupItem
                                value={'10000'}
                                className='bg-white'
                              />
                            </FormControl>
                            <FormLabel className='font-normal cursor-pointer'>
                              {'> 10.000.000đ'}
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='filterByCategory'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Danh mục sản phẩm</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Chọn danh mục sản phẩm' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories?.map((category) => (
                            <SelectItem
                              key={category?._id}
                              value={category?._id}
                            >
                              {category?.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='filterByBrand'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thương hiệu</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Chọn thương hiệu' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {brands?.map((brand) => (
                            <SelectItem key={brand?._id} value={brand?._id}>
                              {brand?.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <Button type='submit' className='w-full bg-mainColor2-800'>
                  Lọc
                </Button>
              </form>
            </Form>
          </div>
        </div>

        <div className='flex-1'>
          <div>
            <div className='flex items-end justify-between mb-4'>
              <span className='font-medium text-xl text-mainColor2-800'>
                Kết quả tìm kiếm cho &quot;{keyword}&quot;
              </span>
              <span>Trang {page}</span>
            </div>

            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3'>
              {apiLoadingCount > 0 ? (
                <>
                  {Array.from({ length: 40 }).map((_, index) => (
                    <Product product={null} loading={true} key={index} />
                  ))}
                </>
              ) : (
                <>
                  {!products?.length ? (
                    <div
                      style={{
                        textAlign: 'center',
                        marginTop: '80px',
                        color: '#555',
                        width: '100%'
                      }}
                    >
                      <h2>Không tìm thấy sản phẩm</h2>
                      <p>Hãy thử tìm kiếm với từ khóa khác.</p>
                    </div>
                  ) : (
                    <>
                      {products.map((product, index) => (
                        <Product
                          product={product}
                          loading={false}
                          key={index}
                          width={'minmax(250px, 1fr)'}
                        />
                      ))}
                    </>
                  )}
                </>
              )}
            </div>

            <div className='flex flex-row-reverse my-6'>
              <PaginationComponent
                currentPage={page}
                totalPages={Math.ceil(totalProducts / DEFAULT_ITEMS_PER_PAGE)}
                handlePaginate={handlePaginate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage
