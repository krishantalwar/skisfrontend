import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Button } from "@/components/ui/button"
  import { MoreHorizontal } from "lucide-react"
  
  interface RowActionsProps<TData> {
    rowData: TData
    onEdit?: (row: TData) => void
    onDelete?: (row: TData) => void
  }
  
  export function DataTableRowActions<TData>({
    rowData,
    onEdit,
    onDelete,
  }: RowActionsProps<TData>) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {onEdit && (
            <DropdownMenuItem onClick={() => onEdit(rowData)}>
              Edit
            </DropdownMenuItem>
          )}
          {onDelete && (
            <DropdownMenuItem
              onClick={() => onDelete(rowData)}
              className="text-red-600 focus:text-red-600"
            >
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  