"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";

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
			<h2 className="text-2xl font-bold text-center mb-10">SẢN PHẨM VÀ DỊCH VỤ TIÊU BIỂU</h2>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{items.map((item, idx) => (
					<Card
						key={idx}
						className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer h-[300px]"
					>
						<Image
							src={item.image}
							alt={item.title}
							fill
							style={{objectFit: "cover"}}
							className="transition-transform duration-300 group-hover:scale-105"
						/>
						<div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-center py-3 backdrop-blur-sm">
							<p className="text-sm font-semibold">{item.title}</p>
						</div>
					</Card>
				))}
			</div>
		</section>
	);
}
