import MainHomePage from "@/app/components/Slider/MainHomePage";
import IntroAndContactForm from "@/app/components/IntroAndContactForm";
import Partners from "@/app/components/Slider/Partners";
import FeaturedServices from "./components/ProductsAndServices";
import { auth } from "@/auth";
export default async function Home() {
	const session = await auth();
	return (
		<>
			<MainHomePage />
			<IntroAndContactForm />
			<Partners />
			<FeaturedServices />
		</>
	);
}
