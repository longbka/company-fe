import MainHomePage from "@/components/general/Slider/MainHomePage";
import IntroAndContactForm from "@/components/general/IntroAndContactForm";
import Partners from "@/components/general/Slider/Partners";
import FeaturedServices from "@/components/general/ProductsAndServices";
export default async function Home() {
  return (
    <>
      <MainHomePage />
      <IntroAndContactForm />
      <Partners />
      <FeaturedServices />
    </>
  );
}
