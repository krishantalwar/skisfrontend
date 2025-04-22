// components/ui/ErrorModal.tsx
import { AlertCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ErrorModalProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  onRetry?: () => void
  retryText?: string
}

export function ErrorModal({
  open,
  onClose,
  title = "Something went wrong",
  description = "An unexpected error occurred.",
  onRetry,
  retryText = "Retry",
}: ErrorModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <AlertCircle className="mx-auto text-red-500 w-12 h-12" />
          <DialogTitle className="mt-2">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {onRetry ? (
            <Button variant="destructive" onClick={onRetry}>
              {retryText}
            </Button>
          ) : (
            <Button variant="destructive" onClick={onClose}>
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
