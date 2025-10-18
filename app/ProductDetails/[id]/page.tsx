"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { BadgeCheck, BadgeMinus, Star, Store, Truck } from "lucide-react";
import { getFromLocalStorage, saveToLocalStorage } from "../../../utils/LocalStorage";
import { toast } from "react-toastify";

interface ProductType {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  description: string;
  stock: number;
  rating: number;
  thumbnail: string;
  images: string[];
  tags?: string[];
  colors?: string[];
  delivery?: string;
  guaranteed?: number;
}

const Page: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";

  const [product, setProduct] = useState<ProductType | null>(null);
  const [selectedImg, setSelectedImg] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  // Favorites uchun aniq tur ishlatilmoqda
  const [favorites, setFavorites] = useState<ProductType[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data: ProductType = await res.json();

        if (!data.images || data.images.length === 0) {
          data.images = [data.thumbnail];
        }
        if (!data.colors || data.colors.length === 0) {
          data.colors = ["red", "blue", "green"];
        }

        setProduct(data);
        setSelectedImg(data.images[0]);
        setSelectedColor(data.colors[0]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const stored = getFromLocalStorage<ProductType[]>("favorites");
    if (stored && Array.isArray(stored)) {
      setFavorites(stored);
    }
  }, []);

  const handleFavorite = (product: ProductType) => {
    const exists = favorites.some((f) => f.id === product.id);
    let updated: ProductType[];

    if (exists) {
      updated = favorites.filter((f) => f.id !== product.id);
      toast.info("Product removed from Wishlist", { autoClose: 1500 });
    } else {
      updated = [...favorites, product];
      toast.success("Product successfully added", { autoClose: 1500 });
    }

    setFavorites(updated);
    saveToLocalStorage("favorites", updated);
  };

  if (!product) return <div>Loading...</div>;

  const discountPrice = product.price - product.price * (product.discountPercentage / 100);

  return (
    <div>
      <div className="flex gap-[48px] px-[160px] py-[112px] justify-between">
        <div className="flex gap-[30px] h-[516px] w-[536px]">
          {product.images.length > 1 ? (
            <>
              <div className="flex flex-col gap-[24px] justify-center items-center">
                {product.images.map((img, i) => (
                  <div key={i}>
                    <button onClick={() => setSelectedImg(img)}>
                      <Image
                        src={img}
                        alt="images"
                        width={75}
                        height={95}
                        className={`object-cover transition-all duration-300 ${
                          selectedImg === img ? "scale-110 opacity-100" : "opacity-40"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src={selectedImg}
                  height={400}
                  width={400}
                  alt="mainimg"
                  className="w-[400px] h-full object-contain"
                />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <Image
                src={product.images[0]}
                alt="mainimg"
                width={400}
                height={400}
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>

        <div className="w-[540px] gap-4">
          <div className="flex flex-col gap-6">
            <h1 className="flex font-bold text-[40px] text-center">{product.title}</h1>
            <div className="flex gap-4 text-[32px] items-center">
              <span className="text-[32px] font-bold text-black">${discountPrice.toFixed(2)}</span>
              <span className="text-[#A0A0A0] line-through text-[24px]">${product.price}</span>
            </div>
          </div>

          {product.colors && (
            <div className="flex gap-3 items-center mt-6">
              <span>Select color:</span>
              <div className="flex gap-1">
                {product.colors.map((c, i) => (
                  <button
                    onClick={() => setSelectedColor(c)}
                    key={i}
                    className={`rounded-full w-[30px] h-[30px] p-[2px] ${selectedColor === c ? "border-2" : ""}`}
                  >
                    <div className="rounded-full w-full h-full" style={{ background: c }}></div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.tags && (
            <div className="flex gap-4 items-center mt-6">
              {product.tags.map((t, i) => (
                <div key={i} className="flex px-6 py-4 bg-[#F4F4F4] rounded-md">
                  {t}
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-4 mt-6">
            <div className="flex items-center gap-2">
              Rating:{" "}
              <span className="flex gap-1 items-center">
                {product.rating}{" "}
                <Star width={15} height={15} className="fill-yellow-500 stroke-yellow-500" />
              </span>
            </div>
            <div className="flex gap-2 items-center">
              Stock: {product.stock} pcs
              {product.stock > 0 ? (
                <BadgeCheck height={15} width={15} className="fill-green-500" />
              ) : (
                <BadgeMinus height={15} width={15} className="fill-red-500" />
              )}
            </div>
            <p className="text-[#6C6C6C] mt-2">{product.description}</p>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <button
              className="px-[72px] w-[260px] py-4 border-2 cursor-pointer rounded-md"
              onClick={() => handleFavorite(product)}
            >
              Add to Wishlist
            </button>
            <button className="px-[72px] w-[260px] py-[17px] cursor-pointer bg-black text-white rounded-md">
              Add to Cart
            </button>
          </div>

          <div className="flex gap-[32px] items-center mt-[32px]">
            <div className="w-[160px] flex gap-2 items-center">
              <div className="bg-[#F6F6F6] px-4 py-4 rounded-md w-[56px]">
                <Truck width={24} height={24} />
              </div>
              <div className="flex flex-col text-[14px]">
                <h1 className="text-[#717171]">Free Delivery</h1>
                <h1>{product.delivery || "1-2"} Day</h1>
              </div>
            </div>
            <div className="w-[160px] flex gap-2 items-center">
              <div className="bg-[#F6F6F6] px-4 py-4 rounded-md w-[56px]">
                <Store width={24} height={24} />
              </div>
              <div className="flex flex-col text-[14px]">
                <h1 className="text-[#717171]">In Stock</h1>
                <h1>{product.stock} pcs</h1>
              </div>
            </div>
            <div className="w-[160px] flex gap-2 items-center">
              <div className="bg-[#F6F6F6] px-4 py-4 rounded-md w-[56px]">
                <BadgeCheck width={24} height={24} />
              </div>
              <div className="flex flex-col text-[14px]">
                <h1 className="text-[#717171]">Guaranteed</h1>
                <h1>{product.guaranteed || 1} Year</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
