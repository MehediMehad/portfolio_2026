"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { UploadCloud } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type TImageUploader = {
  label?: string;
  className?: string;
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setImagePreview: React.Dispatch<React.SetStateAction<string[]>>;
};

const ImageUploader = ({
  label = "Click to upload or drag and drop",
  className,
  setImageFiles,
  setImagePreview,
}: TImageUploader) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      event.target.value = "";
      return;
    }

    setImageFiles([file]);

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview([reader.result as string]);
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  return (
    <div className={cn("relative w-full", className)}>
      <Input
        id="project-image-upload"
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        className="hidden"
        onChange={handleImageChange}
      />

      <label
        htmlFor="project-image-upload"
        className="flex h-28 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-purple-400/30 bg-[#0b1222] text-center text-gray-400 transition hover:border-purple-400"
      >
        <UploadCloud size={30} className="mb-2 text-gray-300" />
        <span className="text-sm">{label}</span>
        <span className="text-xs">PNG, JPG, JPEG, WEBP Max 5MB</span>
      </label>
    </div>
  );
};

export default ImageUploader;
