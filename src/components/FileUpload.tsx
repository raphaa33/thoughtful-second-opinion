import { UploadCloud } from "lucide-react";
import { useState } from "react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export const FileUpload = ({ onFileSelect }: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    onFileSelect(file);
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`relative rounded-lg border-2 border-dashed p-6 transition-colors ${
          dragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="absolute inset-0 cursor-pointer opacity-0"
          onChange={handleChange}
          accept="image/*,.pdf,.doc,.docx"
        />
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <UploadCloud className="h-8 w-8 text-muted-foreground/50" />
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Drag & drop files here or click to select
            </p>
            <p className="text-xs text-muted-foreground">
              Supports images, PDFs, and documents
            </p>
          </div>
        </div>
      </div>

      {preview && (
        <div className="mt-4 rounded-lg border p-2">
          <img
            src={preview}
            alt="Preview"
            className="mx-auto max-h-48 rounded object-contain"
          />
        </div>
      )}
    </div>
  );
};