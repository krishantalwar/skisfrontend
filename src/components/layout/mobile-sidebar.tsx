import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Sidebar } from "./sidebar"

export function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden p-4 bg-muted border-b flex justify-between items-center">
      <h1 className="font-bold text-lg">MyApp</h1>
      <button onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <div className="absolute z-50 top-16 left-0 w-64 h-full bg-background shadow-lg">
          <Sidebar />
        </div>
      )}
    </div>
  )
}
