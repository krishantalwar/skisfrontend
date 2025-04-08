import { NotificationTile } from "./NotificationTile"

// const notifications = [
//   {
//     title: "New Message",
//     description: "You received a new message from John",
//     time: "5 minutes ago",
//   },
//   {
//     title: "System Update",
//     description: "System will reboot at 2 AM",
//     time: "1 hour ago",
//   },
// ]

// export function NotificationDropdown() {
//   return (
//     <div className="absolute right-0 mt-2 w-72 bg-popover shadow-md rounded-md border z-50">
//       <div className="p-2 text-sm font-semibold border-b">Notifications</div>
      // <div className="max-h-60 overflow-auto divide-y">
      //   {notifications.length > 0 ? (
      //     notifications.map((n, idx) => (
      //       <NotificationTile key={idx} {...n} />
      //     ))
      //   ) : (
      //     <div className="p-3 text-sm text-muted-foreground">No notifications</div>
      //   )}
      // </div>
//     </div>
//   )
// }

export function NotificationDropdown() {

  const notifications = [
  {
    title: "New Message",
    description: "You received a new message from John",
    time: "5 minutes ago",
  },
  {
    title: "System Update",
    description: "System will reboot at 2 AM",
    time: "1 hour ago",
  },
]
  return (
    <div className="absolute right-0 mt-2 w-72 bg-background shadow-lg rounded-md border z-50">
      <div className="p-4 font-semibold border-b">Notifications</div>
      <div className="max-h-60 overflow-auto divide-y">
        {notifications.length > 0 ? (
          notifications.map((n, idx) => (
            <NotificationTile key={idx} {...n} />
          ))
        ) : (
          <div className="p-3 text-sm text-muted-foreground">No notifications</div>
        )}
      </div>
    </div>
  )
}
