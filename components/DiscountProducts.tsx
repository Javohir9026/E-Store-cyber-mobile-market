"use client";
import axios from "axios";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
    .sort((a, b) => b.id - a.id).slice(0,4);

  return (
    <div className="mt-20 container">
      <h1 className="font-semibold text-[24px] mb-4">Discounts up to -50%</h1>
      <div className="grid grid-cols-4 gap-4 mt-[32px]"> 
        {sortedProducts.map((product:ProductType)=>(
          <div key={product.id} className=" bg-[#F6F6F6] p-4 rounded-[9px] shadow">
            <div className="flex justify-end">
              <button onClick={() => {}} className="cursor-pointer">
                <Heart height={35} width={35} />
              </button>
            </div>
            <div className="flex mx-[54px] my-4 items-center justify-center">
              <Image
                src={product.thumbnail}
                width={160}
                height={160}
                alt={product.title}
                className="w-full h-[250px] object-cover"
              />
            </div>
            <div className="flex flex-col items-center justify-center text-center gap-4">
              <h2 className="text-lg font-semibold text-[16px] line-clamp-2 h-11">
                {product.title}
              </h2>
              <p className="text-[24px] font-bold">${Math.round(product.price)}</p>
              <Link href={`/ProductDetails/${product.id}`}
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
};

export default DiscountProducts;
