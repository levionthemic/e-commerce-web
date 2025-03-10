import { useState, useEffect } from 'react'
import Product from '~/components/Product/Product'
import { createSearchParams, Link, useSearchParams } from 'react-router-dom'
import Pagination from '@mui/material/Pagination'
import { getProductsAPI } from '~/apis'

import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from '~/utils/constants'
import { PaginationItem } from '@mui/material'
import Loader from '~/components/Loader/Loader'

function SearchPage() {
  const [products, setProducts] = useState([])
  const [totalProducts, setTotalProducts] = useState(1)
  const [loading, setLoading] = useState(false)

  const [searchParams] = useSearchParams()
  const keyword = searchParams.get('keyword')
  const page = parseInt(searchParams.get('page')) || 1

  // const defineSort = (sortOption) => {
  //   let sortKey = '',
  //     sortValue = ''
  //   switch (sortOption) {
  //   case 1:
  //     sortKey = 'slug'
  //     sortValue = 'asc'
  //     break
  //   case 2:
  //     sortKey = 'slug'
  //     sortValue = 'desc'
  //     break
  //   case 3:
  //     sortKey = 'original_price'
  //     sortValue = 'asc'
  //     break
  //   case 4:
  //     sortKey = 'original_price'
  //     sortValue = 'desc'
  //     break
  //   case 5:
  //     sortKey = 'quantity_sold.value'
  //     sortValue = 'desc'
  //     break
  //   case 6:
  //     sortKey = 'quantity_sold.value'
  //     sortValue = 'asc'
  //     break
  //   case 7:
  //     sortKey = 'rating_average'
  //     sortValue = 'desc'
  //     break
  //   case 8:
  //     sortKey = 'rating_average'
  //     sortValue = 'asc'
  //     break

  //   default:
  //     break
  //   }
  //   return { sortKey, sortValue }
  // }

  useEffect(() => {
    // const { sortKey, sortValue } = defineSort(sortOption)
    window.scrollTo(top)
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
      .finally(() => { setLoading(false) })

  }, [page, keyword])

  if (loading) {
    return <Loader caption={'Đang tải...'} />
  }

  return (
    <div className='container mx-auto my-6'>
      <div className='grid grid-cols-6'>
        <div className='col-span-1'>
          Sider
        </div>

        <div className='col-span-5'>
          <div>
            <div className='flex items-end justify-between mb-4'>
              <span className='font-medium text-xl text-mainColor2-800'>Kết quả tìm kiếm cho &quot;{keyword}&quot;</span>
              <span>Trang {page}</span>
            </div>

            <div className='py-4'>
              Select
            </div>

            <div className='grid grid-cols-4 gap-3'>
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
              <Pagination
                size="small"
                color="secondary"
                showFirstButton
                showLastButton
                count={Math.ceil(totalProducts / DEFAULT_ITEMS_PER_PAGE)}
                page={page}
                renderItem={(item) => (
                  <PaginationItem
                    component={Link}
                    to={`/buyer/search${item.page === DEFAULT_PAGE
                      ? `?${createSearchParams({ 'keyword': keyword })}`
                      : `?${createSearchParams({
                        'keyword': keyword,
                        'page': item.page
                      })}`
                    }`}
                    {...item}
                  />
                )}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage
