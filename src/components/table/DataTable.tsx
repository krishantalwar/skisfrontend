import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTablePagination } from "./DataTablePagination"
import { DataTableToolbar } from "./DataTableToolbar"
import { DataTableColumnToggle } from "./DataTableColumnToggle"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  total: number
  page: number
  pageSize: number
  onPageChange: (page: number) => void
  onSearch?: (value: string) => void
  onSortChange?: (sortBy: string, desc: boolean) => void
  onSelectRows?: (rows: TData[]) => void
  loading?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  total,
  page,
  pageSize,
  onPageChange,
  onSearch,
  onSortChange,
  onSelectRows,
  loading
}: DataTableProps<TData, TValue>) {
  console.log(data)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    manualPagination: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil(total / pageSize),
    onSortingChange: (updater) => {
      const newSorting = typeof updater === "function" ? updater(sorting) : updater
      setSorting(newSorting)
      const sort = newSorting[0]
      if (sort && onSortChange) {
        onSortChange(sort.id, sort.desc)
      }
    },
    onRowSelectionChange: (updater) => {
      const updated = typeof updater === "function" ? updater(rowSelection) : updater
      setRowSelection(updated)
      const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original)
      onSelectRows?.(selectedRows)
    },
    onColumnVisibilityChange: setColumnVisibility,
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <DataTableToolbar table={table} onSearch={onSearch} />
        <DataTableColumnToggle table={table} />
      </div>
      {/* <div className="rounded-md border"> */}
      <div className="relative w-full overflow-hidden rounded-md border">
      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">

        <Table className="w-full ">
          <TableHeader className="sticky top-0 z-10 bg-background">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="align-top">
                <TableHead className="w-10">
                  {/* <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                  /> */}
                </TableHead>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}
                  // className="whitespace-nowrap px-2 py-3 text-left align-top" // prevent wrapping in headers
                  className={`whitespace-nowrap px-2 py-3 text-left align-top ${header.column.columnDef.meta?.className ?? ''}`}
    
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length+1}>Loading...</TableCell>
            </TableRow>
          ) : table.getRowModel().rows.length ? (
          
          table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="align-top">
                <TableCell className="w-10 align-top">
                  <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                  />
                </TableCell>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}
                  // className="whitespace-nowrap px-2 py-3 text-left align-top" // prevent wrapping by default
          
                  className={`whitespace-nowrap px-2 py-3 text-left align-top ${cell.column.columnDef.meta?.className ?? ''}`}
       
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            )))    : (
              <TableRow>
                <TableCell colSpan={columns.length+1}>No results.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      </div>
      <DataTablePagination table={table} total={total} page={page} onPageChange={onPageChange} />
    {/* </div> */}
    </div>
  )
}
