import Image from "next/image";
import React from "react";
import HeroIphone from "@/assets/image/Iphone Image.png";
import Playstation from "@/assets/image/PlayStation.png";
import appleAirPods from "@/assets/image/AirPodsMax.png";
import AppleVisionPro from "@/assets/image/AppleVisionPro.png";
import MackBookAir from "@/assets/image/MackboockAir.png";
import Link from "next/link";

const Hero = () => {
  const mainHero = [
    {
      author: "Pro.Beyond.",
      title: "Iphone 14",
      SpanTitle: "Pro",
      description: "Created to change everything for the better. For everyone",
      link: "/ProductDetails/iphone14pro",
      img: HeroIphone,
    },
  ];

  const HeroGrid = [
    {
      id: 1,
      title: "Playstation",
      SpanTitle: "5",
      description:
        "Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.",
      img: Playstation,
      link: "/ProductDetails/iphone14pro",
    },
    {
      id: 2,
      title: "Apple AirPods",
      SpanTitle: "Max",
      description: "Computational audio. Listen, it’s powerful",
      img: appleAirPods,
      link: "/ProductDetails/iphone14pro",
    },
    {
      id: 3,
      title: "Apple Vision",
      SpanTitle: "Pro",
      description: "An immersive way to experience entertainment",
      img: AppleVisionPro,
      link: "/ProductDetails/iphone14pro",
    },
    {
      id: 4,
      title: "Macbook",
      SpanTitle: "Air",
      description:
        "The new 15-inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display",
      img: MackBookAir,
      link: "/ProductDetails/iphone14pro",
    },
  ];

  return (
    <div className="bg-[#211C24] min-h-[632px] w-full mb-10">
      <div className="flex gap-5 items-center justify-center">
        <div className="px-[160px]">
          <h1 className="text-[#FFFFFF] opacity-40 font-bold text-[25px]">
            {mainHero[0].author}
          </h1>
          <h1 className="text-[95px] text-white">
            {mainHero[0].title}{" "}
            <span className="font-bold">{mainHero[0].SpanTitle}</span>
          </h1>
          <h1 className="text-[#909090]">{mainHero[0].description}</h1>
          <Link href={mainHero[0].link}>
            <button className="mt-6 border cursor-pointer border-white hover:border-black text-white px-6 py-2 rounded-md hover:bg-black hover:text-white transition w-[191px] h-[56px]">
              Shop Now
            </button>
          </Link>
        </div>
        <div>
          <Image
            src={mainHero[0].img}
            height={632}
            width={406}
            alt="iphoneImage"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 grid-rows-2 gap-0 w-full h-[600px]">
        {HeroGrid.map((item) => {
          if (item.id === 1) {
            return (
              <Link href={'/ProductDetails/iphone14pro'} key={item.id} className="col-span-2 bg-gray-100 flex">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={500}
                  height={400}
                  className="object-cover"
                />
                <div className="flex flex-col justify-center px-10">
                  <h2 className="text-3xl font-semibold">
                    {item.title}{" "}
                    <span className="font-bold">{item.SpanTitle}</span>
                  </h2>
                  <p className="text-[#909090] mt-2">{item.description}</p>
                </div>
              </Link>
            );
          }

          if (item.id === 2) {
            return (
              <Link href={'/ProductDetails/iphone14pro'}
                key={item.id}
                className="relative col-start-1 row-start-2 bg-[#EDEDED] p-6 flex items-center overflow-hidden"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  width={200}
                  height={200}
                  className="absolute left-[-200px] h-full w-full top-1/2 -translate-y-1/2 object-contain"
                />

                <div className="ml-[140px]">
                  <h2 className="text-[29px] leading-tight">
                    {item.title.split(" ").map((word, i) => (
                      <span key={i} className="block">
                        {word}
                      </span>
                    ))}
                    <span className="font-bold block">{item.SpanTitle}</span>
                  </h2>
                  <p className="text-[#909090] mt-2">{item.description}</p>
                </div>
              </Link>
            );
          }

          if (item.id === 3) {
            return (
              <Link href={'/ProductDetails/iphone14pro'}
                key={item.id}
                className="col-start-2 row-start-2 bg-[#353535] p-6 flex relative overflow-hidden justify-center items-center"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  width={200}
                  height={200}
                  className="absolute left-[-200px] h-full w-full top-1/2 -translate-y-1/2 object-contain scale-x-[-1] "
                />
                <div className="flex flex-col ml-[170px]">
                  <h2 className="text-xl text-[29px] text-white whitespace-pre-line leading-tight">
                    {item.title.split(" ").join("\n")}
                    <span className="font-bold">{item.SpanTitle}</span>
                  </h2>

                  <p className="text-gray-300 mt-2">{item.description}</p>
                </div>
              </Link>
            );
          }

          if (item.id === 4) {
            return (
              <div                key={item.id}
                className="col-span-2 row-span-2 col-start-3 row-start-1 bg-[#EDEDED] p-6 flex relative overflow-hidden items-center justify-center"
              >
                <div className="z-10 w-[372px] mr-[230px]">
                  <h2 className="text-3xl">
                    {item.title}{" "}
                    <span className="font-bold">{item.SpanTitle}</span>
                  </h2>
                  <p className="text-[#909090] mt-2">{item.description}</p>
                  <Link href={item.link}>
                    <button className="mt-6 border cursor-pointer border-black px-6 py-2 rounded-md hover:bg-black hover:text-white transition w-[191px] h-[56px]">
                      Shop Now
                    </button>
                  </Link>
                </div>

                <Image
                  src={item.img}
                  alt={item.title}
                  width={10000}
                  height={10000}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 object-contain"
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Hero;
