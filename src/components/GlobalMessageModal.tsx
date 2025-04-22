import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { hideMessage } from "@/features/ui/globalMessageSlice";
import { AlertCircle } from "lucide-react";
import { CheckCircle2 } from "lucide-react";

export const GlobalMessageModal = () => {
  const dispatch = useAppDispatch();
  const { show, title, description, type } = useAppSelector(
    (state) => state?.globalMessage
  );

  return (
    // <Dialog open={show} >
    <Dialog open={show} 
    onOpenChange={() => dispatch(hideMessage())}
    // closeOnOverlayClick={false} // Prevent closing when clicking outside
    modal={true}
    >
      <DialogContent className="bg-white text-black dark:bg-gray-800 dark:text-white"
      onEscapeKeyDown={(e) => e.preventDefault()}
      onPointerDown={(e) => e.preventDefault()}
      onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          {/* Icon conditional rendering based on message type */}
          {type === "success" ? (
            <CheckCircle2 className="mx-auto text-green-500 w-12 h-12" />
          ) : (
            <AlertCircle className="mx-auto text-red-500 w-12 h-12" />
          )}

          {/* Title with dynamic color based on type */}
          <DialogTitle
            className={type === "error" ? "text-red-500" : "text-green-500"}
          >
            {title}
          </DialogTitle>

          {/* Description if provided */}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {/* Button with dark/light mode support */}
        <Button 
        onClick={() => dispatch(hideMessage())}
        className="bg-blue-500 text-white dark:bg-gray-600 dark:hover:bg-blue-500 hover:bg-blue-600 transition-colors duration-300 ease-in-out">
          OK
        </Button>

      </DialogContent>
    </Dialog>
  );
};
