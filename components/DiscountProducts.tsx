"use client";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/LocalStorage";
import axios from "axios";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ProductType {
  id: number;
  discountPercentage: number;
  price: number;
  title: string;
  thumbnail: string;
}

const DiscountProducts = () => {
  const [data, setData] = useState<ProductType[]>([]);

  const api = "https://dummyjson.com/products";

  const fetchData = async () => {
    try {
      const d = await axios.get(api);
      setData(d.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortedProducts = data
    .filter((p) => p.discountPercentage >= 15)
    .sort((a, b) => b.id - a.id)
    .slice(0, 4);

  const [favorites, setFavorites] = useState<any[]>([]);

  const [cart, setCart] = useState<any[]>([]);
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
  useEffect(() => {
    const storedFav = getFromLocalStorage("favorites");
    const storedCart = getFromLocalStorage("cart");

    if (storedFav) setFavorites(storedFav);
    if (storedCart) setCart(storedCart);
  }, [data]);

  const handleCart = (product: any) => {
    const exists = cart.some((c) => c.id === product.id);
    let updated;

    if (exists) {
      updated = cart.filter((c) => c.id !== product.id);
      toast.info("Product removed from cart");
    } else {
      updated = [...cart, { ...product, quantity: 1 }];
      toast.success("Product successfully added");
    }

    setCart(updated);
    saveToLocalStorage("cart", updated);
  };
  const isInCart = (id: number) => cart.some((c) => c.id === id);

  const isFavorite = (id: number) => favorites.some((f) => f.id === id);
  return (
    <div className="mt-20 container">
      <h1 className="font-semibold text-[24px] mb-4">Discounts up to -50%</h1>
      <div className="grid grid-cols-4 gap-4 mt-[32px]">
        {sortedProducts.map((product: ProductType) => (
          <div
            key={product.id}
            className=" bg-[#F6F6F6] p-4 rounded-[9px] shadow"
          >
            <div className="flex justify-end">
              <button
                onClick={() => handleFavorite(product)}
                className="cursor-pointer"
              >
                <Heart
                  height={35}
                  width={35}
                  color={isFavorite(product.id) ? "red" : "black"}
                  fill={isFavorite(product.id) ? "red" : "transparent"}
                />
              </button>
            </div>
            <Link href={`/ProductDetails/${product.id}`}>
              <div className="flex mx-[54px] my-4 items-center justify-center">
                <Image
                  src={product.thumbnail}
                  width={160}
                  height={160}
                  alt={product.title}
                  className="w-full h-[250px] object-cover"
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-lg font-semibold text-[16px] line-clamp-2 h-11">
                  {product.title}
                </h2>
                <p className="text-[24px] font-bold">
                  ${Math.round(product.price)}
                </p>
              </div>
            </Link>
            <div className="flex justify-center items-center mt-5">
              <button
                onClick={() => handleCart(product)}
                className={`px-[64px] py-3 rounded-[8px] cursor-pointer border transition-all duration-200 ${
                  isInCart(product.id)
                    ? "bg-white text-black border-black hover:bg-black hover:text-white"
                    : "bg-black text-white border-transparent hover:bg-white hover:border-black hover:text-black"
                }`}
              >
                {isInCart(product.id) ? "Remove from cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscountProducts;
