import React from "react";
import BannerIMg from "../assets/image/FootBanner.png";
import Image from "next/image";
import Link from "next/link";

const FootBanner = () => {
  
  const Banner = [
    {
      id: 1,
      img: BannerIMg,
      title: "Big Summer",
      SpanTitle: "Sale",
      description: "Commodo fames vitae vitae leo mauris in. Eu consequat.",
      link: "/bigsummersale",
    },
  ];

  return (
    <div className="mt-[80px]">
      {Banner.map((bnr) => (
        <div key={bnr.id}>
          <div className="relative">
            <Image
              src={bnr.img}
              alt={bnr.title}
              width={1200}
              height={400}
              className="object-cover w-full"
              priority
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h1 className="text-5xl text-white">
                {bnr.title}{" "}
                <span className="font-semibold text-white">
                  {bnr.SpanTitle}
                </span>
              </h1>
              <p className="text-[#787878] mt-3">{bnr.description}</p>
                <Link href={'/ProductDetails/iphone14pro'} className="px-[56px] py-4 text-white rounded-[9px] border border-white mt-10 hover:border-black hover:bg-black">Shop Now</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FootBanner;
