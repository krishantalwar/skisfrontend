import { ThemeToggle } from "@/components/navbar/theme-toggle"
import { ResponsiveSidebar } from "./ResponsiveSidebar"
import { Navbar } from "@/components/navbar/Navbar"
import { GlobalMessageModal } from "@/components/GlobalMessageModal"
import LoaderOverlay from "@/components/LoaderOverlay"


import { Outlet,useLocation  } from "react-router-dom";

export function Layout() {
  const location = useLocation();

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen">
        {/* <ResponsiveSidebar />    */}
        <Navbar />
      <div className="flex-1">
        <main className="p-6">
          <div className="flex justify-end mb-4  mt-0 pt-0">
            {/* <ThemeToggle /> */}
        
          </div>
          <LoaderOverlay />
          <GlobalMessageModal/>

          <Outlet/>
        </main>
      </div>
    </div>
  )
}
