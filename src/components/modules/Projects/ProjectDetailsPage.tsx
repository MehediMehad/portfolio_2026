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

const ProjectDetailsPage = () => {
  return (
    <div>
      <h1>This is ProjectDetailsPage component</h1>
    </div>
  );
};

export default ProjectDetailsPage;
