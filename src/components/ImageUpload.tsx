import { useState, useCallback } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
  onClear: () => void;
}

export const ImageUpload = ({ onImageSelect, selectedImage, onClear }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onImageSelect(file);
      }
    }
  }, [onImageSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      onImageSelect(files[0]);
    }
  }, [onImageSelect]);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!selectedImage ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-lg p-12 text-center transition-colors
            ${isDragging 
              ? 'border-primary bg-upload-area/50' 
              : 'border-upload-border bg-upload-area'
            }
          `}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 rounded-full bg-secondary/50">
              <Upload className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <p className="text-foreground font-medium mb-1">Drag and drop file here</p>
              <p className="text-muted-foreground text-sm">Limit 200MB per file • JPG, JPEG, PNG</p>
            </div>
            <div className="relative">
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="file-upload"
              />
              <Button variant="outline" className="cursor-pointer">
                Browse files
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative border border-border rounded-lg p-6 bg-card">
            <button
              onClick={onClear}
              className="absolute top-4 right-4 p-1 rounded-full bg-background hover:bg-secondary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded bg-secondary/50">
                <Upload className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-foreground font-medium truncate">{selectedImage.name}</p>
                <p className="text-muted-foreground text-sm">{formatFileSize(selectedImage.size)}</p>
              </div>
            </div>
            <div className="mt-6">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Uploaded cell"
                className="w-full max-w-md mx-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
