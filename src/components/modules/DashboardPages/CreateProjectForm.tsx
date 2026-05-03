"use client";

import { useState } from "react";
import { UploadCloud, LinkIcon, Type, FileText } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const createProjectSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  overview: z.string().min(1, "Short overview is required"),
  techStack: z.string().min(1, "Tech stack is required"),
  description: z.string().min(1, "Project description is required"),
  liveUrl: z.string().url("Invalid live demo URL"),
  githubUrl: z.string().url("Invalid GitHub URL"),
  isFeatured: z.boolean().optional(),
});

type CreateProjectFormData = z.infer<typeof createProjectSchema>;

const CreateProjectForm = () => {
  const router = useRouter();
  const [projectImage, setProjectImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: "",
      overview: "",
      techStack: "",
      description: "",
      liveUrl: "",
      githubUrl: "",
      isFeatured: false,
    },
  });

  const onSubmit: SubmitHandler<CreateProjectFormData> = async (data) => {
    try {
      if (!projectImage) {
        toast.error("Project image is required");
        return;
      }

      const formData = new FormData();
      formData.append("image", projectImage);
      formData.append("data", JSON.stringify(data));

      // ekhane tomar createProject server action/API call korba
      // const res = await createProject(formData);

      toast.success("Project created successfully");
      reset();
      setProjectImage(null);
      router.push("/dashboard/my-projects");
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

              <label className="flex h-28 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-purple-400/30 bg-[#0b1222] text-gray-400 hover:border-purple-400 transition">
                <UploadCloud size={30} className="mb-2" />
                <span className="text-sm">
                  {projectImage
                    ? projectImage.name
                    : "Click to upload or drag and drop"}
                </span>
                <span className="text-xs">PNG, JPG, JPEG, WEBP Max 5MB</span>

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (!file) return;

                    if (file.size > 5 * 1024 * 1024) {
                      toast.error("Image size must be less than 5MB");
                      return;
                    }

                    setProjectImage(file);
                  }}
                />
              </label>
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

              <input
                {...register("techStack")}
                placeholder="e.g. Next.js, Socket.io, Node.js, Express.js, Redis"
                className="w-full rounded-lg border border-white/10 bg-[#0b1222] px-4 py-3 text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
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
                  {...register("liveUrl")}
                  placeholder="https://your-project.vercel.app"
                  className="w-full rounded-lg border border-white/10 bg-[#0b1222] py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
                />
              </div>

              {errors.liveUrl && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.liveUrl.message}
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
                  {...register("githubUrl")}
                  placeholder="https://github.com/username/repository"
                  className="w-full rounded-lg border border-white/10 bg-[#0b1222] py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
                />
              </div>

              {errors.githubUrl && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.githubUrl.message}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-3 text-sm font-medium">
                <input
                  type="checkbox"
                  {...register("isFeatured")}
                  className="h-5 w-5 rounded border-white/20 bg-[#0b1222] accent-purple-500"
                />
                Mark this project as featured
              </label>
              <p className="ml-8 mt-1 text-xs text-gray-500">
                Featured projects will be shown on the home page.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#070d1a]/80 p-6 shadow-[0_0_40px_rgba(168,85,247,0.08)]">
          <label className="mb-5 block text-lg font-semibold text-purple-400">
            Project Description <span className="text-red-400">*</span>
          </label>

          <div className="overflow-hidden rounded-lg border border-white/10 bg-[#0b1222]">
            <div className="flex items-center gap-4 border-b border-white/10 px-4 py-3 text-sm text-gray-300">
              <span>Paragraph</span>
              <b>B</b>
              <i>I</i>
              <u>U</u>
              <FileText size={17} />
              <LinkIcon size={17} />
            </div>

            <textarea
              {...register("description")}
              placeholder="Write a detailed description about your project..."
              className="min-h-[570px] w-full resize-none bg-transparent p-5 text-white placeholder-gray-500 focus:outline-none"
            />
          </div>

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
