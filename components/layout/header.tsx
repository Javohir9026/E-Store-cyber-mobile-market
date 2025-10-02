import { Heart, Search, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from '@/assets/icon/Logo (1).svg'
const Header = () => {

  const actions = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About",
      link: "/about-us",
    },
    {
      title: "Contact Us",
      link: "/contact",
    },
    {
      title: "Blog",
      link: "/blog",
    },
  ];

  const actionIcon = [
    {
        icon: <Heart/>,
        href: '/fovorites'
    },
    {
        icon: <ShoppingCart/>,
        href: '/cart'
    },
    {
        icon: <User/>,
        href: '/profile'
    }
  ]

  return (
    <div className="border py-[32px] px-[160px] flex gap-[50px] justify-between items-center">
      <Link className="font-extrabold" href={"/"}>
        <Image src={logo} height={30} width={85} alt="logo"/>
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
        {actions.map((action: any) => (
          <div key={action.link} className="flex justify-between gap-5 items-center">
            <Link className="flex" href={action.link}>{action.title}</Link>
          </div>
        ))}
      </div>
      <div className="flex gap-6">
        {actionIcon.map((act2: any)=>(
            <div className="flex items-center justify-between" key={act2.href}>
                <Link href={act2.href}>{act2.icon}</Link>
            </div>
        ) )}
      </div>
    </div>
    
  );
};

export default Header;
