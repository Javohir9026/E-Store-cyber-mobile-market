import Categories from "@/components/categories";
import DiscountProducts from "@/components/DiscountProducts";
import FootBanner from "@/components/FootBanner";
import Hero from "@/components/Hero";
import MiddleBanner from "@/components/MiddleBanner";
import SortedProducts from "@/components/SortedProducts";

export default function Home() {
  return <div className="bg-white">
    <Hero/>
    <Categories />
    <SortedProducts/>
    <MiddleBanner/>
    <DiscountProducts/>
    <FootBanner/>
  </div>;
}
