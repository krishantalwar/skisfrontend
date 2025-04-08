import { ThemeProvider as Theme } from "next-themes"
import { ReactNode } from "react"

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <Theme attribute="class" defaultTheme="light" enableSystem>
      {children}
    </Theme>
  )
}
