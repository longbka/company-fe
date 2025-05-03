import { CompanyInfo } from "@/types/common";
import { sendRequest } from "@/utils/api";
import React from "react";

export default async function AboutDescriptionPage() {
  const companyInfo = await sendRequest<IBackendRes<[CompanyInfo]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/company-info`,
    method: "GET",
  });

  return (
    companyInfo &&
    companyInfo.data && (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Về chúng tôi</h1>
        <p
          className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: companyInfo.data[0].description! }}
        ></p>
      </div>
    )
  );
}
