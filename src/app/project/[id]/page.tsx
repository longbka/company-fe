import { Project } from "@/types/common";
import { sendRequest } from "@/utils/api";

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await sendRequest<IBackendRes<Project>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/projects/${id}`,
    method: "GET",
  });
  return (
    project &&
    project.data && (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {project.data.title}
        </h1>
        <p
          className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: project.data.content! }}
        ></p>
      </div>
    )
  );
}
