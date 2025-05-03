import { Service } from "@/types/common";
import { sendRequest } from "@/utils/api";

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ serviceId: string; subServiceId: string }>;
}) {
  const { serviceId, subServiceId } = await params;
  const offering = await sendRequest<IBackendRes<Service>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/offerings/${serviceId}/${subServiceId}`,
    method: "GET",
  });
  return (
    offering &&
    offering.data && (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {offering.data.title}
        </h1>
        <p
          className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: offering.data.content! }}
        ></p>
      </div>
    )
  );
}
