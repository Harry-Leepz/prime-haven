import Hero from "@/components/home/Hero";
import InfoBoxContianer from "@/components/home/InfoBoxContainer";
import HomeProperties from "@/components/home/HomeProperties";
import FeaturedProperties from "@/components/featured-properties/FeaturedProperties";

export default function HomePage() {
  return (
    <>
      <Hero />
      <InfoBoxContianer />
      <FeaturedProperties />
      <HomeProperties />
    </>
  );
}
