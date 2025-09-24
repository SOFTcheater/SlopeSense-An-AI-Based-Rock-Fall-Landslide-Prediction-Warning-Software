import * as React from "react";
import { Upload, File, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface FileUploadProps {
  accept: string;
  label: string;
  description?: string;
  onFileSelect: (file: File | null) => void;
  selectedFile?: File | null;
  disabled?: boolean;
  className?: string;
}

export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({ accept, label, description, onFileSelect, selectedFile, disabled, className }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      onFileSelect(file);
    };

    const handleRemoveFile = () => {
      onFileSelect(null);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    };

    const handleClick = () => {
      if (disabled) return;
      inputRef.current?.click();
    };

    return (
      <div className={cn("space-y-2", className)}>
        <label className="text-sm font-medium text-foreground">{label}</label>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        
        <div
          onClick={handleClick}
          className={cn(
            "relative border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer",
            "hover:border-primary/50 hover:bg-accent/5",
            "focus-within:border-primary focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
            disabled && "opacity-50 cursor-not-allowed hover:border-border hover:bg-transparent",
            selectedFile ? "border-primary/30 bg-accent/10" : "border-border"
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            disabled={disabled}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            {...(ref && { ref })}
          />
          
          {selectedFile ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <File className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile();
                }}
                disabled={disabled}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <div className="mt-4">
                <p className="text-sm font-medium text-foreground">
                  {disabled ? "Login to upload files" : "Click to upload file"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Supported formats: {accept.split(',').join(', ')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";