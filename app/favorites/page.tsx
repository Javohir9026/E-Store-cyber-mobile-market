"use client";
import { useEffect, useState } from "react";
import { getFromLocalStorage, saveToLocalStorage } from "../../utils/LocalStorage";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

// 1. Product interfeysini aniqla
interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export default function FavoritesPage() {
  // 2. Aniq turdagi holatni belgilash
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const stored = getFromLocalStorage("favorites");
    if (stored && Array.isArray(stored)) {
      setFavorites(stored);
    }
  }, []);

  if (favorites.length === 0)
    return (
      <p className="text-center mt-10 text-lg py-[300px] justify-center">
        Your Wishlist is empty {"("}
      </p>
    );

  const handleFavorite = (product: Product) => {
    const exists = favorites.some((f) => f.id === product.id);
    let updated: Product[];

    if (exists) {
      updated = favorites.filter((f) => f.id !== product.id);
    } else {
      updated = [...favorites, product];
    }

    setFavorites(updated);
    saveToLocalStorage("favorites", updated);
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    saveToLocalStorage("favorites", []);
  };

  const isFavorite = (id: number) => favorites.some((f) => f.id === id);

  return (
    <div className="flex flex-col gap-5 container">
      <div className="flex justify-between items-center mt-5">
        <h1 className="text-[30px] font-bold">Your Wishlist</h1>

        <button
          onClick={clearAllFavorites}
          className="rounded-md border px-8 py-3 text-black border-black hover:bg-black hover:text-white text-center"
        >
          Clear All
        </button>
      </div>

      <div className="px-8 py-4 mb-5 grid grid-cols-4 gap-6">
        {favorites.map((p) => (
          <div key={p.id} className="bg-[#F6F6F6] p-4 rounded-[9px] shadow">
            <div className="flex justify-end">
              <button onClick={() => handleFavorite(p)} className="cursor-pointer">
                <Heart
                  height={35}
                  width={35}
                  color={isFavorite(p.id) ? "red" : "black"}
                  fill={isFavorite(p.id) ? "red" : "transparent"}
                />
              </button>
            </div>

            <Link href={`/ProductDetails/${p.id}`}>
              <div className="flex mx-[54px] my-4 items-center justify-center">
                <Image
                  src={p.thumbnail}
                  width={160}
                  height={160}
                  alt={p.title}
                  className="w-full h-[250px] object-cover"
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-lg font-semibold text-[16px] line-clamp-2 h-11">
                  {p.title}
                </h2>
                <p className="text-[24px] font-bold">${Math.round(p.price)}</p>
              </div>
            </Link>

            <div className="flex justify-center items-center mt-5">
              <button
                className="bg-black text-white border border-transparent 
                  hover:bg-white hover:border-black hover:text-black 
                  px-[64px] py-3 rounded-[8px] cursor-pointer"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
