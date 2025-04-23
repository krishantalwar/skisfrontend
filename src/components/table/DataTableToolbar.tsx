import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table } from "@tanstack/react-table"
import { useState, useEffect } from "react"
import { Search } from "lucide-react"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  onSearch?: (value: string) => void
}

export function DataTableToolbar<TData>({
  table,
  onSearch,
}: DataTableToolbarProps<TData>) {
  const [searchValue, setSearchValue] = useState("")

  // Debounce input (optional, better UX)
  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch?.(searchValue)
    }, 500)
    return () => clearTimeout(delay)
  }, [searchValue])

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          className="pl-9"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      {/* Future filters here */}
    </div>
  )
}
