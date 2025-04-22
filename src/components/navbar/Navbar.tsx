import { SearchBar } from "./SearchBar"
import { NotificationButton } from "./NotificationButton"
import { ProfileButton } from "./ProfileButton"
import { ThemeToggle } from "@/components/navbar/theme-toggle"
import NavigationMenu from "./NavigationMenu"

export function Navbar() {
  return (
    <header className="w-full flex items-center justify-between px-4 py-2 border-b bg-background">
      <NavigationMenu/>
      <div className="flex items-center gap-4">.
      <SearchBar />
        <NotificationButton />
        
        <ThemeToggle />
        <ProfileButton />
      </div>
    </header>
  )
}

