import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { DownloadIcon } from "lucide-react"
import { exportToExcel, exportToPDF } from "@/lib/exporters"

interface ExportMenuProps {
  data: any[]
  columns: { header: string; accessorKey: string }[]
  fileName: string
}

export function ExportMenu({ data, columns, fileName }: ExportMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto gap-2">
          <DownloadIcon className="w-4 h-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => exportToExcel(data, columns, fileName)}>Export to Excel</DropdownMenuItem>
        <DropdownMenuItem onClick={() => exportToPDF(data, columns, fileName)}>Export to PDF</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
