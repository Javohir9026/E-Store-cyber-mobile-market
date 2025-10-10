"use client";
import { Heart, Search, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/icon/Logo (1).svg";
import { useEffect, useState } from "react";
import { getFromLocalStorage } from "@/utils/LocalStorage";
import SearchModal from "../SearchModal";

const Header = () => {
  const pathname = usePathname();
  const [favlengt, setFavLength] = useState(0);
  const actions = [
    { title: "Home", link: "/" },
    { title: "About", link: "/about" },
    { title: "Contact-Us", link: "/contact-us" },
    { title: "Blog", link: "/blog" },
  ];

  useEffect(() => {
    const fav = getFromLocalStorage("favorites");
    if (fav && Array.isArray(fav)) {
      setFavLength(fav.length);
    }
  }, []);

  return (
    <div className="border border-[#B5B5B5] py-[32px] px-[160px] flex gap-[50px] justify-between items-center">
      <Link href={"/"}>
        <Image
          src={logo}
          height={30}
          width={85}
          alt="logo"
          className="object-contain"
        />
      </Link>

      <SearchModal/>

      <div className="flex  text-[16px] lg:gap-[42px] md:gap-3">
        {actions.map((action) => {
          const isActive = pathname === action.link;
          return (
            <Link
              key={action.link}
              href={action.link}
              className={`flex items-center ${
                isActive
                  ? "font-semibold border-b-2 border-black text-black"
                  : "opacity-50 hover:opacity-100"
              }`}
            >
              {action.title}
            </Link>
          );
        })}
      </div>

      <div className="flex gap-6">
        <div className="relative">
          <Link href="/favorites">
            <Heart />
            {favlengt > 0 && (
              <span
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
                   w-5 h-5 rounded-full flex items-center justify-center"
              >
                {favlengt}
              </span>
            )}
          </Link>
        </div>

        <Link href={"/cart"}>
          <ShoppingCart />
        </Link>
        <Link href={"/myAccount"}>
          <User />
        </Link>
      </div>
    </div>
  );
};

export default Header;
