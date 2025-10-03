"use client";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
};

export default function PopularProducts() {
 const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<"arrival" | "bestseller" | "featured">(
    "arrival"
  );

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
      filtered = [...allProducts]
        .sort((a, b) => b.id - a.id)
        .slice(0, 8);
    }

    if (filter === "bestseller") {
      filtered = [...allProducts]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 8);
    }

    if (filter === "featured") {
      filtered = [...allProducts]
        .sort((a, b) => b.price - a.price)
        .slice(0, 8);
    }

    setProducts(filtered);
  }, [filter, allProducts]);

  return (
    <div className="container">
      <div className="flex mt-[56px] mb-[32px] gap-[32px] font-semibold">
        <button onClick={()=> setFilter('arrival')} className={filter === 'arrival' ? 'text-black border-b-2  border-black' : 'text-[#8B8B8B] cursor-pointer'}>New Arrival</button>
        <button onClick={()=> setFilter('bestseller')} className={filter === 'bestseller' ? 'text-black border-b-2 border-black' : 'text-[#8B8B8B] cursor-pointer'}>Bestseller</button>
        <button onClick={()=> setFilter('featured')} className={filter === 'featured' ? 'text-black border-b-2 border-black' : 'text-[#8B8B8B] cursor-pointer'}>Featured Products</button>
      </div>
      <div className="grid grid-cols-4 gap-4 justify-between px-4 py-6">
        {products.map((p) => (
          <div key={p.id} className=" bg-[#F6F6F6] p-4 rounded-[9px] shadow">
            <div className="flex justify-end">
              <button onClick={() => {}} className="cursor-pointer">
                <Heart height={35} width={35} />
              </button>
            </div>
            <div className="flex mx-[54px] my-4 items-center justify-center">
              <Image
                src={p.thumbnail}
                width={160}
                height={160}
                alt={p.title}
                className="w-full h-[250px] object-cover"
              />
            </div>
            <div className="flex flex-col items-center justify-center text-center gap-4">
              <h2 className="text-lg font-semibold text-[16px] line-clamp-2 h-11">
                {p.title}
              </h2>
              <p className="text-[24px] font-bold">${Math.round(p.price)}</p>
              <Link href={`/ProductDetails/${p.id}`}
                className="bg-black text-white border border-transparent 
                   hover:bg-white hover:border-black hover:text-black 
                   px-[64px] py-3 rounded-[8px] cursor-pointer"
              >
                Buy Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
