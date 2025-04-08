import * as React from "react"

export function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={`bg-white dark:bg-zinc-900 rounded-2xl shadow p-4 ${className}`}>{children}</div>
}

export function CardContent({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={className}>{children}</div>
}
