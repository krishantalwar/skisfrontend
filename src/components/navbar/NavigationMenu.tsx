// src/layouts/NavLayout.tsx

import { Outlet, useLocation, Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  NavigationMenuIndicator,
} from "@/components/ui/navigation-menu";
// import { navItems } from "@/config/navItems"; // Your new config
import { Home, User } from "lucide-react"

const navItems = [
  { name: "Dashboard", icon: Home, href: "/" },
  
  { 
    name: "Insert Covernotes", 
    icon: Home, href: "#",
    Children:[
      { name: "Motor", icon: Home, href: "/MotorForm" },
      { name: "Non Motor", icon: User, href: "/NonMotorForm" },
      { name: "Health", icon: User, href: "/HealthForm" },
      { name: "Lic", icon: User, href: "/LicForm" },
    ]

   },
   { name: "All Covernote", icon: Home, href: "/Covernote" },
]

export default function NavLayout() {
  const location = useLocation();

  // Function to check if the current location matches the path
  const isActive = (path: string) => location.pathname===path
  // console.log(location.pathname);
  // console.log(isActive);
  const hasActiveChild = (item: any) =>
    item.Children?.some((child: any) => location.pathname === child.href);


  return (
    <header className=" bg-background shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto p-4">
        <NavigationMenu className="w-full">
          <NavigationMenuList className="space-x-4">
            {/* Map through navItems to dynamically generate menu items */}
            {navItems.map((item, index) => {
                const hasChildren = item.Children && item.Children.length > 0;
              return (
                <NavigationMenuItem key={index}>

                {/* Conditional rendering of nested Children */}
                 {hasChildren ? (
                  <>
                                  {/* Trigger for the dropdown */}
                <NavigationMenuTrigger
                  className={`text-base font-medium px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                    ${
                      hasActiveChild(item)
                        ? "bg-accent text-accent-foreground font-semibold"
                        :""
                    }`}
                >
                  {item.name}
                </NavigationMenuTrigger>

                  
                  <NavigationMenuContent className="p-4 grid grid-cols-1 gap-3 min-w-[300px] bg-popover shadow-xl rounded-lg border">
                    {item.Children.map((child, childIndex) => (
                      <NavigationMenuLink asChild key={childIndex}>
                        <Link
                          to={child.href}
                          className={`block px-4 py-1 rounded-lg hover:bg-accent text-sm transition-colors ${
                            isActive(child.href)
                              ? "bg-accent text-accent-foreground font-semibold"
                              : ""
                          }`}
                        >
                                  {/* Icon inline with text */}
        <div className="flex items-center space-x-2">
          {child.icon && (
            <child.icon className="w-5 h-5 shrink-0 transition-all duration-300 ease-in-out" />
          )}
          <span>{child.name}</span>
        </div>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </NavigationMenuContent>
                  </>
                ): (
                  <NavigationMenuLink asChild>
                  <Link
                    to={item.href}
                    className={ `flex text-base font-medium px-4 py-2 rounded-md transition-colors
                      ${isActive(item.href) ? 
                        "bg-accent text-accent-foreground font-semibold"
                        : ""

                      }`
                      }
                  >

                    <div className="flex items-center space-x-2">
                      {item.icon && (
                        <item.icon className="w-5 h-5 shrink-0 transition-all duration-300 ease-in-out" />
                      )}
                      <span>{item.name}</span>
                    </div>
                  </Link>
           
                </NavigationMenuLink>
                
                )}
              </NavigationMenuItem>
              )
})}
          </NavigationMenuList>
          <NavigationMenuIndicator className="h-1 bg-primary rounded" />
          <NavigationMenuViewport className="bg-popover border rounded-md shadow-lg" />
        </NavigationMenu>
      </div>
    </header>
  );
}
