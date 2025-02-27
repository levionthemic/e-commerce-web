
import { useState, useEffect } from 'react'
import Product from '~/components/Product/Product'
import { createSearchParams, Link, useSearchParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { getProductsAPI } from '~/apis'

// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious
// } from '~/components/ui/pagination'
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from '~/utils/constants'
import { PaginationItem } from '@mui/material'

function SearchPage() {
  const [sortOption, setSortOption] = useState(0)
  const [products, setProducts] = useState([])
  const [totalProducts, setTotalProducts] = useState(1)

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
    const searchPath = `?${createSearchParams({
      'q[name]': keyword,
      'page': page
    })}`
    getProductsAPI(searchPath)
      .then((data) => {
        setProducts(data?.products || [])
        setTotalProducts(data?.totalProducts || 0)
      })

  }, [page, keyword])

  return (
    <Container disableGutters maxWidth='xl'>
      <Grid container columnSpacing={5}>
        <Grid item xl={2} sx={{ position: 'sticky', overflowY: 'scroll', top: '50px', left: 0, maxHeight: '100vh' }}>
          Sider
        </Grid>

        <Grid item xl={10} sx={{ paddingTop: '20px' }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant='h5'>Kết quả tìm kiếm cho &quot;{keyword}&quot;</Typography>
              <Typography variant='span'>Trang {page}</Typography>
            </Box>

            <Box py={2}>
              <FormControl sx={{ width: 300 }}>
                <InputLabel id="sort-select-label">Sắp xếp theo:</InputLabel>
                <Select
                  labelId="sort-select-label"
                  id="sort-select"
                  value={sortOption}
                  label="Sắp xếp theo:"
                  onChange={(event) => { setSortOption(event.target.value) }}
                  size='small'
                >
                  <MenuItem value={0}>Mặc định</MenuItem>
                  <MenuItem value={1}>Từ A - Z</MenuItem>
                  <MenuItem value={2}>Từ Z - A</MenuItem>
                  <MenuItem value={3}>Giá tăng dần</MenuItem>
                  <MenuItem value={4}>Giá giảm dần</MenuItem>
                  <MenuItem value={5}>Lượt bán giảm dần</MenuItem>
                  <MenuItem value={6}>Lượt bán tăng dần</MenuItem>
                  <MenuItem value={7}>Số sao giảm dần</MenuItem>
                  <MenuItem value={8}>Số sao tăng dần</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '10px'
            }}>
              {!products ? (
                <>
                  {Array.from({ length: 40 }).map((_, index) => (
                    <Product product={null} loading={true} key={index} width={'minmax(250px, 1fr)'}/>
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
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row-reverse', my: 3 }}>
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
            </Box>

          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SearchPage
