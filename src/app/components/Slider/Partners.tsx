"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Grid } from "swiper/modules";

import "swiper/css";

export default function PartnersCarousel() {
	const partners = [
		{ src: "/images/partners/logo_pako.jpg", alt: "Partner 1" },
		{ src: "/images/partners/logo_yachiyoda.png", alt: "Partner 2" },
		{ src: "/images/partners/logo_dicastal.png", alt: "Partner 3" },
		{ src: "/images/partners/logo_excel.jpg", alt: "Partner 4" },
		{ src: "/images/partners/logo_enkei.png", alt: "Partner 5" },
		{ src: "/images/partners/logo_kosei.png", alt: "Partner 6" },
		{ src: "/images/partners/logo_ronal.jpg", alt: "Partner 7" },
		{ src: "/images/partners/logo_borbet.png", alt: "Partner 8" },
		{ src: "/images/partners/logo_maxion.jpg", alt: "Partner 9" },
		{ src: "/images/partners/logo_pilkington.jpg", alt: "Partner 10" },
		{ src: "/images/partners/logo_AGC.jpg", alt: "Partner 11" },
		{ src: "/images/partners/logo_hella.jpg", alt: "Partner 12" },
		{ src: "/images/partners/logo_koito.jpg", alt: "Partner 13" },
		{ src: "/images/partners/logo_saintgobain.jpg", alt: "Partner 14" },
		{ src: "/images/partners/logo_pgw.jpg", alt: "Partner 15" },
		{ src: "/images/partners/logo_gentex.jpg", alt: "Partner 16" },
		{ src: "/images/partners/logo_xyg.jpg", alt: "Partner 17" },
		{ src: "/images/partners/logo_bosch.jpg", alt: "Partner 18" },
		{ src: "/images/partners/logo_petro.jpg", alt: "Partner 19" },
		{ src: "/images/partners/logo_evn.jpg", alt: "Partner 20" },
		{ src: "/images/partners/logo_lilama.jpeg", alt: "Partner 21" },
		{ src: "/images/partners/logo_kobelco.jpg", alt: "Partner 22" },
		{ src: "/images/partners/logo_kiswel.jpg", alt: "Partner 23" },
		{ src: "/images/partners/logo_pelco.jpg", alt: "Partner 24" },
		{ src: "/images/partners/logo_toyota.jpg", alt: "Partner 25" },
		{ src: "/images/partners/logo_vizimax.png", alt: "Partner 26" },
		{ src: "/images/partners/logo_mercedes.jpg", alt: "Partner 27" },
		{ src: "/images/partners/logo_volvo.jpg", alt: "Partner 28" },
		{ src: "/images/partners/logo_xyg.jpg", alt: "Partner 29" },
		{ src: "/images/partners/logo_mitsubishi.jpg", alt: "Partner 30" },
		{ src: "/images/partners/logo_honda.jpg", alt: "Partner 31" },
		{ src: "/images/partners/logo_landrover.jpg", alt: "Partner 32" },
		{ src: "/images/partners/logo_suzuki.png", alt: "Partner 33" },
		{ src: "/images/partners/logo_hino.png", alt: "Partner 34" },
		{ src: "/images/partners/logo_GM.jpg", alt: "Partner 35" },
		{ src: "/images/partners/logo_lexus.jpg", alt: "Partner 36" },
		{ src: "/images/partners/logo_chevrolet.jpg", alt: "Partner 37" },
		{ src: "/images/partners/logo_yokohama.png", alt: "Partner 38" },
		{ src: "/images/partners/logo_kumhotire.jpg", alt: "Partner 39" },
		{ src: "/images/partners/logo_firelli.jpg", alt: "Partner 40" },
		{ src: "/images/partners/logo_continental.png", alt: "Partner 41" },
		{ src: "/images/partners/logo_sumitomo.jpg", alt: "Partner 42" },
		{ src: "/images/partners/logo_bridgestone.jpg", alt: "Partner 43" },
		{ src: "/images/partners/logo_dunlop.jpg", alt: "Partner 44" },
		{ src: "/images/partners/logo_casumina.jpg", alt: "Partner 45" },
		{ src: "/images/partners/logo_zcw.jpg", alt: "Partner 46" },
	];

	const groupedPartners = [];
	for (let i = 0; i < partners.length; i += 2) {
		groupedPartners.push(partners.slice(i, i + 2));
	}

	return (
		<section className="py-12 bg-white">
			<h2 className="text-center text-2xl font-semibold mb-8 text-black">KHÁCH HÀNG - ĐỐI TÁC</h2>

			<Swiper
				slidesPerView={2}
				spaceBetween={20}
				loop={true}
				autoplay={{
					delay: 0,
					disableOnInteraction: false,
				}}
				speed={3000}
				modules={[Autoplay]}
				breakpoints={{
					640: { slidesPerView: 3 },
					768: { slidesPerView: 4 },
					1024: { slidesPerView: 6 },
					1280: { slidesPerView: 8 },
                    1536: { slidesPerView: 10 },
				}}
				className="w-full"
			>
				{groupedPartners.map((group, index) => (
					<SwiperSlide key={index}>
						<div className="flex flex-col items-center space-y-2">
							{group.map((partner, idx) => (
								<div key={idx} className="relative h-24 w-40">
									<Image
										src={partner.src}
										alt={partner.alt}
										fill
										className="object-contain"
										sizes="(max-width: 768px) 50vw, 100px"
										priority
									/>
								</div>
							))}
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
}
