"use client";

import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Tag, Type } from "lucide-react";
import { toast } from "sonner";

import ImagePreviewer from "@/components/shared/ImageUploader/ImagePreviewer";
import ImageUploader from "@/components/shared/ImageUploader/ImageUploader";
import SingleSelect from "@/components/shared/SingleSelect";
import { createBlog } from "@/services/blogs";
import { BlogType } from "@/types";

const QuillEditor = dynamic(
  () => import("@/components/shared/TextEditor/QuillEditor"),
  {
    ssr: false,
    loading: () => <p className="text-muted-foreground">Loading...</p>,
  },
);

const QuillViewer = dynamic(
  () => import("@/components/shared/TextEditor/QuillViewer"),
  {
    ssr: false,
    loading: () => <p className="text-muted-foreground">Loading...</p>,
  },
);

const blogTypes: BlogType[] = [
  "Tech",
  "Personal",
  "Lifestyle",
  "Health",
  "Travel",
  "Food",
  "Entertainment",
  "Education",
];

const blogTypeOptions = blogTypes.map((type) => ({
  value: type,
  label: type,
}));

const createBlogSchema = z.object({
  title: z.string().min(5, "Blog title at least 5 characters long"),
  overview: z.string().min(10, "Blog overview at least 10 characters long"),
  content: z
    .string()
    .min(30, "Blog content at least 30 characters long")
    .refine((value) => value.replace(/<(.|\n)*?>/g, "").trim().length > 0, {
      message: "Blog content is required",
    }),
  tags: z.string().min(1, "At least one tag is required"),
  type: z.enum(blogTypes, {
    message: "Blog type is required",
  }),
});

type CreateBlogFormData = z.infer<typeof createBlogSchema>;

const CreateBlogForm = () => {
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [isPreview, setIsPreview] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateBlogFormData>({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      title: "",
      overview: "",
      content: "",
      tags: "",
      type: "Tech",
    },
  });

  const onSubmit: SubmitHandler<CreateBlogFormData> = async (data) => {
    try {
      if (imageFiles.length === 0) {
        toast.error("Blog image is required");
        return;
      }

      const formattedData = {
        title: data.title,
        overview: data.overview,
        content: data.content,
        tags: data.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        type: data.type,
      };

      const formData = new FormData();
      formData.append("image", imageFiles[0]);
      formData.append("data", JSON.stringify(formattedData));

      const result = await createBlog(formData);

      if (!result.success) {
        toast.error(result.message || "Failed to create blog");
        return;
      }

      toast.success(result.message || "Blog created successfully");
      reset();
      setImageFiles([]);
      setImagePreview([]);
      router.push("/dashboard/blogs");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full text-white">
      <div className="mb-7 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Create Blog</h1>
          <p className="mt-2 text-sm text-gray-400">
            Add your blog details. All fields marked with * are required.
          </p>
        </div>

        <button
          form="create-blog-form"
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-linear-to-br from-purple-500 to-indigo-500 px-6 py-3 font-semibold shadow-[0_0_20px_rgba(168,85,247,0.35)] transition hover:scale-[1.02] disabled:opacity-60"
        >
          + {isSubmitting ? "Adding..." : "Add Blog"}
        </button>
      </div>

      <form
        id="create-blog-form"
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-5 xl:grid-cols-2"
      >
        <div className="rounded-xl border border-white/10 bg-[#070d1a]/80 p-6 shadow-[0_0_40px_rgba(168,85,247,0.08)]">
          <h2 className="mb-7 text-lg font-semibold text-purple-400">
            Blog Information
          </h2>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Blog Image <span className="text-red-400">*</span>
              </label>

              {imageFiles.length === 1 ? (
                <ImagePreviewer
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                  setImageFiles={setImageFiles}
                />
              ) : (
                <ImageUploader
                  label="Click to upload or drag and drop"
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                />
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Blog Title <span className="text-red-400">*</span>
              </label>

              <div className="relative">
                <Type
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  {...register("title")}
                  placeholder="e.g. How Music Boosts Productivity While Coding"
                  className="w-full rounded-lg border border-white/10 bg-[#0b1222] py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
                />
              </div>

              {errors.title && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Short Overview <span className="text-red-400">*</span>
              </label>

              <textarea
                {...register("overview")}
                rows={4}
                placeholder="Write a short overview about your blog..."
                className="w-full resize-none rounded-lg border border-white/10 bg-[#0b1222] p-4 text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
              />

              {errors.overview && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.overview.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Blog Type <span className="text-red-400">*</span>
              </label>

              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <SingleSelect
                    value={field.value}
                    onChange={field.onChange}
                    options={blogTypeOptions}
                    placeholder="Select blog type"
                    searchPlaceholder="Search blog type..."
                    emptyMessage="No blog type found."
                  />
                )}
              />

              {errors.type && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.type.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Tags <span className="text-red-400">*</span>
              </label>

              <div className="relative">
                <Tag
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  {...register("tags")}
                  placeholder="Music, Entertainment, Productivity, Coding"
                  className="w-full rounded-lg border border-white/10 bg-[#0b1222] py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
                />
              </div>

              <p className="mt-1 text-xs text-gray-500">
                Separate tags with commas
              </p>

              {errors.tags && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.tags.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#070d1a]/80 p-6 shadow-[0_0_40px_rgba(168,85,247,0.08)]">
          <div className="mb-5 flex items-center justify-between">
            <label className="text-lg font-semibold text-purple-400">
              Blog Content <span className="text-red-400">*</span>
            </label>

            <button
              type="button"
              onClick={() => setIsPreview(!isPreview)}
              className="rounded-md border border-white/10 bg-[#0b1222] px-4 py-2 text-sm text-gray-300 transition hover:bg-[#111827]"
            >
              {isPreview ? "Edit" : "Preview"}
            </button>
          </div>

          <Controller
            name="content"
            control={control}
            render={({ field }) =>
              isPreview ? (
                <QuillViewer value={field.value} />
              ) : (
                <QuillEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Write a detailed description about your blog..."
                />
              )
            }
          />

          {errors.content && (
            <p className="mt-1 text-sm text-red-400">
              {errors.content.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateBlogForm;
