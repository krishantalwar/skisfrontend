import { useCovernoteQuery ,useLazyCovernoteAllQuery} from '@/features/covernote/service'
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

import { ExportMenu } from "@/components/table/ExportMenueServer"






// const columns: ColumnDef<any>[] = [
//   { accessorKey: 'id', header: 'ID' },
//   { accessorKey: 'name', header: 'Name' },
//   { accessorKey: 'email', header: 'Email' },
//   // Add more fields if needed
// ]


//  const columns = [
//   { accessorKey: 'name', header: 'Customer Name', enableSorting: true },
//   { accessorKey: 'phone', header: 'Phone', enableSorting: true },
//   { accessorKey: 'address', header: 'Address', enableSorting: true },
//   { accessorKey: 'pno', header: 'Policy No', enableSorting: true },
//   { accessorKey: 'policy_info', header: 'Policy Info', enableSorting: true },

//   { accessorKey: 'covernote', header: 'Covernote', enableSorting: true },
//   { accessorKey: 'covernote_type', header: 'Covernote Type', enableSorting: true },
//   { accessorKey: 'policy_type', header: 'Policy Type ID', enableSorting: true },

//   { accessorKey: 'issue_date', header: 'Issue Date', enableSorting: true },
//   { accessorKey: 'start_date', header: 'Start Date', enableSorting: true },
//   { accessorKey: 'end_date', header: 'End Date', enableSorting: true },
//   { accessorKey: 'pre_exp_date', header: 'Prev Exp. Date', enableSorting: true },

//   { accessorKey: 'dob', header: 'DOB', enableSorting: true },

//   { accessorKey: 'net_premium', header: 'Net Premium', enableSorting: true },
//   { accessorKey: 'gst', header: 'GST %', enableSorting: true },
//   { accessorKey: 'final_amt', header: 'Final Amount', enableSorting: true },

//   { accessorKey: 'product.name', header: 'Product', enableSorting: true },
//   { accessorKey: 'company.name', header: 'Company', enableSorting: true },
//   { accessorKey: 'type.name', header: 'Policy Type', enableSorting: true },
//   { accessorKey: 'user.name', header: 'Agent/User', enableSorting: true },
//   { accessorKey: 'user.email', header: 'User Email', enableSorting: true },

//   {
//     accessorKey: 'payments',
//     header: 'Payment Amount',
//     cell: ({ row }) => {
//       const payments = row.original.payments || [];
//       const total = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
//       return <span>{total}</span>;
//     },
//   },

//   {
//     accessorKey: "actions",
//     header: "Actions",
//     cell: ({ row }) => (
//       <DataTableRowActions
//         rowData={row.original}
//         onEdit={() => {}}
//         onDelete={() => {}}
//       />
//     ),
//   },
// ];


 const columns = [
  { accessorKey: 'name', header: 'Customer Name', enableSorting: true },
  { accessorKey: 'phone', header: 'Phone', enableSorting: true },
  { accessorKey: 'address', header: 'Address', enableSorting: true },
  { accessorKey: 'pno', header: 'Policy No', enableSorting: true },
  { accessorKey: 'policy_info', header: 'Policy Info', enableSorting: true },

  { accessorKey: 'covernote', header: 'Covernote', enableSorting: true },
  // { accessorKey: 'covernote_type', header: 'Covernote Type ID', enableSorting: true },
  // { accessorKey: 'policy_type', header: 'Policy Type ID', enableSorting: true },

  { accessorKey: 'issue_date', header: 'Issue Date', enableSorting: true },
  { accessorKey: 'start_date', header: 'Start Date', enableSorting: true },
  { accessorKey: 'end_date', header: 'End Date', enableSorting: true },

  { accessorKey: 'make', header: 'Vehicle Make', enableSorting: true },
  { accessorKey: 'model', header: 'Vehicle Model', enableSorting: true },
  { accessorKey: 'veh_no', header: 'Vehicle No', enableSorting: true },
  { accessorKey: 'yom', header: 'Year of Manufacture', enableSorting: true },

  { accessorKey: 'act', header: 'ACT Premium', enableSorting: true },
  { accessorKey: 'pa', header: 'PA Cover', enableSorting: true },
  { accessorKey: 'da', header: 'DA Cover', enableSorting: true },
  { accessorKey: 'basic', header: 'Basic Premium', enableSorting: true },
  { accessorKey: 'ncb', header: 'NCB (%)', enableSorting: true },
  { accessorKey: 'gst', header: 'GST (%)', enableSorting: true },
  { accessorKey: 'final_amt', header: 'Final Amount', enableSorting: true },
  { accessorKey: 'dec_value', header: 'Declared Value', enableSorting: true },
  { accessorKey: 'cubic_cap', header: 'Cubic Capacity', enableSorting: true },

  {
    accessorKey: 'add_on',
    header: 'Add-ons',
    cell: ({ row }) => {
      const addOns = row.original.add_on || [];
      return <span>{addOns.join(', ')}</span>;
    },
  },

  { accessorKey: 'coverage_type.name', header: 'Coverage Type', enableSorting: true },
  { accessorKey: 'type.name', header: 'Policy Type Name', enableSorting: true },
  { accessorKey: 'product.name', header: 'Product Name', enableSorting: true },
  // { accessorKey: 'product.type_name', header: 'Product Type', enableSorting: true },
  { accessorKey: 'company.name', header: 'Company', enableSorting: true },

  { accessorKey: 'agent.name', header: 'Agent Name', enableSorting: true },
  // { accessorKey: 'user.email', header: 'Agent Email', enableSorting: true },
  // { accessorKey: 'user.phone', header: 'Agent Phone', enableSorting: true },

  {
    accessorKey: 'payments',
    header: 'Payment Total',
    cell: ({ row }) => {
      const payments = row.original.payments || [];
      const total = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
      return <span>{total}</span>;
    },
  },

  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <DataTableRowActions
        rowData={row.original}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    ),
  },
];



// Define export columns
const exportColumns = [
  { header: "ID", accessorKey: "id" },
  { header: "Name", accessorKey: "name" },
  { header: "Email", accessorKey: "email" },
  { header: "Role", accessorKey: "role" },
]
export default function UserTable() {
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [triggerGetAllUsers] = useLazyCovernoteAllQuery()

  const { data=[], isLoading } = useCovernoteQuery({
    page: pageIndex,
    perPage: pageSize,
    // Add search, sort, etc. here if needed
  }, {
    refetchOnReconnect: true,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
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
     
       <div className="flex justify-between items-center">

      {/* <ExportMenu  columns={exportColumns} fileName="Users" /> */}

            <ExportMenu
        fileName="Users"
        fetchAllData={() => triggerGetAllUsers().unwrap().then((res) => res.data)}
        columns={[
          { header: "ID", accessorKey: "id" },
          { header: "Name", accessorKey: "name" },
          { header: "Email", accessorKey: "email" },
          { header: "Role", accessorKey: "role" },
        ]}
      />
    </div>
    <div className="overflow-auto">
      <DataTable
      columns={columns}
      data={data?.data}
      total={data?.meta?.total}
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
    </div>
  )
}
