"use client";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Separator } from "../../components/ui/separator";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getFromLocalStorage, saveToLocalStorage } from "../../utils/LocalStorage";
import { Trash } from "lucide-react";

type CartItem = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
};

const Page = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [CardNumber, setCardNumber] = useState("");

  useEffect(() => {
    // Tip bilan aniq chaqirish:
    const stored = getFromLocalStorage<CartItem[]>("cart");
    if (stored) setItems(stored);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formatted);
  };

  const increase = (index: number) => {
    const updated = [...items];
    updated[index].quantity++;
    setItems(updated);
    saveToLocalStorage("cart", updated);
  };

  const decrease = (index: number) => {
    const updated = [...items];
    if (updated[index].quantity > 1) updated[index].quantity--;
    setItems(updated);
    saveToLocalStorage("cart", updated);
  };

  const removeItem = (id: number) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    saveToLocalStorage("cart", updated);
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container">
      <div className="flex px-[160px] py-[112px] gap-[100px]">
        <div>
          <h1 className="font-bold text-[24px] mb-4">Shopping Cart</h1>
          <ScrollArea className="h-[556px] w-[536px] rounded-md">
            <div className="p-4">
              {items.length === 0 ? (
                <p className="text-gray-500 text-center py-10">
                  Your cart is empty {"("}
                </p>
              ) : (
                items.map((tag, i) => (
                  <React.Fragment key={tag.id}>
                    <div className="flex items-center justify-between gap-4 w-[506px]">
                      <div className="w-[90px] h-[90px] flex-shrink-0">
                        <Link href={`/ProductDetails/${tag.id}`}>
                          <Image
                            src={tag.thumbnail}
                            alt={tag.title}
                            width={100}
                            height={100}
                            className="object-contain w-full h-full"
                          />
                        </Link>
                      </div>

                      <div className="flex flex-col flex-1 min-w-0">
                        <h1 className="font-bold text-[18px] truncate">
                          {tag.title}
                        </h1>
                        <h1 className="text-[14px] text-gray-500 truncate">
                          ID: #{tag.id}
                        </h1>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => decrease(i)}
                          className="px-3 py-2 border rounded-md cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-6 text-center">{tag.quantity}</span>
                        <button
                          onClick={() => increase(i)}
                          className="px-3 py-2 border rounded-md cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex flex-col items-end">
                        <div className="font-semibold text-[16px] text-right w-[70px] flex-shrink-0">
                          ${Math.floor(tag.price * tag.quantity)}
                        </div>
                        <button
                          onClick={() => removeItem(tag.id)}
                          className="text-red-500 text-[12px] mt-1 border rounded-md px-1 py-1 cursor-pointer"
                        >
                          <Trash height={15} width={15} />
                        </button>
                      </div>
                    </div>
                    <Separator className="my-3" />
                  </React.Fragment>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        <div className="border rounded-md px-[64px] py-[56px] flex flex-col gap-[40px]">
          <h1 className="text-[20px] font-bold">Order Summary</h1>
          <div className="flex flex-col gap-[24px]">
            <div>
              <form className="flex flex-col gap-[24px]">
                <div>
                  <label htmlFor="promo" className="text-[#545454] text-[14px]">
                    Discount code / Promo code
                  </label>
                  <input
                    maxLength={5}
                    type="text"
                    placeholder="Code"
                    id="promo"
                    className="border rounded-md w-[408px] p-4 placeholder:text-[#979797] text-[14px] font-bold placeholder:font-normal"
                  />
                </div>
                <div>
                  <label
                    htmlFor="card_num"
                    className="text-[#545454] text-[14px]"
                  >
                    Your bonus card number
                  </label>
                  <div className="w-[408px] border  rounded-md flex max-h-[53px] py-5 items-center">
                    <input
                      id="card_num"
                      type="text"
                      placeholder="Enter Card Number"
                      onChange={handleChange}
                      value={CardNumber}
                      className="focus:outline-none font-bold placeholder:font-normal rounded-md w-[408px] p-4 placeholder:text-[#979797] text-[14px]"
                    />
                    {CardNumber.length == 19 && (
                      <button className="p-2 rounded-md border border-black text-[12px] font-semibold mr-4">
                        Apply
                      </button>
                    )}
                  </div>
                </div>
              </form>
              {CardNumber.length == 19 && <h1>Name Surname</h1>}
            </div>

            <div className="flex flex-col gap-[20px]">
              <div className="flex justify-between text-[16px]">
                <h1 className="font-semibold">Subtotal</h1>
                <h1 className="font-semibold">${Math.floor(total)}</h1>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-[16px] flex justify-between">
                  <h1 className="text-[#545454]">Estimated Tax</h1>
                  <h1 className="font-semibold">$50</h1>
                </div>
                <div className="text-[16px] flex justify-between">
                  <h1 className="text-[#545454] ">Estimated shipping & Handling</h1>
                  <h1 className="font-semibold">$29</h1>
                </div>
              </div>
              <div className="flex justify-between text-[16px] font-semibold">
                <h1>Total</h1>
                <h1>${Math.floor(total + 50 + 29)}</h1>
              </div>
            </div>
          </div>
          <Link
            href={"/checkout"}
            className="text-center justify-center border-black border-2 w-full py-4 bg-black text-white rounded-md cursor-pointer hover:bg-white hover:text-black hover:border-2 hover:border-black"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
