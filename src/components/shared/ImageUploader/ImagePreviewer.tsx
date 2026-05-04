"use client";

import Image from "next/image";
import { X } from "lucide-react";

type TImagePreviewer = {
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  imagePreview: string[];
  setImagePreview: React.Dispatch<React.SetStateAction<string[]>>;
  existingImage?: string;
  setExistingImage?: React.Dispatch<React.SetStateAction<string | null>>;
};

const ImagePreviewer = ({
  setImageFiles,
  imagePreview,
  setImagePreview,
  existingImage,
  setExistingImage,
}: TImagePreviewer) => {
  const handleRemove = () => {
    setImageFiles([]);
    setImagePreview([]);

    if (existingImage && setExistingImage) {
      setExistingImage("");
    }
  };

  const displayImage =
    imagePreview.length > 0 ? imagePreview[0] : existingImage;

  if (!displayImage) return null;

  return (
    <div className="relative h-40 w-full overflow-hidden rounded-lg border border-dashed border-purple-400/30 bg-[#0b1222]">
      <Image
        src={displayImage}
        alt="Project preview"
        width={800}
        height={400}
        className="h-full w-full object-cover"
        priority
      />

      <button
        type="button"
        onClick={handleRemove}
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default ImagePreviewer;
