"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface Category {
  slug: string;
  name: string;
  url: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("https://dummyjson.com/products/categories");
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="bg-[#FAFAFA]">
      <div className="w-full container py-20">
        <div className="flex items-center justify-between mb-8">
          <h1 className="flex font-semibold text-6 items-center">
            Browse By Category
          </h1>
          <div className="flex gap-2 items-center">
            <button
              onClick={scrollPrev}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              {"<"}
            </button>
            <button
              onClick={scrollNext}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              {">"}
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {categories.map((item) => (
              <div key={item.slug} className="flex-[0_0_16.66%] px-2">
                <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition h-full flex flex-col items-center justify-center">
                  <h3 className="text-lg font-semibold text-center">
                    {item.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
