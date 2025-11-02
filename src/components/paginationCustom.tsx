import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface PaginationCustomProps {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}

export default function PaginationCustom({ totalPages, currentPage, onPageChange }: PaginationCustomProps) {
  const handlePrevious = () => {
    if (currentPage > 1 && currentPage <= totalPages) {
      onPageChange(currentPage - 1)
    }
  }
  const handleNext = () => {
    if (currentPage > 0 && currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }
  return (
    <div>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem className={currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}>
            <PaginationPrevious onClick={() => handlePrevious()} />
          </PaginationItem>
          {Array.from({
            length: totalPages,
          }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => onPageChange(index + 1)}
                className={
                  currentPage === index + 1
                    ? 'bg-violet-primary text-white hover:bg-violet-primary/90 hover:text-white'
                    : ''
                }
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {/* <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem> */}
          <PaginationItem className={currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''}>
            <PaginationNext onClick={() => handleNext()} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
