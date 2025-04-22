// src/layouts/DashboardLayout.tsx

import { Outlet, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  NavigationMenuIndicator
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

export default function DashboardLayout() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (

      <header className="border-b bg-background shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto p-4">
          <NavigationMenu className="w-full">
            <NavigationMenuList className="space-x-4">
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={`text-base font-medium px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                    ${isActive("/")
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/70"}`}
                >
                  Dashboard
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-4 grid grid-cols-2 gap-4 min-w-[450px] bg-popover shadow-xl rounded-lg border">
                  <NavigationMenuLink asChild>
                    <Link
                      to="/dashboard/home"
                      className={`block px-4 py-3 rounded-lg hover:bg-accent text-sm transition-colors ${isActive("/") ? "bg-accent text-accent-foreground font-semibold" : ""}`}
                    >
                      🏠 Home Overview
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/dashboard/activity"
                      className={`block px-4 py-3 rounded-lg hover:bg-accent text-sm transition-colors ${isActive("/dashboard/activity") ? "bg-accent text-accent-foreground font-semibold" : ""}`}
                    >
                      📋 Recent Activity
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={`text-base font-medium px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                    ${isActive("/dashboard/analytics")
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/70"}`}
                >
                  Analytics
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-4 grid grid-cols-2 gap-4 min-w-[450px] bg-popover shadow-xl rounded-lg border">
                  <NavigationMenuLink asChild>
                    <Link
                      to="/dashboard/analytics/overview"
                      className={`block px-4 py-3 rounded-lg hover:bg-accent text-sm transition-colors ${isActive("/dashboard/analytics/overview") ? "bg-accent text-accent-foreground font-semibold" : ""}`}
                    >
                      📈 Overview
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/dashboard/analytics/reports"
                      className={`block px-4 py-3 rounded-lg hover:bg-accent text-sm transition-colors ${isActive("/dashboard/analytics/reports") ? "bg-accent text-accent-foreground font-semibold" : ""}`}
                    >
                      📊 Reports
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={`text-base font-medium px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                    ${isActive("/dashboard/settings")
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/70"}`}
                >
                  Settings
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-4 grid grid-cols-1 gap-3 min-w-[300px] bg-popover shadow-xl rounded-lg border">
                  <NavigationMenuLink asChild>
                    <Link
                      to="/dashboard/settings/profile"
                      className={`block px-4 py-3 rounded-lg hover:bg-accent text-sm transition-colors ${isActive("/dashboard/settings/profile") ? "bg-accent text-accent-foreground font-semibold" : ""}`}
                    >
                      👤 Profile Settings
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/dashboard/settings/security"
                      className={`block px-4 py-3 rounded-lg hover:bg-accent text-sm transition-colors ${isActive("/dashboard/settings/security") ? "bg-accent text-accent-foreground font-semibold" : ""}`}
                    >
                      🔐 Security
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuIndicator className="h-1 bg-primary rounded" />
            <NavigationMenuViewport className="bg-popover border rounded-md shadow-lg" />
          </NavigationMenu>

        </div>
      </header>

  );
}
