// import { User } from "lucide-react"
// import { useAppDispatch, useAppSelector } from "@/store/hooks"
// import { toggleProfileDropdown } from "@/store/uiSlice"
// import { ProfileDropdown } from "./profile-dropdown"

// export function ProfileButton() {
//   const dispatch = useAppDispatch()
//   const isOpen = useAppSelector((state) => state.ui.isProfileDropdownOpen)

//   return (
//     <div className="relative">
//       <button
//         className="p-2 rounded-full hover:bg-muted"
//         onClick={() => dispatch(toggleProfileDropdown())}
//       >
//         <User className="w-5 h-5" />
//       </button>
//       {isOpen && <ProfileDropdown />}
//     </div>
//   )
// }


import { User } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import {
  toggleProfileDropdown,
  closeAllDropdowns,
} from "@/features/ui/uiSlice"
import { RootState } from "@/app/store"
import { ProfileDropdown } from "./ProfileDropdown"

import { useRef } from "react"
import { useClickOutside } from "@/hooks/useClickOutside"


export function ProfileButton() {
  const dispatch = useDispatch()
  const isOpen = useSelector((state: RootState) => state.ui.showProfileDropdown)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    dispatch(toggleProfileDropdown())
  }

  useClickOutside(dropdownRef, () => {
    if (isOpen) dispatch(closeAllDropdowns())
  })
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleClick}
        className="p-2 rounded-full hover:bg-muted"
      >
        <User className="w-5 h-5" />
      </button>
      {isOpen && <ProfileDropdown />}
    </div>
  )
}
