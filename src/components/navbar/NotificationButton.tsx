import { Bell } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import {
  toggleNotificationDropdown,
  closeAllDropdowns,
} from "@/features/ui/uiSlice"
import { RootState } from "@/app/store"
import { NotificationDropdown } from "./NotificationDropdown"
import { useRef } from "react"
import { useClickOutside } from "@/hooks/useClickOutside"


export function NotificationButton() {
  const dispatch = useDispatch()
  const isOpen = useSelector(
    (state: RootState) => state.ui.showNotificationDropdown
  )
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    dispatch(toggleNotificationDropdown())
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
        <Bell className="w-5 h-5" />
      </button>
      {isOpen && <NotificationDropdown />}
    </div>
  )
}
