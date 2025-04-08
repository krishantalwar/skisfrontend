import { Link, useLocation } from "react-router-dom"
import { Home, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Dashboard", icon: Home, href: "/" },
  { name: "Profile", icon: User, href: "/profile" },
]

export function Sidebar({ isOpen }: { isOpen: boolean }) {
  const { pathname } = useLocation()

  return (
    <aside className="h-full flex flex-col gap-2 p-2 bg-background transition-all duration-300 ease-in-out">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out hover:bg-accent hover:text-accent-foreground",
              pathname === item.href && "bg-accent text-primary",
              isOpen ? "gap-3 justify-start" : "justify-center"
            )}
          >
            <item.icon className="w-5 h-5 shrink-0 transition-all duration-300 ease-in-out" />
            <span
              className={cn(
                "whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out",
                isOpen
                  ? "opacity-100 ml-2 translate-x-0"
                  : "opacity-0 -translate-x-2 pointer-events-none w-0 ml-0"
              )}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
