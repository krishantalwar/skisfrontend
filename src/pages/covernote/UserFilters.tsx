import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface UserFiltersProps {
  onFilterChange?: (value: string) => void
  onReset?: () => void
  createdDate: string
}

export function UserFilters({ onFilterChange,onReset,createdDate }: UserFiltersProps) {
  // const [status, setStatus] = useState("")

  // useEffect(() => {
  //   if (!onFilterChange) return
  //   onFilterChange(status)
  // }, [status])

  return (
    <>
    
    <div className="flex flex-col gap-1 ">
      <Label htmlFor="created-date">Created Date</Label>
      <Input
        id="created-date"
        type="date"
        value={createdDate}
        onChange={(e) => onFilterChange?.(e.target.value)}
      />

    </div>
      <Button onClick={onReset}>Reset</Button>
    </>
)
}
