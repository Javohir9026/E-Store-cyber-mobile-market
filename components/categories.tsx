"use client";
import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import axios from "axios";
import { ChevronLeft, ChevronRight, Smartphone } from "lucide-react";
import Link from "next/link";

const CategoryCarousel = () => {
  const [category, setCategory] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://dummyjson.com/products/category-list"
        );
        setCategory(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section className="embla container">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Browse By Category</h2>
        <div className="flex gap-2">
          <button onClick={scrollPrev} className="embla__button">
            <ChevronLeft height={32} width={32} />
          </button>
          <button onClick={scrollNext} className="embla__button">
            <ChevronRight height={32} width={32} />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {category.map((cat, i) => (
            <div className="embla__slide" key={i}>
              <Link
                href={`/category/${cat}`}
                className="embla__slide__number flex flex-col !bg-[#EDEDED]"
              >
                <Smartphone width={60} height={60} /> {cat}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;
