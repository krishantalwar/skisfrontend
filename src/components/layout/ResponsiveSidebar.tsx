import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Sidebar } from "./sidebar"

export function ResponsiveSidebar({ children }: { children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="flex min-h-screen border">
        {/* Main Area */}
        <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-muted">

        {isOpen?<h1 className="text-lg font-semibold">MyApp</h1>:""
        }
          <button onClick={() => setIsOpen(!isOpen)} >
            {isOpen ? <Menu size={20} className="w-5 h-5" /> : <Menu  size={20} className="w-5 h-5" />}
          </button>
        </div>

      {/* Sidebar */}
      <div
        className={`transition-all duration-300  ease-in-out  ${
          isOpen ? "w-64" : "w-0"
        } overflow-hidden border-r bg-background`}
      >
      </div>
        <Sidebar isOpen={isOpen} />
      </div>
    </div>
  )
}
