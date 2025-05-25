import { usePagination } from '~/hooks/use-pagination'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink
} from '~/components/ui/pagination'
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  paginationItemsToDisplay?: number
  // eslint-disable-next-line no-unused-vars
  handlePaginate: (page: number) => void
}

export default function PaginationComponent({
  currentPage,
  totalPages,
  paginationItemsToDisplay = 6,
  handlePaginate
}: PaginationProps) {
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay
  })

  return (
    <Pagination className='justify-end'>
      <PaginationContent>
        {/* First page button */}
        <PaginationItem>
          <PaginationLink
            className='aria-disabled:pointer-events-none aria-disabled:opacity-50'
            aria-label='Go to first page'
            aria-disabled={currentPage === 1 ? true : undefined}
            role={currentPage === 1 ? 'link' : undefined}
            onClick={() => {
              if (currentPage === 1) return
              handlePaginate(1)
            }}
          >
            <ChevronFirstIcon size={16} aria-hidden='true' />
          </PaginationLink>
        </PaginationItem>

        {/* Previous page button */}
        <PaginationItem>
          <PaginationLink
            className='aria-disabled:pointer-events-none aria-disabled:opacity-50'
            aria-label='Go to previous page'
            aria-disabled={currentPage === 1 ? true : undefined}
            role={currentPage === 1 ? 'link' : undefined}
            onClick={() => {
              if (currentPage === 1) return
              handlePaginate(currentPage - 1)
            }}
          >
            <ChevronLeftIcon size={16} aria-hidden='true' />
          </PaginationLink>
        </PaginationItem>

        {/* Left ellipsis (...) */}
        {showLeftEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Page number links */}
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPage}
              onClick={() => handlePaginate(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Right ellipsis (...) */}
        {showRightEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Next page button */}
        <PaginationItem>
          <PaginationLink
            className='aria-disabled:pointer-events-none aria-disabled:opacity-50'
            aria-label='Go to next page'
            aria-disabled={currentPage === totalPages ? true : undefined}
            role={currentPage === totalPages ? 'link' : undefined}
            onClick={() => {
              if (currentPage === totalPages) return
              handlePaginate(currentPage + 1)
            }}
          >
            <ChevronRightIcon size={16} aria-hidden='true' />
          </PaginationLink>
        </PaginationItem>

        {/* Last page button */}
        <PaginationItem>
          <PaginationLink
            className='aria-disabled:pointer-events-none aria-disabled:opacity-50'
            aria-label='Go to last page'
            aria-disabled={currentPage === totalPages ? true : undefined}
            role={currentPage === totalPages ? 'link' : undefined}
            onClick={() => {
              if (currentPage === totalPages) return
              handlePaginate(totalPages)
            }}
          >
            <ChevronLastIcon size={16} aria-hidden='true' />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
