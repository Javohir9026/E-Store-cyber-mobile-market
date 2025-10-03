import React from "react";
import PopularProduct from "@/assets/image/PopularProducts.png";
import IpadPro from "@/assets/image/IpadPro.png";
import SamsungGallaxy from "@/assets/image/SamsungGallaxy.png";
import MackbookAir from "@/assets/image/MackboockAir.png";
import Image from "next/image";

const MiddleBanner = () => {
  const Banners = [
    {
      id: 1,
      img: PopularProduct,
      title: "Popular Products",
      description:
        "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
      link: "/product/mackbookair",
    },
    {
      id: 2,
      img: IpadPro,
      title: "Ipad Pro",
      description:
        "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
      link: "/product/ipadpro",
    },
    {
      id: 3,
      img: SamsungGallaxy,
      title: "Samsung Galaxy",
      description:
        "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
      link: "/product/samsunggallaxy",
    },
    {
      id: 4,
      img: MackbookAir,
      title: "Macbook Pro",
      description:
        "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
      link: "/product/samsunggallaxy",
    },
  ];
  return (
    <div className="flex w-full justify-between mt-10">
      <div className="w-full">
        <div className="h-[400px]">
          <Image
            src={Banners[0].img}
            height={400}
            width={400}
            alt={Banners[0].title}
          />
        </div>
        <div className="px-[32px] flex flex-col gap-4 ">
          <h1 className="text-[33px]">{Banners[0].title}</h1>
          <h1 className="text-[14px] text-[#909090]">
            {Banners[0].description}
          </h1>
        </div>
        <div className="px-[32px] pb-[56px]">
          <button className="px-[56px] py-[16px] border-1 border-black rounded-[6px] text-black hover:bg-black hover:text-white mt-4">
            Shop Now
          </button>
        </div>
      </div>
      <div className="w-full bg-[#F9F9F9]">
        <div className="w-full">
          <div className="h-[400px]">
            <Image
              src={Banners[1].img}
              height={400}
              width={400}
              alt={Banners[1].title}
            />
          </div>
          <div className="px-[32px] flex flex-col gap-4 ">
            <h1 className="text-[33px]">{Banners[1].title}</h1>
            <h1 className="text-[14px] text-[#909090]">
              {Banners[1].description}
            </h1>
          </div>
          <div className="px-[32px] pb-[56px]">
            <button className="px-[56px] py-[16px] border-1 border-black rounded-[6px] text-black hover:bg-black hover:text-white mt-4">
              Shop Now
            </button>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#EAEAEA]">
        <div className="w-full">
          <div className="h-[400px]">
            <Image
              src={Banners[2].img}
              height={400}
              width={400}
              alt={Banners[2].title}
            />
          </div>
          <div className="px-[32px] flex flex-col gap-4 ">
            <h1 className="text-[33px]">{Banners[2].title}</h1>
            <h1 className="text-[14px] text-[#909090]">
              {Banners[2].description}
            </h1>
          </div>
          <div className="px-[32px] pb-[56px]">
            <button className="px-[56px] py-[16px]  rounded-[6px] border-1 border-black text-black hover:bg-black hover:text-white mt-4">
              Shop Now
            </button>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#2C2C2C]">
        <div className="w-full">
          <div className="h-[400px]">
            <Image
              src={Banners[3].img}
              height={400}
              width={400}
              alt={Banners[3].title}
            />
          </div>
          <div className="px-[32px] flex flex-col gap-4 ">
            <h1 className="text-[33px] text-white">{Banners[3].title}</h1>
            <h1 className="text-[14px] text-[#909090]">
              {Banners[3].description}
            </h1>
          </div>
          <div className="px-[32px] pb-[56px]">
            <button className="px-[56px] py-[16px] border rounded-[6px] rounded-white text-white hover:bg-black hover:text-white mt-4 hover:border-black">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiddleBanner;
