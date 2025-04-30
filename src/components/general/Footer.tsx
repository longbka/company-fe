"use client";

import Link from "next/link";

export default function Footer() {
	return (
		<footer
			className="relative bg-cover bg-center text-white py-10"
			style={{ backgroundImage: "url('/images/footer-bg.png')" }}
		>
			<div className="absolute inset-0 bg-black opacity-60"></div>

			<div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
				{/* Company Info */}
				<div className="text-center md:text-left">
					<h2 className="text-xl font-bold uppercase mb-4">
						Công ty cổ phần thiết bị và dịch vụ kỹ thuật Lotus Việt Nam
					</h2>
					<p>
						🏢 Tầng 7, Tòa nhà hội nhà báo Việt Nam,
						<br /> Lô E2-KĐT Cầu Giấy, Phố Dương Đình Nghệ, Phường Yên Hòa, Quận Cầu Giấy, Hà Nội
					</p>
					<p className="mt-2">📞 +(84)24 376 333 66</p>
					<p>📧 contact@lotustse.vn</p>
					<p className="mt-4">© 2025 Lotus TSE</p>

					{/* Social Icons */}
					<div className="flex justify-center md:justify-start gap-4 mt-4 text-xl">
						<Link href="#">
							<i className="fab fa-facebook"></i>
						</Link>
						<Link href="#">
							<i className="fab fa-google-plus"></i>
						</Link>
						<Link href="#">
							<i className="fab fa-twitter"></i>
						</Link>
						<Link href="#">
							<i className="fab fa-instagram"></i>
						</Link>
					</div>
				</div>

				{/* Google Map */}
				<div className="w-full md:w-1/2">
					<h3 className="text-lg font-semibold mb-2">Địa chỉ của chúng tôi</h3>
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.2903556377023!2d105.78368537596953!3d21.02106508804128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4ab749acfb%3A0xea68a3bbbf9232f0!2sLotus%20TSE!5e0!3m2!1svi!2s!4v1745721410533!5m2!1svi!2s"
						width="100%"
						height="250"
						style={{ border: 0 }}
						allowFullScreen
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					></iframe>
				</div>
			</div>
		</footer>
	);
}
