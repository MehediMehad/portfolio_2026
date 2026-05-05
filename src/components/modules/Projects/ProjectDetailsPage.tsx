import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  CalendarIcon,
  Code2Icon,
  ExternalLinkIcon,
  GithubIcon,
  Layers3Icon,
} from "lucide-react";

import QuillViewer from "@/components/shared/TextEditor/QuillViewer";
import { TProjectDetails } from "@/types";

type Props = {
  project: TProjectDetails;
};

const ProjectDetailsPage = ({ project }: Props) => {
  const formatDate = (dateString: Date | string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="container mx-auto px-4 pt-16 md:pt-20">
        <div className="relative h-[260px] w-full overflow-hidden rounded-2xl border border-border sm:h-[360px] md:h-[620px]">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              No Preview Available
            </div>
          )}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-border p-6 shadow-sm md:p-10">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm font-semibold text-purple-400">
                  Project
                </span>

                <div className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  <span>{formatDate(project.createdAt)}</span>
                </div>
              </div>

              <h1 className="mb-5 text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-4xl">
                {project.title}
              </h1>

              <p className="mb-10 text-base leading-8 text-muted-foreground md:text-lg">
                {project.overview}
              </p>

              {/* <div className="mb-10 border-t border-border" /> */}

              <div className="rounded-2xl border border-border/60 bg-background/20 p-1">
                <QuillViewer value={project.description} />
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border border-border p-6 shadow-sm">
                <h3 className="mb-5 text-xl font-bold text-foreground">
                  Project Info
                </h3>

                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl border border-border bg-background p-2.5">
                      <Layers3Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium text-foreground">
                        {project.is_public
                          ? "Public Project"
                          : "Private Project"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-xl border border-border bg-background p-2.5">
                      <CalendarIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Updated</p>
                      <p className="font-medium text-foreground">
                        {formatDate(project.updatedAt)}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-border pt-5">
                    <h3 className="mb-4 text-lg font-bold text-foreground">
                      Tech Stack
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center rounded-full border border-border bg-background px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                  <Code2Icon className="h-5 w-5 text-primary" />
                  Project Links
                </h3>

                <div className="space-y-3">
                  <Link
                    href={project.liveURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                  >
                    Live Demo
                    <ExternalLinkIcon className="h-4 w-4" />
                  </Link>

                  <Link
                    href={project.gitHubURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                  >
                    GitHub Repository
                    <GithubIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
                <h3 className="mb-2 text-lg font-bold text-foreground">
                  Want to see more projects?
                </h3>
                <p className="mb-4 text-sm leading-6 text-muted-foreground">
                  Explore more builds, experiments, and production work from the
                  portfolio.
                </p>

                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  Browse All Projects
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailsPage;
