import { useState, useEffect } from 'react'
import Product from '~/components/Product/Product'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { getProductsAPI } from '~/apis'

import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from '~/utils/constants'
import Loader from '~/components/Loader/Loader'
import PaginationComponent from '~/components/Pagination/PaginationComponent'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel } from '~/components/ui/form'
import { Button } from '~/components/ui/button'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'

function SearchPage() {
  const [products, setProducts] = useState([])
  const [totalProducts, setTotalProducts] = useState(1)
  const [loading, setLoading] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()
  const keyword = searchParams.get('keyword')
  const page = parseInt(searchParams.get('page')) || DEFAULT_PAGE

  useEffect(() => {
    // const { sortKey, sortValue } = defineSort(sortOption)
    setLoading(true)
    const searchPath = `?${createSearchParams({
      'q[name]': keyword,
      'page': page
    })}`
    getProductsAPI(searchPath)
      .then((data) => {
        setProducts(data?.products || [])
        setTotalProducts(data?.totalProducts || 0)
      })
      .finally(() => { setLoading(false), window.scrollTo(top) })

  }, [page, keyword])

  const handlePaginate = (page) => {
    searchParams.set('page', page)
    setSearchParams(searchParams)
  }

  const form = useForm({
    defaultValues: {
      filterByRate: '0',
      filterByPrice: '0'
    }
  })

  const handleFilter = (data) => {
    console.log(data)
  }

  if (loading) {
    return <Loader caption={'Đang tải...'} />
  }

  return (
    <div className='container mx-auto my-6'>
      <div className='flex gap-6 h-full relative'>
        <div className='w-[20%] px-6 h-full sticky top-36 left-0 max-h-full'>
          <div className='text-mainColor2-800 font-medium text-xl'>Bộ lọc sản phẩm</div>

          <div className='mt-4'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleFilter)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="filterByRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-base'>Số sao đánh giá</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col gap-2"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0 px-4 rounded-md cursor-pointer">
                            <FormControl>
                              <RadioGroupItem value={'0'} className='bg-white' />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Tất cả
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0 px-4 rounded-md cursor-pointer">
                            <FormControl>
                              <RadioGroupItem value={'5'} className='bg-white' />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              5 sao - 4 sao
                            </FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0 px-4 rounded-md cursor-pointer">
                            <FormControl>
                              <RadioGroupItem value={'4'} className='bg-white' />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              4 sao - 3 sao
                            </FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0 px-4 rounded-md cursor-pointer">
                            <FormControl>
                              <RadioGroupItem value={'3'} className='bg-white' />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">3 sao - 2 sao</FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0 px-4 rounded-md cursor-pointer">
                            <FormControl>
                              <RadioGroupItem value={'2'} className='bg-white' />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">2 sao - 1 sao</FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0 px-4 rounded-md cursor-pointer">
                            <FormControl>
                              <RadioGroupItem value={'1'} className='bg-white' />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">Dưới 1 sao</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="filterByPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-base'>Khoảng giá</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col gap-2"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0 px-4 rounded-md cursor-pointer">
                            <FormControl>
                              <RadioGroupItem value={'0'} className='bg-white' />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Tất cả
                            </FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0 px-4 rounded-md cursor-pointer">
                            <FormControl>
                              <RadioGroupItem value={'1'} className='bg-white' />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {'< 500.000đ'}
                            </FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0 px-4 rounded-md cursor-pointer">
                            <FormControl>
                              <RadioGroupItem value={'500'} className='bg-white' />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              500.000đ - 1.000.000đ
                            </FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0 px-4 rounded-md cursor-pointer">
                            <FormControl>
                              <RadioGroupItem value={'1000'} className='bg-white' />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">1.000.000đ - 5.000.000đ</FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0 px-4 rounded-md cursor-pointer">
                            <FormControl>
                              <RadioGroupItem value={'5000'} className='bg-white' />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">5.000.000đ - 10.000.000đ</FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0 px-4 rounded-md cursor-pointer">
                            <FormControl>
                              <RadioGroupItem value={'10000'} className='bg-white' />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">{'> 10.000.000đ'}</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="filterByCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Danh mục sản phẩm</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn danh mục sản phẩm" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="m@example.com">m@example.com</SelectItem>
                          <SelectItem value="m@google.com">m@google.com</SelectItem>
                          <SelectItem value="m@support.com">m@support.com</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="filterByBrand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thương hiệu</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn thương hiệu" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="m@example.com">m@example.com</SelectItem>
                          <SelectItem value="m@google.com">m@google.com</SelectItem>
                          <SelectItem value="m@support.com">m@support.com</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <Button type="submit" className='w-full bg-mainColor2-800'>Lọc</Button>
              </form>
            </Form>
          </div>
        </div>

        <div className='flex-1'>
          <div>
            <div className='flex items-end justify-between mb-4'>
              <span className='font-medium text-xl text-mainColor2-800'>Kết quả tìm kiếm cho &quot;{keyword}&quot;</span>
              <span>Trang {page}</span>
            </div>

            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3'>
              {loading ? (
                <>
                  {Array.from({ length: 40 }).map((_, index) => (
                    <Product product={null} loading={true} key={index}/>
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
                        <Product product={product} loading={false} key={index} width={'minmax(250px, 1fr)'}/>
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
