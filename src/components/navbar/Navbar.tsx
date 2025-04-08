// import { SearchBar } from "./SearchBar"
// import { NotificationButton } from "./NotificationButton"
// import { ProfileDropdown } from "./ProfileDropdown"
// import { ThemeToggle } from "@/components/navbar/theme-toggle"

// export function Navbar() {
//   return (
//     <header className="w-full px-4 py-2 border-b bg-background flex items-center justify-between gap-4">
//       <SearchBar />

//       <div className="flex items-center gap-4">
//         <NotificationButton />
//         <ThemeToggle />
//         <ProfileDropdown />
//       </div>
//     </header>
//   )
// }

import { SearchBar } from "./SearchBar"
import { NotificationButton } from "./NotificationButton"
import { ProfileButton } from "./ProfileButton"
import { ThemeToggle } from "@/components/navbar/theme-toggle"

export function Navbar() {
  return (
    <header className="w-full flex items-center justify-between px-4 py-2 border-b bg-background">
      <SearchBar />
      <div className="flex items-center gap-4">
        <NotificationButton />
        <ProfileButton />
        <ThemeToggle />
      </div>
    </header>
  )
}

