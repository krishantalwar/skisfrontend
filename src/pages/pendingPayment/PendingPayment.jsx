import {
  usePendingPaymentQuery
  ,useLazyPendingPaymentAllQuery} from '@/features/covernote/service'
import { Button } from '@/components/ui/button'
import { useState ,useMemo,useEffect} from 'react'
import { DataTable } from "@/components/table/DataTable"
import { DataTableRowActions } from "@/components/table/DataTableRowActions"
import { ExportMenu } from "@/components/table/ExportMenueServer"



const columns = [
  { accessorKey: 'covernote', header: 'Covernote', enableSorting: true },
  { accessorKey: 'insured_name', header: 'Customer Name', enableSorting: true },
  { accessorKey: 'agent_name', header: 'Agent Name', enableSorting: true },

    { accessorKey: 'veh_no', header: 'Veh No', enableSorting: true },
  { accessorKey: 'make', header: 'Make', enableSorting: true },
  { accessorKey: 'model', header: 'Model', enableSorting: true },


  { accessorKey: 'total_price', header: 'Final Price', enableSorting: true },
  { accessorKey: 'amount_received', header: 'Amount Received', enableSorting: true },
  { accessorKey: 'amount_pending', header: 'Amount Pending', enableSorting: true },

];

// Define export columns
const exportColumns = [
  { header: "ID", accessorKey: "id" },
  { header: "Name", accessorKey: "name" },
  { header: "Email", accessorKey: "email" },
  { header: "Role", accessorKey: "role" },
]
export default function PendingPayment() {
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [searchTerm, setSearchTerm] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("")

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 500) // 500ms debounce
    return () => clearTimeout(timeout)
  }, [searchTerm])

const queryParams = useMemo(() => ({
    page: pageIndex,
    perPage: pageSize,
    search: debouncedSearch, // if your API supports it
    // Add search, sort, etc. here if needed
    create_date:currentDate
    // search: searchTerm,
}), [pageIndex, pageSize, debouncedSearch,currentDate]);


  const [triggerGetAllUsers] = useLazyPendingPaymentAllQuery()



  const { data=[], isLoading ,refetch:refetchCovernoteQuery} = usePendingPaymentQuery(queryParams, {
    refetchOnReconnect: true,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Users</h1>
     
       <div className="flex justify-between items-center">

      {/* <ExportMenu  columns={exportColumns} fileName="Users" /> */}

        <ExportMenu
        fileName="Users"
        fetchAllData={() => triggerGetAllUsers(queryParams).unwrap().then((res) => res.data)}
        columns={columns}
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
      // onSearch={((ee)=>{refetchCovernoteQuery(ee)})}
    //   onSearch={(term) => {
    //   setSearchTerm(term);
    //   setPageIndex(1);
    // }}
      searchValue={searchTerm}
      onSearch={(value) => {
        setSearchTerm(value)
        setPageIndex(1)
      }}
    //   toolbarContent={<UserFilters 
    //   createdDate={currentDate}
    //   onFilterChange={(e) => {
     
    //     setCurrentDate(e);
    //     setPageIndex(1);
    //   }} 
    
    // onReset={()=>{
    //     setSearchTerm("");
    //     setCurrentDate("");
    //     setPageIndex(1);
    // }}/>}

  //    renderToolbar={(table) => (
  //   <DataTableToolbar table={table} onSearch={(val) => setSearchQuery(val)}>
  //     <Select onValueChange={(value) => setStatusFilter(value)}>
  //       <SelectTrigger className="w-[120px]">
  //         <SelectValue placeholder="Status" />
  //       </SelectTrigger>
  //       <SelectContent>
  //         <SelectItem value="active">Active</SelectItem>
  //         <SelectItem value="inactive">Inactive</SelectItem>
  //       </SelectContent>
  //     </Select>

  //     {/* Add more custom filters here */}
  //   </DataTableToolbar>
  // )}
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
