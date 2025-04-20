"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

export default function Page() {
	const images = [
		{ src: "/images/company/1.jpg", alt: "Company Image 1" },
		{ src: "/images/company/1.jpg", alt: "Company Image 2" },
		{ src: "/images/company/1.jpg", alt: "Company Image 3" },
		{ src: "/images/company/1.jpg", alt: "Company Image 4" },
		{ src: "/images/company/1.jpg", alt: "Company Image 5" },
	];

	return (
		<section className="w-full">
			<Swiper
				navigation
				modules={[Pagination, Autoplay]}
				pagination={{
					clickable: true,
				}}
				slidesPerView={1}
				spaceBetween={30}
				loop={true}
				className="w-full"
				autoplay={{
					delay: 3000,
					disableOnInteraction: false,
				}}
			>
				{images.map((image, index) => (
					<SwiperSlide key={index}>
						<div className="relative w-full" style={{ paddingTop: "56.25%" }}>
							<Image
								src={image.src}
								alt={image.alt}
								fill
								className="object-cover"
								sizes="100vw"
								priority
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
}
