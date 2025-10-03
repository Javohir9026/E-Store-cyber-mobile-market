"use client";
import React from "react";
import AppleMain from "@/assets/image/apple14Details/apple14proDeatilmain.png";
import FrontApple from "@/assets/image/apple14Details/frontapple.png";
import BehindAPple from "@/assets/image/apple14Details/behindApple.png";
import Apple3D from "@/assets/image/apple14Details/3dapple.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BadgeCheck, BadgeMinus, Star, Store, Truck } from "lucide-react";
const page = () => {
  const [selectedImg, setSelectedImg] = useState(AppleMain);
  interface ProductType {
    id: number;
    title: string;
    price: number;
    discountPercentage: number;
    tags: string[];
    category: string;
    rating: number;
    stock: number;
    brand: string;
    thumbnail: any;
    images: [];
  }

  const ProductData = [
    {
      id: 1,
      title: "Apple iPhone 14 Pro Max",
      price: "$1499",
      description:
        "Enhanced capabilities thanks toan enlarged display of 6.7 inchesand work without rechargingthroughout the day. Incredible photosas in weak, yesand in bright lightusing the new systemwith two cameras more...",
      discountPrice: "$1399",
      colors: ["red", "yellow", "orange", "blue"],
      tags: ["Phone", "MobilePhone", "Apple"],
      category: "MobilePhones",
      rating: 5,
      stock: 25,
      brand: "apple",
      thumbnail: AppleMain,
      delivery: "1-2",
      images: [AppleMain, FrontApple, BehindAPple, Apple3D],
      guaranted: 5
    },
  ];
  const [selectedColor, setSelectedColor] = useState(ProductData[0].colors[0]);

  return (
    <div className="">
      {/* {Main details} */}
      <div className="flex  gap-[48px] px-[160px] py-[112px] justify-between">
        {/* {Left images} */}
        <div className=" flex gap-[30px] h-[516px] w-[536px]">
          <div className="flex flex-col gap-[24px] justify-center items-center">
            {ProductData[0].images.map((img, i) => (
              <div key={i}>
                <button onClick={() => setSelectedImg(img)}>
                  <Image
                    src={img}
                    alt="images"
                    width={75}
                    height={95}
                    className={`object-cover transition-all duration-300 ${
                      selectedImg === img
                        ? "scale-110 opacity-100"
                        : "opacity-40"
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
        </div>
        {/* {right texts} */}
        <div className=" w-[540px] gap-4">
          <div className="flex flex-col gap-6">
            <h1 className="flex font-bold text-[40px] text-center">
              {ProductData[0].title}
            </h1>
            <div className="flex gap-4 text-[32px] items-center">
              <h1 className="flex items-center justify-center">
                {ProductData[0].price}
              </h1>
              <span className="text-[#A0A0A0] line-through text-[24px]">
                {ProductData[0].discountPrice}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex gap-3 items-center">
              <span>Select color:</span>
              <div className="flex gap-1">
                {ProductData[0].colors.map((c, i) => (
                  <button
                    onClick={() => setSelectedColor(c)}
                    key={i}
                    className={
                      selectedColor === c
                        ? "rounded-full w-[30px] h-[30px] border-3"
                        : "rounded-full w-[30px] h-[30px]"
                    }
                    style={{ background: c }}
                  >
                    {" "}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h1>Tags: </h1>
              <div className="flex gap-4 items-center">
                {ProductData[0].tags.map((t, i) => (
                  <div key={i} className="flex px-6 py-4 bg-[#F4F4F4] rounded-md">
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                Rating:{" "}
                <span className="flex gap-1 items-center">
                  {ProductData[0].rating}{" "}
                  <Star
                    width={15}
                    height={15}
                    className="fill-yellow-500 stroke-yellow-500"
                  />
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <h1 className="flex gap-2 items-center">
                Stock:{" "}
                {ProductData[0].stock} pcs
                {ProductData[0].stock > 0 ? (
                  <BadgeCheck height={15} width={15} className="fill-green-500" />
                ) : (
                  <BadgeMinus height={15} width={15} className="fill-red-500" />
                )}{" "}
                
              </h1>
            </div>
            <div>
              <h1 className="text-[#6C6C6C]">{ProductData[0].description}</h1>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between items-center">
              <button className="px-[72px] w-[260px] py-4 border-2 cursor-pointer rounded-md">
                Add to Wishlist
              </button>
              <button className="px-[72px] w-[260px] py-[17px] cursor-pointer bg-black text-white rounded-md">
                Add to Card
              </button>
            </div>
            <div className="flex gap-[32px] items-center mt-[32px]">
              <div className="w-[160px] flex gap-2 items-center">
                <div className=" bg-[#F6F6F6] px-4 py-4 rounded-md w-[56px]">
                  <Truck width={24} height={24} />
                </div>
                <div className="flex flex-col text-[14px]">
                  <h1 className="text-[#717171]">Free Delivery</h1>
                  <h1>{ProductData[0].delivery} Day</h1>
                </div>
              </div>
              <div className="w-[160px] flex gap-2 items-center">
                <div className=" bg-[#F6F6F6] px-4 py-4 rounded-md w-[56px]">
                  <Store width={24} height={24} />
                </div>
                <div className="flex flex-col text-[14px]">
                  <h1 className="text-[#717171]">In Stock</h1>
                  <h1>{ProductData[0].stock} pcs</h1>
                </div>
              </div>
              <div className="w-[160px] flex gap-2 items-center">
                <div className=" bg-[#F6F6F6] px-4 py-4 rounded-md w-[56px]">
                  <BadgeCheck width={24} height={24} />
                </div>
                <div className="flex flex-col text-[14px]">
                  <h1 className="text-[#717171]">Guaranteed</h1>
                  <h1>{ProductData[0].guaranted} Year</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
