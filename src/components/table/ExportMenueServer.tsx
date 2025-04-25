import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { DownloadIcon } from "lucide-react"
import { exportToExcel, exportToPDF } from "@/lib/exporters"

interface ExportMenuProps {
  fetchAllData: () => Promise<any[]> // function to fetch all records from server
  columns: { header: string; accessorKey: string }[]
  fileName: string
}

export function ExportMenu({ fetchAllData, columns, fileName }: ExportMenuProps) {
  const handleExport = async (type: "excel" | "pdf") => {
    try {
      const allData = await fetchAllData()
      if (!allData || !Array.isArray(allData)) return

      if (type === "excel") exportToExcel(allData, columns, fileName)
      else exportToPDF(allData, columns, fileName)
    } catch (err) {
      console.error("Export error:", err)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto gap-2">
          <DownloadIcon className="w-4 h-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleExport("excel")}>Export All to Excel</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("pdf")}>Export All to PDF</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
