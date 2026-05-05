"use client";

import { useState } from "react";
import { LinkIcon, Type } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import ImagePreviewer from "@/components/shared/ImageUploader/ImagePreviewer";
import ImageUploader from "@/components/shared/ImageUploader/ImageUploader";
import MultiSelect from "@/components/shared/MultiSelect";
import { Checkbox } from "@/components/ui/checkbox";
import { updateProject } from "@/services/projects";
import { TProjectDetails } from "@/types";

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

const editProjectSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  overview: z.string().min(1, "Short overview is required"),
  techStack: z.array(z.string()).min(1, "Select at least one technology"),
  description: z
    .string()
    .min(1, "Project description is required")
    .refine((value) => value.replace(/<(.|\n)*?>/g, "").trim().length > 0, {
      message: "Project description is required",
    }),
  liveURL: z.string().url("Invalid live demo URL"),
  gitHubURL: z.string().url("Invalid GitHub URL"),
  is_public: z.boolean(),
});

type EditProjectFormData = z.infer<typeof editProjectSchema>;

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

type Props = {
  project: TProjectDetails;
};

const EditProjectForm = ({ project }: Props) => {
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [existingImage, setExistingImage] = useState(project.image || "");
  const [isPreview, setIsPreview] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EditProjectFormData>({
    resolver: zodResolver(editProjectSchema),
    defaultValues: {
      title: project.title || "",
      overview: project.overview || "",
      techStack: project.techStack || [],
      description: project.description || "",
      liveURL: project.liveURL || "",
      gitHubURL: project.gitHubURL || "",
      is_public: project.is_public ?? true,
    },
  });

  const onSubmit: SubmitHandler<EditProjectFormData> = async (data) => {
    try {
      if (!existingImage && imageFiles.length === 0) {
        toast.error("Project image is required");
        return;
      }

      const formData = new FormData();

      if (imageFiles[0]) {
        formData.append("image", imageFiles[0]);
      }

      formData.append("data", JSON.stringify(data));

      const res = await updateProject(project.slug, formData);

      if (!res.success) {
        toast.error(res.message || "Failed to update project");
        return;
      }

      toast.success(res.message || "Project updated successfully");
      router.push("/dashboard/projects");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="w-full text-white">
      <div className="mb-7 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Edit Project</h1>
          <p className="mt-2 text-sm text-gray-400">
            Update your project details and save the latest version.
          </p>
        </div>

        <button
          form="edit-project-form"
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-linear-to-br from-purple-500 to-indigo-500 px-6 py-3 font-semibold shadow-[0_0_20px_rgba(168,85,247,0.35)] transition hover:scale-[1.02] disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <form
        id="edit-project-form"
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
                    label="Upload a new project image"
                    setImageFiles={setImageFiles}
                    setImagePreview={setImagePreview}
                  />
                </div>
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

              {errors.techStack && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.techStack.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Live Demo URL <span className="text-red-400">*</span>
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
                GitHub Repository URL <span className="text-red-400">*</span>
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

            <div className="rounded-lg border border-white/10 bg-[#0b1222] p-4">
              <Controller
                name="is_public"
                control={control}
                render={({ field }) => (
                  <label className="flex cursor-pointer items-start gap-3">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) =>
                        field.onChange(Boolean(checked))
                      }
                      className="mt-1 border-purple-400/50"
                    />
                    <div>
                      <p className="font-medium text-white">Public Project</p>
                      <p className="mt-1 text-sm text-gray-400">
                        Enable this if you want the project to be visible on the
                        public portfolio.
                      </p>
                    </div>
                  </label>
                )}
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#070d1a]/80 p-6 shadow-[0_0_40px_rgba(168,85,247,0.08)]">
          <div className="mb-5 flex items-center justify-between">
            <label className="text-lg font-semibold text-purple-400">
              Project Description <span className="text-red-400">*</span>
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
            name="description"
            control={control}
            render={({ field }) =>
              isPreview ? (
                <QuillViewer value={field.value} />
              ) : (
                <QuillEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Write a detailed description about your project..."
                />
              )
            }
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

export default EditProjectForm;
