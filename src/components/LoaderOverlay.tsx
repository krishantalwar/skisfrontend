import { Loader2 } from "lucide-react"
// import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import {  useAppSelector } from "@/hooks/hooks";
interface LoaderOverlayProps {
  /**
   * Whether the loader is visible
   */
  isLoading?: boolean
  /**
   * Optional text to display below the spinner
   */
  loadingText?: string
  /**
   * Optional class name for additional styling
   */
  className?: string
}

export default function LoaderOverlay() {
  // const { theme } = useTheme()
const { isLoading, loadingText = "Loading...", className, } : LoaderOverlayProps = useAppSelector(
    (state) => state?.globalLoaderOverlay
  );

  if (!isLoading) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "bg-background/80 backdrop-blur-sm",
        "dark:bg-background/90",
        className,
      )}
    >
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        {loadingText && <p className="text-lg font-medium text-foreground">{loadingText}</p>}
      </div>
    </div>
  )
}
