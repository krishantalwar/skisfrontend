export function ProfileDropdown() {
    return (
      <div className="absolute right-0 mt-2 w-48 bg-background shadow-lg rounded-md border z-50">
        <ul>
          <li className="px-4 py-2 hover:bg-muted cursor-pointer">Profile</li>
          <li className="px-4 py-2 hover:bg-muted cursor-pointer">Logout</li>
        </ul>
      </div>
    )
  }
  