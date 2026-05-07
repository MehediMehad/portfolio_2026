"use client";

import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Tag, Type } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import ImagePreviewer from "@/components/shared/ImageUploader/ImagePreviewer";
import ImageUploader from "@/components/shared/ImageUploader/ImageUploader";
import SingleSelect from "@/components/shared/SingleSelect";
import { updateBlog } from "@/services/blogs";
import { BlogType, TBlogDetails } from "@/types";

const blogTypes: BlogType[] = ["Tech", "Personal", "Lifestyle", "Health"];

const blogTypeOptions = blogTypes.map((type) => ({
  value: type,
  label: type,
}));

const editBlogSchema = z.object({
  title: z.string().min(1, "Blog title is required"),
  overview: z.string().min(1, "Blog overview is required"),
  content: z
    .string()
    .min(1, "Blog content is required")
    .refine((value) => value.trim().length > 0, {
      message: "Blog content is required",
    }),
  tags: z.string().min(1, "At least one tag is required"),
  type: z.enum(blogTypes, {
    message: "Blog type is required",
  }),
});

type EditBlogFormData = z.infer<typeof editBlogSchema>;

type Props = {
  blog: TBlogDetails;
};

const EditBlogForm = ({ blog }: Props) => {
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [existingImage, setExistingImage] = useState(blog.image || "");
  const [isPreview, setIsPreview] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EditBlogFormData>({
    resolver: zodResolver(editBlogSchema),
    defaultValues: {
      title: blog.title || "",
      overview: blog.overview || "",
      content: blog.content || "",
      tags: blog.tags?.join(", ") || "",
      type: blog.type || "Tech",
    },
  });

  const onSubmit: SubmitHandler<EditBlogFormData> = async (data) => {
    try {
      // if (!existingImage && imageFiles.length === 0) {
      //   toast.error("Blog image is required");
      //   return;
      // }

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

      if (imageFiles[0]) {
        formData.append("image", imageFiles[0]);
      }

      formData.append("data", JSON.stringify(formattedData));

      const result = await updateBlog(blog.slug, formData);

      if (!result.success) {
        toast.error(result.message || "Failed to update blog");
        return;
      }

      toast.success(result.message || "Blog updated successfully");
      router.push("/dashboard/blogs");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full text-white">
      <div className="mb-7 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Edit Blog</h1>
          <p className="mt-2 text-sm text-gray-400">
            Update your blog details and save the latest version.
          </p>
        </div>

        <button
          form="edit-blog-form"
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-linear-to-br from-purple-500 to-indigo-500 px-6 py-3 font-semibold shadow-[0_0_20px_rgba(168,85,247,0.35)] transition hover:scale-[1.02] disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <form
        id="edit-blog-form"
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

              {imageFiles.length === 1 || existingImage ? (
                <ImagePreviewer
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                  setImageFiles={setImageFiles}
                  existingImage={existingImage}
                  setExistingImage={setExistingImage}
                />
              ) : null}

              {!existingImage && imageFiles.length === 0 && (
                <div className="mt-3">
                  <ImageUploader
                    label="Upload a new blog image"
                    setImageFiles={setImageFiles}
                    setImagePreview={setImagePreview}
                  />
                </div>
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
              {isPreview ? "Edit Markdown" : "Preview"}
            </button>
          </div>

          <Controller
            name="content"
            control={control}
            render={({ field }) =>
              isPreview ? (
                <div className="min-h-[500px] rounded-lg border border-white/10 bg-[#0b1222] p-5">
                  {field.value ? (
                    <article className="prose prose-invert max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {field.value}
                      </ReactMarkdown>
                    </article>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Markdown preview will appear here...
                    </p>
                  )}
                </div>
              ) : (
                <textarea
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder={`Write your blog in Markdown...

# Blog Title

## Section Title

Your paragraph here...

- Point one
- Point two

**Bold text**

[Link text](https://example.com)

\`\`\`js
console.log("Hello world");
\`\`\``}
                  className="min-h-[500px] w-full resize-none rounded-lg border border-white/10 bg-[#0b1222] p-4 font-mono text-sm leading-7 text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
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

export default EditBlogForm;
