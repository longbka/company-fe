import { CompanyInfo } from "@/types/common";
import { sendRequest } from "@/utils/api";
import Image from "next/image";
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
        <h1 className="text-3xl font-bold mb-8 text-center">Bộ máy công ty</h1>
        <div className="relative w-full h-[500px]">
          <Image
            src="https://drive.google.com/uc?export=view&id=1u3LevaoG2_6s_7u2ZwK8Y8mtMdeA879C"
            alt="Bộ máy công ty"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    )
  );
}
