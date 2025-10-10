"use client";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { saveToLocalStorage, getFromLocalStorage } from "@/utils/LocalStorage";
import { toast } from "react-toastify";

type Product = {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
  quantity: number;
};

export default function PopularProducts() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<"arrival" | "bestseller" | "featured">(
    "arrival"
  );
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setAllProducts(data.products);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (allProducts.length === 0) return;
    let filtered: Product[] = [];

    if (filter === "arrival") {
      filtered = [...allProducts].sort((a, b) => b.id - a.id).slice(0, 8);
    } else if (filter === "bestseller") {
      filtered = [...allProducts].sort((a, b) => b.rating - a.rating).slice(0, 8);
    } else if (filter === "featured") {
      filtered = [...allProducts].sort((a, b) => b.price - a.price).slice(0, 8);
    }

    const storedFav = getFromLocalStorage("favorites");
    const storedCart = getFromLocalStorage("cart");

    if (storedFav) setFavorites(storedFav);
    if (storedCart) setCart(storedCart);

    setProducts(filtered);
  }, [filter, allProducts]);

  const handleFavorite = (product: Product) => {
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

  const handleCart = (product: Product) => {
    const exists = cart.some((c) => c.id === product.id);
    let updated;

    if (exists) {
      updated = cart.filter((c) => c.id !== product.id);
      toast.info("Product removed from cart");
    } else {
      updated = [...cart, { ...product, quantity: 1}];
      toast.success("Product successfully added");
    }

    setCart(updated);
    saveToLocalStorage("cart", updated);
  };

  const isFavorite = (id: number) => favorites.some((f) => f.id === id);
  const isInCart = (id: number) => cart.some((c) => c.id === id);

  return (
    <div className="container">
      <div className="flex mt-[56px] mb-[32px] gap-[32px] font-semibold">
        <button
          onClick={() => setFilter("arrival")}
          className={
            filter === "arrival"
              ? "text-black border-b-2 border-black"
              : "text-[#8B8B8B] cursor-pointer"
          }
        >
          New Arrival
        </button>
        <button
          onClick={() => setFilter("bestseller")}
          className={
            filter === "bestseller"
              ? "text-black border-b-2 border-black"
              : "text-[#8B8B8B] cursor-pointer"
          }
        >
          Bestseller
        </button>
        <button
          onClick={() => setFilter("featured")}
          className={
            filter === "featured"
              ? "text-black border-b-2 border-black"
              : "text-[#8B8B8B] cursor-pointer"
          }
        >
          Featured Products
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 justify-between px-4 py-6">
        {products.map((p) => (
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
                onClick={() => handleCart(p)}
                className={`px-[64px] py-3 rounded-[8px] cursor-pointer border transition-all duration-200 ${
                  isInCart(p.id)
                    ? "bg-white text-black border-black hover:bg-black hover:text-white"
                    : "bg-black text-white border-transparent hover:bg-white hover:border-black hover:text-black"
                }`}
              >
                {isInCart(p.id) ? "Remove from cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
