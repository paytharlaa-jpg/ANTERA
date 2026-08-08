import { createFileRoute, notFound } from "@tanstack/react-router";

import { ProjectPage } from "@/components/site/project-page";
import { PROJECTS, type ProjectSlug } from "@/lib/antera-data";

function findProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = findProject(params.slug);
    if (!project) throw notFound();
    return { slug: project.slug, name: project.name, tagline: project.tagline };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project not found - Antera Realty" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.name} - Antera Realty`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.tagline },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.tagline },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: ProjectRoute,
});

function ProjectRoute() {
  const { slug } = Route.useLoaderData();
  return <ProjectPage slug={slug as ProjectSlug} />;
}

function ProjectNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <h1 className="display-title text-3xl">Project not found</h1>
      <p className="text-sm text-muted-foreground">
        This development may have moved. Explore the Antera portfolio instead.
      </p>
      <a
        href="/#projects"
        className="rounded-full bg-accent px-6 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent-foreground"
      >
        View Projects
      </a>
    </div>
  );
}