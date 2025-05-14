import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table } from "@tanstack/react-table"
import { useState, useEffect ,ReactNode } from "react"
import { Search } from "lucide-react"
import { Label } from "@/components/ui/label"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  onSearch?: (value: string) => void,
  children?: ReactNode ,
  searchValue:string
}

export function DataTableToolbar<TData>({
  table,
  onSearch,
  children,
  searchValue
}: DataTableToolbarProps<TData>) {
  
  return (
    <div className="flex flex-wrap items-end gap-4">
      <div className="flex flex-col gap-1 ">
        <Label htmlFor="global-search">Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="global-search"
            placeholder="Search..."
            className="pl-9"
            value={searchValue}
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
        
      </div>

      {/* Additional filters go here */}
      {children}
    </div>
  )
}


// import { Input } from "@/components/ui/input"
// import { Table } from "@tanstack/react-table"
// import { Search } from "lucide-react"
// import { Label } from "@/components/ui/label"
// import { ReactNode, useEffect } from "react"

// interface DataTableToolbarProps<TData> {
//   table: Table<TData>
//   searchValue: string
//   onSearchChange: (value: any) => any
//     // onSearch?: (value: string) => void,
//   children?: ReactNode
// }

// export function DataTableToolbar<TData>({
//   table,
//   searchValue,
//   onSearchChange,
//   children
// }: DataTableToolbarProps<TData>) {
//   useEffect(() => {

//     const delay = setTimeout(() => {
//             console.log("delay",searchValue)
//       onSearchChange(searchValue)
//     }, 500)
//     return () => clearTimeout(delay)
//   }, [searchValue])

//   return (
//     <div className="flex flex-wrap items-end gap-4">
//       <div className="flex flex-col gap-1">
//         <Label htmlFor="global-search">Search</Label>
//         <div className="relative">
//           <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//           <Input
//             id="global-search"
//             placeholder="Search..."
//             className="pl-9"
//             value={searchValue}
//             onChange={(e) => {
//               // console.log()
//                    console.log("onChange")
//               onSearchChange(e.target.value)

//             }}
//           />
//         </div>
//       </div>

//       {children}
//     </div>
//   )
// }
