import { ThemeToggle } from "@/components/navbar/theme-toggle"
import { ResponsiveSidebar } from "./ResponsiveSidebar"
import { Navbar } from "@/components/navbar/Navbar"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
        <ResponsiveSidebar />   
      <div className="flex-1">
        <main className="p-6">
          <div className="flex justify-end mb-4  mt-0 pt-0">
            {/* <ThemeToggle /> */}
          <Navbar />
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}
