/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { axiosApi } from '~/services/ApiService'
import ProductItem from '~/components/ProductItem/ProductItem'
import { Link, useNavigate } from 'react-router-dom'
import { animateScroll } from 'react-scroll'
import Sider from './Sider/Sider'
import { Spin } from 'antd'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

const SearchPage = () => {
  const [sortOption, setSortOption] = useState(0)
  const [products, setProducts] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [loadingProduct, setLoadingProduct] = useState(false)
  const [parentCategories, setParentCategories] = useState([])
  const [categoryId, setCategoryId] = useState(null)

  const url = new URL(window.location.href)
  const keyword = url.searchParams.get('keyword').toLowerCase() || ''
  const page = parseInt(url.searchParams.get('page')) || 1

  const navigate = useNavigate()

  window.onload = () => {
    animateScroll.scrollToTop({
      duration: 800,
      smooth: true,
      offset: -70
    })
  }

  const defineSort = (sortOption) => {
    let sortKey = '',
      sortValue = ''
    switch (sortOption) {
    case 1:
      sortKey = 'slug'
      sortValue = 'asc'
      break
    case 2:
      sortKey = 'slug'
      sortValue = 'desc'
      break
    case 3:
      sortKey = 'original_price'
      sortValue = 'asc'
      break
    case 4:
      sortKey = 'original_price'
      sortValue = 'desc'
      break
    case 5:
      sortKey = 'quantity_sold.value'
      sortValue = 'desc'
      break
    case 6:
      sortKey = 'quantity_sold.value'
      sortValue = 'asc'
      break
    case 7:
      sortKey = 'rating_average'
      sortValue = 'desc'
      break
    case 8:
      sortKey = 'rating_average'
      sortValue = 'asc'
      break

    default:
      break
    }
    return { sortKey, sortValue }
  }

  const updateCategoryId = (categoryId) => {
    setCategoryId(categoryId)
  }

  useEffect(() => {
    navigate(`/search?keyword=${keyword}&page=1`)
    animateScroll.scrollToTop({
      duration: 800,
      smooth: true,
      offset: -70
    })
  }, [categoryId])

  useEffect(() => {
    const { sortKey, sortValue } = defineSort(sortOption)
    try {
      setLoadingProduct(true)
      axiosApi('/api/v1/products/search', {
        params: {
          keyword: keyword,
          page: page,
          sortKey: sortKey,
          sortValue: sortValue,
          categoryId: categoryId
        }
      }).then((data) => {
        setProducts(data.data.data)
        setTotalPages(data.data.totalPages || 1)
        setLoadingProduct(false)
      })
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }, [page, sortOption, categoryId])

  useEffect(() => {
    try {
      setLoading(true)
      axiosApi('/api/v1/products/search', {
        params: {
          keyword: keyword,
          page: 1
        }
      }).then((data) => {
        setCategoryId(null)
        setSortOption(0)
        setProducts(data.data.data)
        setParentCategories(data.data.listParentCategories)
        setTotalPages(data.data.totalPages || 1)
        setLoading(false)
      })
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }, [keyword])

  return (
    <Container disableGutters maxWidth='xl'>
      <Grid container columnSpacing={5}>
        <Grid item xl={2} sx={{ position: 'sticky', overflowY: 'scroll', top: '50px', left: 0, maxHeight: '100vh' }}>
          <Spin spinning={loading} tip="Đang tải...">
            {/* Using MUI X Treeview instead */}
            <Sider
              parentCategories={parentCategories}
              onUpdateCategoryId={updateCategoryId}
            />
          </Spin>
        </Grid>

        <Grid item xl={10} sx={{ paddingTop: '20px' }}>
          <Box>
            <Typography variant='h5'>Kết quả tìm kiếm cho &quot;{keyword}&quot;</Typography>
            <Typography variant='span'>Trang {page}</Typography>
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
              {loadingProduct ? (
                <>
                  {Array.from({ length: 40 }).map((_, index) => (
                    <ProductItem product={null} loading={true} key={index} width={'minmax(250px, 1fr)'}/>
                  ))}
                </>
              ) : (
                <>
                  {!products.length ? (
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
                        <ProductItem product={product} loading={false} key={index} width={'minmax(250px, 1fr)'}/>
                      ))}
                    </>
                  )}
                </>
              )}
            </Box>

            <Pagination
              page={page}
              count={10}
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  to={`/inbox${item.page === 1 ? '' : `?page=${item.page}`}`}
                  {...item}
                />
              )}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SearchPage
