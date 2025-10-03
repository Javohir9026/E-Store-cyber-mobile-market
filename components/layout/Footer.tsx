import React from "react";
import Logo from "@/assets/image/Logo.png";
import Image from "next/image";
import Twitter from "@/assets/icon/twitter-svgrepo-com.svg";
import Facebook from "@/assets/icon/facebook-svgrepo-com.svg";
import TikTok from "@/assets/icon/tiktok-svgrepo-com.svg";
import Instagram from "@/assets/icon/instagram-svgrepo-com.svg";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="bg-black px-[160px] py-[104px] text-white">
      <div className="flex justify-between">
        <div className="flex flex-col gap-6 w-[360px]">
          <Image src={Logo} alt="logo" width={65} height={23} />
          <h1 className="text-[#CFCFCF] text-[14px]">
            We are a residential interior design firm located in Portland. Our
            boutique-studio offers more than
          </h1>
        </div>
        <div className="flex gap-[32px]">
          <div className="flex flex-col w-[290px] gap-2">
            <h1 className="font-bold text-4">Services</h1>
            <div className="flex flex-col text-[#CFCFCF] text-[14px] gap-[12px]">
              <Link className="hover:text-white" href={'/'}>Bonus program</Link>
              <Link className="hover:text-white" href={'/'}>Gift cards</Link>
              <Link className="hover:text-white" href={'/'}>Credit and payment</Link>
              <Link className="hover:text-white" href={'/'}>Service contracts</Link>
              <Link className="hover:text-white" href={'/'}>Non-cash account</Link>
              <Link className="hover:text-white" href={'/'}>Payment</Link>
            </div>
          </div>
          <div className="flex flex-col w-[290px] gap-2">
            <h1 className="font-bold text-4">Assistance to the buyer</h1>
            <div className="flex flex-col text-[#CFCFCF] text-[14px] gap-[12px]">
              <Link className="hover:text-white" href={'/'}>Find an order</Link>
              <Link className="hover:text-white" href={'/'}>Terms of delivery</Link>
              <Link className="hover:text-white" href={'/'}>Exchange and return of goods</Link>
              <Link className="hover:text-white" href={'/'}>Guarantee</Link>
              <Link className="hover:text-white" href={'/'}>Frequently asked questions</Link>
              <Link className="hover:text-white" href={'/'}>Terms of use of the site</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-9">
        <Link href={"https://twitter.com"}>
          <Image src={Twitter} alt="twitter" height={25} width={25} />
        </Link>
        <Link href={"https://facebook.com"}>
          <Image src={Facebook} alt="facebook" height={25} width={25} />
        </Link>
        <Link href={"https://tiktok.com"}>
          <Image src={TikTok} alt="tiktok" height={20} width={20} />
        </Link>
        <Link href={"https://instagram.com"}>
          <Image src={Instagram} alt="insta" height={20} width={20} />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
