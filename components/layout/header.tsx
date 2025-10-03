"use client";
import { Heart, Search, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import logo from "@/assets/icon/Logo (1).svg";

const Header = () => {
  const pathname = usePathname(); 

  const actions = [
    { title: "Home", link: "/" },
    { title: "About", link: "/about" },
    { title: "Contact-Us", link: "/contact-us" },
    { title: "Blog", link: "/blog" },
  ];

  const actionIcon = [
    { icon: <Heart />, href: "/favorites" },
    { icon: <ShoppingCart />, href: "/cart" },
    { icon: <User />, href: "/profile" },
  ];

  return (
    <div className="border border-[#B5B5B5] py-[32px] px-[160px] flex gap-[50px] justify-between items-center">
      <Link href={"/"}>
        <Image src={logo} height={30} width={85} alt="logo" />
      </Link>

      <div className="flex w-[372px] h-[56px] items-center bg-[#F5F5F5] rounded-md">
        <Search
          width={24}
          height={24}
          className="ml-[16px] my-[16px] stroke-gray-400"
        />
        <input
          placeholder="search"
          className="ml-2 w-full text-[14px] h-full outline-none"
          maxLength={35}
          type="text"
        />
      </div>

      <div className="flex gap-[52px] text-[16px]">
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
        {actionIcon.map((act) => (
          <Link key={act.href} href={act.href}>
            {act.icon}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
