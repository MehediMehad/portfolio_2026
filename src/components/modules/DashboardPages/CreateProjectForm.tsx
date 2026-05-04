"use client";

import { useState } from "react";
import { LinkIcon, Type } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import ImagePreviewer from "@/components/shared/ImageUploader/ImagePreviewer";
import ImageUploader from "@/components/shared/ImageUploader/ImageUploader";
import { createProject } from "@/services/projects";
import MultiSelect from "@/components/shared/MultiSelect";

const techStackOptions = [
  { value: "Next.js", label: "Next.js" },
  { value: "React", label: "React" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "Node.js", label: "Node.js" },
  { value: "Express.js", label: "Express.js" },
  { value: "MongoDB", label: "MongoDB" },
  { value: "PostgreSQL", label: "PostgreSQL" },
  { value: "Redis", label: "Redis" },
  { value: "Socket.io", label: "Socket.io" },
  { value: "Tailwind CSS", label: "Tailwind CSS" },
];

const QuillEditor = dynamic(
  () => import("@/components/shared/TextEditor/QuillEditor"),
  {
    ssr: false,
    loading: () => <p className="text-muted-foreground">Loading...</p>,
  },
);

const createProjectSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  overview: z.string().min(1, "Short overview is required"),
  techStack: z.array(z.string()).min(1),
  description: z
    .string()
    .min(1, "Project description is required")
    .refine((value) => value.replace(/<(.|\n)*?>/g, "").trim().length > 0, {
      message: "Project description is required",
    }),
  liveURL: z.string().url("Invalid live demo URL"),
  gitHubURL: z.string().url("Invalid GitHub URL"),
  // isFeatured: z.boolean().optional(),
});

type CreateProjectFormData = z.infer<typeof createProjectSchema>;

const CreateProjectForm = () => {
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: "",
      overview: "",
      techStack: [],
      description: "",
      liveURL: "",
      gitHubURL: "",
      // isFeatured: false,
    },
  });

  const onSubmit: SubmitHandler<CreateProjectFormData> = async (data) => {
    try {
      if (imageFiles.length === 0) {
        toast.error("Project image is required");
        return;
      }

      const formData = new FormData();
      formData.append("image", imageFiles[0]);
      formData.append("data", JSON.stringify(data));

      const res = await createProject(formData);

      if (res.success) {
        toast.success(res.message);
        reset();
        setImageFiles([]);
        setImagePreview([]);
        router.push("/dashboard/projects");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="w-full text-white">
      <div className="mb-7 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Create Project 2</h1>
          <p className="mt-2 text-sm text-gray-400">
            Add your project details. All fields marked with * are required.
          </p>
        </div>

        <button
          form="create-project-form"
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-linear-to-br from-purple-500 to-indigo-500 px-6 py-3 font-semibold shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:scale-[1.02] transition disabled:opacity-60"
        >
          + {isSubmitting ? "Adding..." : "Add Project"}
        </button>
      </div>

      <form
        id="create-project-form"
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-5 xl:grid-cols-2"
      >
        <div className="rounded-xl border border-white/10 bg-[#070d1a]/80 p-6 shadow-[0_0_40px_rgba(168,85,247,0.08)]">
          <h2 className="mb-7 text-lg font-semibold text-purple-400">
            Project Information
          </h2>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Project Image <span className="text-red-400">*</span>
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
                Project Title <span className="text-red-400">*</span>
              </label>

              <div className="relative">
                <Type
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  {...register("title")}
                  placeholder="e.g. Real-time Chat App"
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
                placeholder="Write a short overview about your project..."
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
                Tech Stack <span className="text-red-400">*</span>
              </label>

              <Controller
                name="techStack"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    value={field.value}
                    onChange={field.onChange}
                    options={techStackOptions}
                    placeholder="Select tech stack"
                    searchPlaceholder="Search technology..."
                    emptyMessage="No technology found."
                  />
                )}
              />

              <p className="mt-1 text-xs text-gray-500">
                Separate technologies with commas
              </p>

              {errors.techStack && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.techStack.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Live Demo URL
              </label>

              <div className="relative">
                <LinkIcon
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  {...register("liveURL")}
                  placeholder="https://your-project.vercel.app"
                  className="w-full rounded-lg border border-white/10 bg-[#0b1222] py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
                />
              </div>

              {errors.liveURL && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.liveURL.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                GitHub Repository URL
              </label>

              <div className="relative">
                <LinkIcon
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  {...register("gitHubURL")}
                  placeholder="https://github.com/username/repository"
                  className="w-full rounded-lg border border-white/10 bg-[#0b1222] py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
                />
              </div>

              {errors.gitHubURL && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.gitHubURL.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#070d1a]/80 p-6 shadow-[0_0_40px_rgba(168,85,247,0.08)]">
          <label className="mb-5 block text-lg font-semibold text-purple-400">
            Project Description <span className="text-red-400">*</span>
          </label>

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <QuillEditor
                value={field.value}
                onChange={field.onChange}
                placeholder="Write a detailed description about your project..."
              />
            )}
          />

          {errors.description && (
            <p className="mt-1 text-sm text-red-400">
              {errors.description.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateProjectForm;
