import { DataTableToolbar } from "@/components/table/DataTableToolbar"
import { DataTablePagination } from "@/components/table/DataTablePagination"
import { ExportMenu } from "@/components/table/ExportMenu"
import { Table, flexRender } from "@tanstack/react-table"

interface AgentGroupTableProps<TData> {
  groupedData: {
    agentName: string
    records: TData[]
    basicTotal: number
    grandTotal: number
  }[]
  grandBasic: number
  grandFinalTotal: number
  columns: any[]  // Your column definition
  fetchAllData: () => Promise<any[]>  // for ExportMenu
  fileName: string
}

export function AgentGroupTable<TData>({
  groupedData,
  grandBasic,
  grandFinalTotal,
  columns,
  fetchAllData,
  fileName,
}: AgentGroupTableProps<TData>) {
  return (
    <div className="space-y-8">
      {/* Toolbar and Export */}
      <div className="flex justify-between items-center">
        <DataTableToolbar table={{} as Table<TData>} /> {/* You can ignore passing table for now if not needed */}
        <ExportMenu fetchAllData={fetchAllData} columns={columns} fileName={fileName} />
      </div>

      {/* Agent-wise groups */}
      {groupedData.map((group) => (
        <div key={group.agentName}>
          <h2 className="text-xl font-bold my-4">{group.agentName}</h2>

          {/* Table */}
          <div className="border rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  {columns.map((col) => (
                    <th key={col.accessorKey} className="p-2 text-left">{col.header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {group.records.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b">
                    {columns.map((col) => (
                      <td key={col.accessorKey} className="p-2">
                        {row[col.accessorKey]}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Subtotal row for agent */}
                <tr className="bg-green-700 text-white font-bold">
                  {columns.map((col, colIndex) => {
                    if (col.accessorKey === "basic") {
                      return <td key={col.accessorKey} className="p-2">{group.basicTotal}</td>
                    }
                    if (col.accessorKey === "total") {
                      return <td key={col.accessorKey} className="p-2">{group.grandTotal}</td>
                    }
                    return <td key={col.accessorKey}></td>
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Grand Total row */}
      <div className="text-right text-lg font-bold mt-8">
        Grand total basic: {grandBasic}, Grand total final: {grandFinalTotal}
      </div>
    </div>
  )
}
