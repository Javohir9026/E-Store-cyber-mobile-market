"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/LocalStorage";
import axios from "axios";
import { Heart, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const filters = [
  {
    title: "Brand",
    filter: [
      "Apple",
      "Samsung",
      "Xiaomi",
      "Huawei",
      "Oppo",
      "Vivo",
      "Realme",
      "OnePlus",
      "Motorola",
      "Sony",
    ],
  },
  {
    title: "Battery capacity",
    filter: [
      "Below 2000 mAh",
      "2000 - 2999 mAh",
      "3000 - 3499 mAh",
      "3500 - 3999 mAh",
      "4000 - 4499 mAh",
      "4500 - 4999 mAh",
      "5000 - 5499 mAh",
      "5500 - 5999 mAh",
      "6000 - 6999 mAh",
      "7000 mAh and above",
    ],
  },
  {
    title: "Screen type",
    filter: [
      "LCD",
      "IPS LCD",
      "TFT",
      "OLED",
      "AMOLED",
      "Super AMOLED",
      "Dynamic AMOLED",
      "Retina Display",
      "Mini-LED",
      "Micro-LED",
    ],
  },
  {
    title: "Screen diagonal",
    filter: [
      "5.0 - 5.5 inch",
      "5.6 - 6.0 inch",
      "6.1 - 6.3 inch",
      "6.4 - 6.7 inch",
      "6.8 inch va undan katta",
    ],
  },
  {
    title: "Protection class",
    filter: [
      "IP52 - Chang va tomchilarga chidamli",
      "IP54 - Chang va suv chayqalishiga chidamli",
      "IP67 - Changdan to‘liq himoya, 1m suvga 30 daqiqa",
      "IP68 - Changdan to‘liq himoya, 1.5m suvga 30 daqiqa",
      "IP69K - Chang va yuqori bosimli issiq suvga chidamli",
    ],
  },
  {
    title: "Built-in memory",
    filter: [
      "2 GB",
      "3 GB",
      "4 GB",
      "6 GB",
      "8 GB",
      "12 GB",
      "16 GB",
      "24 GB",
      "32 GB",
      "64 GB",
    ],
  },
];

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
}

const Page = () => {
  const [filter, setFilter] = useState<"rating" | "expensive" | "cheap">(
    "rating"
  );
  const pathname = usePathname();
  const title = pathname.split("/").pop();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({});

  const productsPerPage = 16;

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/category/${title}`
      );
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [title]);

  useEffect(() => {
    if (products.length === 0) return;

    let sorted: Product[] = [];

    if (filter === "rating") {
      sorted = [...products].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }

    if (filter === "expensive") {
      sorted = [...products].sort((a, b) => b.price - a.price);
    }

    if (filter === "cheap") {
      sorted = [...products].sort((a, b) => a.price - b.price);
    }

    setProducts(sorted);
  }, [filter]);

  useEffect(() => {
    const stored = getFromLocalStorage("favorites");
    if (stored) setFavorites(stored);
  }, []);

  const handleFavorite = (product: any) => {
    const exists = favorites.some((f) => f.id === product.id);
    let updated;

    if (exists) {
      updated = favorites.filter((f) => f.id !== product.id);
    } else {
      updated = [...favorites, product];
    }

    setFavorites(updated);
    saveToLocalStorage("favorites", updated);
  };

  const isFavorite = (id: number) => favorites.some((f) => f.id === id);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleSearch = (sectionTitle: string, value: string) => {
    setSearchTerms((prev) => ({
      ...prev,
      [sectionTitle]: value.toLowerCase(),
    }));
  };
  const [buttonClick, setButtonClick] = useState(false);

  const handleCart = (product: any) => {
    setButtonClick(!buttonClick);
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const exists = cart.find((item: any) => item.id === product.id);
    let updatedCart;
    if (exists) {
      updatedCart = cart.filter((item: any) => item.id !== product.id);
    } else {
      updatedCart = [...cart, product];
    }
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  return (
    <div className="container flex gap-[32px]">
      <div className="w-[280px] rounded-md p-4">
        <Accordion type="multiple" className="w-full">
          {filters.map((section, i) => {
            const searchValue = searchTerms[section.title] || "";
            const filteredItems = section.filter.filter((f) =>
              f.toLowerCase().includes(searchValue)
            );

            return (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-lg font-semibold">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex px-[11px] rounded-md bg-[#F5F5F5] gap-2 py-2 mb-4 items-center">
                    <Search className="stroke-gray-400" />
                    <input
                      type="text"
                      className="w-full focus:outline-none font-semibold"
                      maxLength={20}
                      placeholder="Search"
                      value={searchValue}
                      onChange={(e) =>
                        handleSearch(section.title, e.target.value)
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    {filteredItems.map((f, idx) => (
                      <label
                        key={idx}
                        htmlFor={`${section.title}-${idx}`}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Checkbox id={`${section.title}-${idx}`} />
                        <span className="text-sm font-semibold">{f}</span>
                      </label>
                    ))}

                    {filteredItems.length === 0 && (
                      <p className="text-sm text-gray-500 italic">
                        No results found
                      </p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      <div className="flex-1 rounded-md p-4">
        <div className="flex justify-between">
          <h2 className="text-xl text-[#6C6C6C] mb-4">
            Selected Products:{" "}
            <span className="font-semibold text-black">{products.length}</span>
          </h2>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="w-[220px]">
              <Button variant="outline">By {filter}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup
                value={filter}
                onValueChange={(val) =>
                  setFilter(val as "rating" | "expensive" | "cheap")
                }
              >
                <DropdownMenuRadioItem value="rating">
                  By Rating
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="expensive">
                  By Expensive
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="cheap">
                  By Cheap
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {currentProducts.map((p) => (
            <div
              key={p.id}
              className="bg-[#F6F6F6] p-4 rounded-[9px] shadow flex flex-col justify-between"
            >
              <div className="flex justify-end">
                <button
                  onClick={() => handleFavorite(p)}
                  className="cursor-pointer"
                >
                  <Heart
                    height={35}
                    width={35}
                    color={isFavorite(p.id) ? "red" : "black"}
                    fill={isFavorite(p.id) ? "red" : "transparent"}
                  />
                </button>
              </div>

              <div className="flex items-center justify-center flex-1">
                <Image
                  src={p.thumbnail}
                  width={160}
                  height={160}
                  alt={p.title}
                  className="object-contain max-h-[200px]"
                />
              </div>

              <div className="flex flex-col items-center text-center gap-2 mt-4">
                <h2 className="text-sm font-semibold line-clamp-2 h-10">
                  {p.title}
                </h2>
                <p className="text-xl font-bold">${Math.round(p.price)}</p>
                <button
                  onClick={() => handleCart(p)}
                  className="bg-black text-white border border-transparent 
        hover:bg-white hover:border-black hover:text-black 
        px-[64px] py-3 rounded-[8px] cursor-pointer"
                >
                  {buttonClick ? "Remove from cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            {"<"}
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
