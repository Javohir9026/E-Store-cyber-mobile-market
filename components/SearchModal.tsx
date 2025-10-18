"use client";
import axios from "axios";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

interface ProductType {
  id: number;
  thumbnail: string;
  title: string;
}

const SearchModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<ProductType[]>([]);
  const [query, setQuery] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setData([]);
      return;
    }

    try {
      const res = await axios.get(
        `https://dummyjson.com/products/search?q=${value}`
      );
      setData(res.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="relative flex w-[372px] h-[56px] items-center bg-[#F5F5F5] rounded-md"
    >
      <Search
        width={24}
        height={24}
        className="ml-[16px] my-[16px] stroke-gray-400"
      />
      <input
        placeholder="search"
        className="ml-2 w-full text-[14px] h-full outline-none"
        maxLength={35}
        type="text"
        onFocus={() => setIsOpen(true)}
        onChange={handleSearch}
        value={query}
        autoComplete="off"
        aria-label="Search products"
      />

      {isOpen && (
        <div className="absolute w-[372px] top-[50px] left-0 border border-gray-200 rounded-b-md z-50 bg-white max-h-[300px] overflow-y-auto shadow-md">
          {data.length > 0 ? (
            <ul>
              {data.map((item) => (
                <li key={item.id} className="border-b last:border-none">
                  <Link href={`/ProductDetails/${item.id}`}>
                    <a className="flex gap-3 hover:bg-gray-100 p-4 items-center font-semibold">
                      <Image
                        src={item.thumbnail}
                        height={50}
                        width={50}
                        alt={item.title}
                        className="rounded object-cover"
                      />
                      <span>{item.title}</span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          ) : query.trim() ? (
            <div className="p-4 text-gray-500 text-sm">Hech narsa topilmadi</div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchModal;
