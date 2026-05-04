// import Image from "next/image";
// import Link from "next/link";
// import { ExternalLinkIcon, GithubIcon } from "lucide-react";
// import { TProjectDetails } from "@/types";

// type Props = {
//   project: TProjectDetails;
// };

// const ProjectDetailsPage = ({ project }: Props) => {
//   return (
//     <div className="min-h-screen py-20">
//       <div className="container mx-auto px-4 max-w-5xl">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
//           <h1 className="text-4xl md:text-5xl font-bold text-primary">
//             {project.title}
//           </h1>

//           <div className="flex flex-wrap gap-4 w-full md:w-auto">
//             <Link
//               href={project.liveURL}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition w-full sm:w-auto"
//             >
//               <ExternalLinkIcon className="w-5 h-5" />
//               Live Preview
//             </Link>

//             <Link
//               href={project.gitHubURL}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center justify-center gap-2 px-5 py-3 border border-border rounded-lg font-semibold hover:border-primary hover:text-primary transition w-full sm:w-auto"
//             >
//               <GithubIcon className="w-5 h-5" />
//               GitHub
//             </Link>
//           </div>
//         </div>

//         {/* Image */}
//         <div className="relative w-full h-[500px] rounded-xl overflow-hidden border border-border mb-10">
//           {project.image ? (
//             <Image
//               src={project.image}
//               alt={project.title}
//               fill
//               className="object-cover"
//             />
//           ) : (
//             <div className="flex items-center justify-center h-full text-muted-foreground">
//               No Preview Available
//             </div>
//           )}
//         </div>

//         {/* Overview */}
//         <section className="mb-10">
//           <h2 className="text-2xl font-semibold text-primary mb-3">Overview</h2>
//           <p className="text-muted-foreground leading-relaxed">
//             {project.overview}
//           </p>
//         </section>

//         {/* Description */}
//         <section className="mb-10">
//           <h2 className="text-2xl font-semibold text-primary mb-3">
//             Description
//           </h2>
//           <p className="text-muted-foreground leading-relaxed">
//             {project.description}
//           </p>
//         </section>

//         {/* Tech Stack */}
//         <section className="mb-10">
//           <h2 className="text-2xl font-semibold text-primary mb-3">
//             Tech Stack
//           </h2>
//           <div className="flex flex-wrap gap-2">
//             {project.techStack.map((tech) => (
//               <span
//                 key={tech}
//                 className="px-3 py-1 text-sm border border-border rounded-md"
//               >
//                 {tech}
//               </span>
//             ))}
//           </div>
//         </section>

//         {/* Features */}
//         <section className="mb-10">
//           <h2 className="text-2xl font-semibold text-primary mb-3">Features</h2>
//           <ul className="list-disc list-inside space-y-2 text-muted-foreground">
//             {project.features.map((feature) => (
//               <li key={feature}>{feature}</li>
//             ))}
//           </ul>
//         </section>

//         {/* What I Learned */}
//         <section className="mb-10">
//           <h2 className="text-2xl font-semibold text-primary mb-3">
//             What I Learned
//           </h2>
//           <ul className="list-disc list-inside space-y-2 text-muted-foreground">
//             {project.whatILearned.map((item) => (
//               <li key={item}>{item}</li>
//             ))}
//           </ul>
//         </section>

//         {/* Future Improvements */}
//         <section className="mb-10">
//           <h2 className="text-2xl font-semibold text-primary mb-3">
//             Future Improvements
//           </h2>
//           <ul className="list-disc list-inside space-y-2 text-muted-foreground">
//             {project.futureImprovements.map((item) => (
//               <li key={item}>{item}</li>
//             ))}
//           </ul>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default ProjectDetailsPage;

import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, Calendar, Code2 } from "lucide-react";
import QuillViewer from "@/components/shared/TextEditor/QuillViewer";

const ProjectDetailsPage = ({ project }: { project: any }) => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto container px-4 py-14">
        {/* Project Image */}
        <div className="relative mb-10 h-[260px] overflow-hidden rounded-xl border border-white/10 md:h-[620px]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_320px]">
          {/* Left Content */}
          <article className="rounded-xl border border-white/10 bg-[#070d1a]/80 p-6">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400">
                Project
              </span>

              <span className="flex items-center gap-2 text-xs text-gray-400">
                <Calendar size={14} />
                {new Date(project.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <h1 className="mb-4 text-3xl font-bold md:text-4xl">
              {project.title}
            </h1>

            <p className="mb-8 text-sm leading-7 text-gray-400">
              {project.overview}
            </p>

            <div className="mb-8 border-t border-white/10" />

            {/* Quill Description */}
            <div className="project-description">
              <QuillViewer value={project.description} />
            </div>
          </article>

          {/* Right Sidebar */}
          <aside className="space-y-5">
            <div className="rounded-xl border border-white/10 bg-[#070d1a]/80 p-5">
              <h2 className="mb-5 text-lg font-semibold">Project Info</h2>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="mb-2 text-gray-400">Tech Stack</p>

                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech: string) => (
                      <span
                        key={tech}
                        className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs text-purple-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <p className="text-gray-400">Last Updated</p>
                  <p className="mt-1 text-white">
                    {new Date(project.updatedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#070d1a]/80 p-5">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Code2 size={18} className="text-purple-400" />
                Links
              </h2>

              <div className="space-y-3">
                <Link
                  href={project.liveURL}
                  target="_blank"
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-[#0b1222] px-4 py-3 text-sm hover:border-purple-500/50 hover:text-purple-400"
                >
                  Live Demo
                  <ExternalLink size={16} />
                </Link>

                <Link
                  href={project.gitHubURL}
                  target="_blank"
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-[#0b1222] px-4 py-3 text-sm hover:border-purple-500/50 hover:text-purple-400"
                >
                  GitHub Repository
                  <Github size={16} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default ProjectDetailsPage;
