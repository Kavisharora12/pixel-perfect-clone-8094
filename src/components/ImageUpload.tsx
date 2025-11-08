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
            glass-card relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300
            ${isDragging 
              ? 'border-primary glow-primary scale-[1.02]' 
              : 'border-upload-border hover:border-primary/50'
            }
          `}
        >
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-xl opacity-50 animate-pulse-slow" />
              <div className="relative p-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
                <Upload className="w-10 h-10 text-primary" />
              </div>
            </div>
            <div>
              <p className="text-foreground font-semibold text-lg mb-2">Drag and drop file here</p>
              <p className="text-muted-foreground text-sm">Limit 200MB per file • JPG, JPEG, PNG</p>
            </div>
            <div className="relative mt-2">
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="file-upload"
              />
              <Button 
                className="cursor-pointer bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent border-0 shadow-lg hover:shadow-xl transition-all"
              >
                Browse files
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-float">
          <div className="glass-card relative rounded-2xl p-8 border glow-primary">
            <button
              onClick={onClear}
              className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-destructive/20 hover:text-destructive transition-all hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-secondary/30 to-secondary-glow/30 border border-secondary/50">
                <Upload className="w-6 h-6 text-secondary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-foreground font-semibold text-lg truncate">{selectedImage.name}</p>
                <p className="text-muted-foreground">{formatFileSize(selectedImage.size)}</p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl blur-lg opacity-25 group-hover:opacity-50 transition-opacity" />
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Uploaded cell"
                className="relative w-full max-w-md mx-auto rounded-xl border border-border/50 shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
