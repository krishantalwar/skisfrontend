import React, { useEffect, useRef, useState } from "react";
import { useController, Control } from "react-hook-form";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import ThumbnailGenerator from "@uppy/thumbnail-generator";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";

import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
// import { FaFilePdf, FaFileWord, FaFileExcel } from "react-icons/fa";
import { FileSpreadsheet,FileText ,Image   } from "lucide-react"

type FileUploadProps = {
  name: string;
  control: Control<any>;
  label?: string;
  maxFiles?: number;
  maxFileSize?: number; // in bytes
  accept?: string[]; // e.g., ['image/*', 'application/pdf']
  multiple?: boolean;
  showProgress?: boolean;
  showThumbnails?: boolean;
  className?: string;
};

export const FileUpload: React.FC<FileUploadProps> = ({
  name,
  control,
  label,
  maxFiles = 1,
  maxFileSize = 5 * 1024 * 1024, // 5MB
  accept = ["*/*"],
  multiple = false,
  showProgress = true,
  showThumbnails = true,
  className,
}) => {
  const uppyInstance = useRef<Uppy.Uppy | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control });

  // Helper function to get icon based on file type
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "application/pdf":
        return  <FileSpreadsheet className="mx-auto text-red-500 w-12 h-12" />;
      case "application/msword":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return <FileSpreadsheet className="mx-auto text-red-500 w-12 h-12" />;
      case "application/vnd.ms-excel":
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        return  <FileSpreadsheet className="mx-auto text-red-500 w-12 h-12" />;
      case "image/png":
      // case "image/jpeg":
      case "image/gif":
      case "image/webp":
        return <Image className="mx-auto text-red-500 w-12 h-12" />;
      default:
        return <div className="text-gray-400">File</div>;
    }
  };


  useEffect(() => {
    const uppy = new Uppy({
      restrictions: {
        maxNumberOfFiles: maxFiles,
        maxFileSize,
        allowedFileTypes: accept,
      },
      autoProceed: false,
    });

    if (showThumbnails) {
      uppy.use(ThumbnailGenerator, {
        thumbnailWidth: 200,
      });

      uppy.on("thumbnail:generated", (file, preview) => {
        console.log("Thumbnail generated:", file.name);
      });
    }

    uppy.on("file-added", () => {
      const files = uppy.getFiles();
      onChange(multiple ? files : files[0]);
    });

    uppy.on("file-removed", () => {
      const files = uppy.getFiles();
      onChange(multiple ? files : files[0] || null);
    });

    uppyInstance.current = uppy;
    setIsMounted(true);

    return () => {
      uppyInstance.current?.destroy();
      // uppyInstance.current = null;
      // uppy.close();
      // uppyInstance.current = null;
      // uppyInstance.current?.cancelAll()
      // uppyInstance.current = uppy;
      setIsMounted(false);
    };
  }, [accept, maxFileSize, maxFiles, multiple, onChange, showThumbnails]);

  return (
    <FormItem className={cn("space-y-2", className)}>
      {label && <FormLabel>{label}</FormLabel>}

      <div className="w-full">
        {isMounted && uppyInstance.current && (
          <Dashboard
            uppy={uppyInstance.current}
            proudlyDisplayPoweredByUppy={false}
            showProgressDetails={showProgress}
            hideUploadButton
            hideCancelButton
            hidePauseResumeButton
            hideRetryButton
            height={300}
            width="100%"
              // Here, you can inject custom thumbnails/icons into the dashboard
            fileCard={(file:any) => {
              const fileType = file.type || "unknown";
              return (
                <div className="flex flex-col items-center justify-center p-2">
                  {getFileIcon(fileType)}
                  <span className="text-sm mt-2">{file.name}</span>
                </div>
              );
            }}
            
          />
        )}
      </div>

      <FormMessage />
    </FormItem>
  );
};
