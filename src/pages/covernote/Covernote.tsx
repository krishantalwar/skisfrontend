import { useCovernoteQuery } from '@/features/covernote/service'
// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
//   getPaginationRowModel,
// } from '@tanstack/react-table'
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { DataTable } from "@/components/table/DataTable"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "@/components/table/DataTableRowActions"

// const columns: ColumnDef<any>[] = [
//   { accessorKey: 'id', header: 'ID' },
//   { accessorKey: 'name', header: 'Name' },
//   { accessorKey: 'email', header: 'Email' },
//   // Add more fields if needed
// ]

const columns = [
  { accessorKey: 'id', header: 'ID' ,    enableSorting: true,},
  { accessorKey: 'name', header: 'Name',    enableSorting: true, },
  { accessorKey: 'email', header: 'Email' ,    enableSorting: true,},
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <DataTableRowActions rowData={row.original} onEdit={()=>{}} onDelete={()=>{}} />
    },
  }
  // Add more fields if needed
]

export default function UserTable() {
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { data=[], isLoading } = useCovernoteQuery({
    page: pageIndex,
    perPage: pageSize,
    // Add search, sort, etc. here if needed
  })

  // console.log("data",data)
  // const table = useReactTable({
  //   data: data?.data || [],
  //   columns,
  //   pageCount: data?.meta?.last_page || -1,
  //   state: {
  //     pagination: {
  //       pageIndex: pageIndex - 1,
  //       pageSize,
  //     },
  //   },
  //   manualPagination: true,
  //   getCoreRowModel: getCoreRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  // })

  // return (
  //   <div>
  //     <Table>
  //       <TableHeader>
  //         {table.getHeaderGroups().map(headerGroup => (
  //           <TableRow key={headerGroup.id}>
  //             {headerGroup.headers.map(header => (
  //               <TableHead key={header.id}>
  //                 {flexRender(header.column.columnDef.header, header.getContext())}
  //               </TableHead>
  //             ))}
  //           </TableRow>
  //         ))}
  //       </TableHeader>
  //       <TableBody>
  //         {table.getRowModel().rows.map(row => (
  //           <TableRow key={row.id}>
  //             {row.getVisibleCells().map(cell => (
  //               <TableCell key={cell.id}>
  //                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
  //               </TableCell>
  //             ))}
  //           </TableRow>
  //         ))}
  //       </TableBody>
  //     </Table>

  //     <div className="flex justify-between mt-4">
  //       <Button
  //         onClick={() => setPageIndex(old => Math.max(old - 1, 1))}
  //         disabled={pageIndex === 1}
  //       >
  //         Previous
  //       </Button>
  //       <span>Page {pageIndex} of {data?.meta?.last_page}</span>
  //       <Button
  //         onClick={() => setPageIndex(old => (data && pageIndex < data?.meta?.last_page) ? old + 1 : old)}
  //         disabled={data && pageIndex >= data?.meta?.last_page}
  //       >
  //         Next
  //       </Button>
  //     </div>
  //   </div>
  // )

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Users</h1>
      {/* <DataTable
        columns={columns}
        data={data?.data}
        pageIndex={pageIndex}
        pageSize={10}
        pageCount={data?.meta?.last_page}
        onPageChange={setPageIndex}
        isLoading={isLoading}
        onSearch={((ee)=>{console.log("ee",ee)})}
      /> */}

      <DataTable
      columns={columns}
      data={data?.data}
      total={data?.meta?.last_page}
      page={pageIndex}
      pageSize={pageSize}
      onPageChange={setPageIndex}
      onSearch={((ee)=>{console.log("ee",ee)})}
      onSortChange={((ee)=>{console.log("onSortChange",ee)})}
      // onSearch={onSearch}
      // onSortChange={onSortChange}
      onSelectRows={(rows) => console.log("Selected rows:", rows)}
      loading={isLoading}
    />
    </div>
  )
}
