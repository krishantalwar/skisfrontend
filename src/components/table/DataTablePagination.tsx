import { Table } from "@tanstack/react-table"
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

interface Props<TData> {
  table: Table<TData>
  total: number
  page: number
  onPageChange: (page: number) => void
}

export function DataTablePagination<TData>({ table, total, page, onPageChange }: Props<TData>) {
  const pageCount = table.getPageCount()
  // console.log("pageCount",pageCount)
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(1, page - 1))}
            className={page <= 1 ? "opacity-50 pointer-events-none" : ""}
          />
        </PaginationItem>
        <PaginationItem>
          <span className="px-4 text-sm text-muted-foreground">
            Page {page} of {pageCount}
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math.min(pageCount, page + 1))}
            className={page >= pageCount ? "opacity-50 pointer-events-none" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
