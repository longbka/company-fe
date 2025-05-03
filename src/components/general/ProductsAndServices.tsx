"use client";
import CardsList from "./CardsList";

const items = [
  {
    title: "Dịch vụ kỹ thuật",
    image: "/images/company/technical-services.png",
  },
  {
    title: "Vận chuyển xe ô tô đường bộ",
    image: "/images/company/car-carrying.jpg",
  },
  {
    title: "Dịch vụ khai báo hải quan",
    image: "/images/company/customs-declare.jpg",
  },
];

export default function FeaturedServices() {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 gap-8">
      <h2 className="text-2xl font-bold text-center mb-10">
        SẢN PHẨM VÀ DỊCH VỤ TIÊU BIỂU
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CardsList items={items} />
      </div>
    </section>
  );
}
