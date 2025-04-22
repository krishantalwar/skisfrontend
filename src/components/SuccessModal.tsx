// components/ui/SuccessModal.tsx
import { CheckCircle2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface SuccessModalProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  onConfirm?: () => void
  confirmText?: string
}

export function SuccessModal({
  open,
  onClose,
  title = "Success!",
  description = "Operation completed successfully.",
  onConfirm,
  confirmText = "OK",
}: SuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <CheckCircle2 className="mx-auto text-green-500 w-12 h-12" />
          <DialogTitle className="mt-2">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onConfirm || onClose}>{confirmText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
