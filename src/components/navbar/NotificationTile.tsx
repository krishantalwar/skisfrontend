interface NotificationTileProps {
    title: string
    description: string
    time: string
  }
  
  export function NotificationTile({ title, description, time }: NotificationTileProps) {
    return (
      <div className="px-3 py-2 hover:bg-muted rounded-md cursor-pointer transition-colors">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
        <div className="text-[10px] text-muted-foreground mt-1">{time}</div>
      </div>
    )
  }
  