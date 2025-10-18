"use client";

import { AlertDialog } from "../../components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import { Label } from "../../components/ui/label";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import CardImage from "../../assets/image/card.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { RadioGroupItem, RadioGroup } from "../../components/ui/radio-group";
import {
  ChevronDownIcon,
  HandCoins,
  MapPin,
  Pen,
  Plus,
  Truck,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "../../components/ui/scroll-area";
import Image from "next/image";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../components/ui/input-otp";
import { useRouter } from "next/navigation";
import { getFromLocalStorage } from "utils/LocalStorage";

interface CartItem {
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

const Page = () => {
  const [step, setStep] = useState<"step1" | "step2" | "step3">("step1");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleConfirm = () => {
    if (otp.length < 6) {
      setError("Please enter the full 6‑digit code.");
      return;
    }

    if (otp === "123456") {
      router.push("/status/success");
    } else {
      router.push("/status/rejected");
    }
  };

  const PaymentMethods = [
    { id: 1, title: "Credit Card", type: "credit_card", isDefault: true },
    { id: 2, title: "PayPal", type: "paypal", isDefault: false },
    { id: 3, title: "PayPal Credit", type: "paypal_credit", isDefault: false },
  ];
  const defaultPaymentMethod = PaymentMethods.find((a) => a.isDefault)?.type || "";
  const [selectedPMethod, setSelectedPMethod] = useState<string>(defaultPaymentMethod);

  const shippingOptionsMock = [
    {
      id: "1",
      name: "Free",
      description: "Regular shipment",
      price: 0,
      isSchedule: false,
      estimatedDate: "2023-10-17",
      isDefault: true,
    },
    {
      id: "2",
      name: "$8.50",
      description: "Get your delivery as soon as possible",
      price: 8.5,
      isSchedule: false,
      estimatedDate: "2023-10-01",
      isDefault: false,
    },
    {
      id: "3",
      name: "Schedule",
      description: "Pick a date when you want to get your delivery",
      price: 0,
      isSchedule: true,
      estimatedDate: null,
      isDefault: false,
    },
  ];

  // Address mock
  const address = [
    {
      id: 1,
      title: "Home",
      type: "Home",
      address: "Tashkent, Chilonzor, 5",
      phone: "+998 90 123 45 67",
      isDefault: true,
    },
    {
      id: 2,
      title: "Office",
      type: "Office",
      address: "Tashkent, Yunusobod, 10",
      phone: "+998 90 987 65 43",
      isDefault: false,
    },
  ];

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const defaultAddress = address.find((a) => a.isDefault)?.id.toString() || "1";
  const defaultShippingMethod = shippingOptionsMock.find((a) => a.isDefault)?.id || "1";

  const [selectedAddress, setSelectedAddress] = useState<number>(parseInt(defaultAddress, 10));
  const [selectedShip, setSelectedShip] = useState<number>(parseInt(defaultShippingMethod, 10));

  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 16);
    const formatted = value.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(formatted);
  };

  const handleExpDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 3) value = value.slice(0, 4);
    if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    setExpDate(value);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 4);
    setCvv(value);
  };

  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    const stored = getFromLocalStorage("cart");
    if (stored && Array.isArray(stored)) {
      setItems(stored as CartItem[]);
    }
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container">
      <div className="flex justify-between px-[160px] py-[72px]">
        {/* Step indicators */}
        <div className={step === "step1" ? "flex items-center gap-1" : "flex items-center gap-1 opacity-40"}>
          <div className="w-[30px] h-[30px] rounded-full bg-black flex items-center justify-center">
            <MapPin className="stroke-white" />
          </div>
          <div className="font-semibold">
            <h1 className="text-[14px]">Step 1</h1>
            <h1 className="text-[19px]">Address</h1>
          </div>
        </div>
        <div className={step === "step2" ? "flex items-center gap-1" : "flex items-center gap-1 opacity-40"}>
          <div className="w-[30px] h-[30px] rounded-full bg-black flex items-center justify-center">
            <Truck className="stroke-white" />
          </div>
          <div className="font-semibold">
            <h1 className="text-[14px]">Step 2</h1>
            <h1 className="text-[19px]">Shipping</h1>
          </div>
        </div>
        <div className={step === "step3" ? "flex items-center gap-1" : "flex items-center gap-1 opacity-40"}>
          <div className="w-[30px] h-[30px] rounded-full bg-black flex items-center justify-center">
            <HandCoins className="stroke-white" />
          </div>
          <div className="font-semibold">
            <h1 className="text-[14px]">Step 3</h1>
            <h1 className="text-[19px]">Payment</h1>
          </div>
        </div>
      </div>

      <div className="flex py-[48px] px-[160px]">
        {step === "step1" && (
          <div className="w-full flex flex-col gap-[20px]">
            <h1 className="font-bold text-[24px] mb-6">Select Address</h1>

            <RadioGroup
              defaultValue={defaultAddress}
              className="flex flex-col gap-[24px] w-full"
              onValueChange={(val) => {
                const parsed = parseInt(val, 10);
                if (!isNaN(parsed)) {
                  setSelectedAddress(parsed);
                }
              }}
            >
              {address.map((adr) => (
                <div
                  key={adr.id}
                  className="bg-[#F6F6F6] w-full p-[24px] flex items-start gap-2 rounded-[7px]"
                >
                  <RadioGroupItem value={adr.id.toString()} id={`option-${adr.id}`} />
                  <Label
                    htmlFor={`option-${adr.id}`}
                    className="flex justify-between items-center w-full cursor-pointer"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-[12px] items-center">
                        <h1 className="text-[18px] font-semibold">{adr.title}</h1>
                        <div className="px-2 py-[2px] bg-black text-white rounded-md text-[12px] uppercase">
                          {adr.type}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 text-gray-600">
                        <span>{adr.address}</span>
                        <span>{adr.phone}</span>
                      </div>
                    </div>
                    <div className="flex gap-[16px]">
                      <Pen width={20} height={20} className="cursor-pointer" />
                      <X width={20} height={20} className="cursor-pointer" />
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {address.length < 3 && (
              <div className="flex justify-center">
                <AlertDialog>
                  <AlertDialogTrigger className="flex items-center justify-center flex-col">
                    <div className="flex w-[30px] h-[30px] bg-black rounded-full items-center justify-center">
                      <Plus width={24} height={24} className="stroke-white" />
                    </div>
                    <h1 className="text-[14px]">Add New Address</h1>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Enter Your New Address</AlertDialogTitle>
                      <AlertDialogDescription>
                        <form action="submit" className="flex flex-col gap-4">
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="title">Address title</Label>
                            <input
                              placeholder="Enter Address title"
                              className="px-2 py-2 w-full focus:outline-none border rounded-md border-black text-black"
                              id="title"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="type">Address Type</Label>
                            <input
                              placeholder="Enter Address Type (Home, Office)"
                              className="px-2 py-2 w-full focus:outline-none border rounded-md border-black text-black"
                              id="type"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="adres">Full Address</Label>
                            <input
                              placeholder="Enter Full Address (Address, home, HomeNumber)"
                              className="px-2 py-2 w-full focus:outline-none border rounded-md border-black text-black"
                              id="adres"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="num">Phone Number</Label>
                            <input
                              type="tel"
                              placeholder="Enter Phone Number (+998 97 123 45 66)"
                              pattern="^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$"
                              className="px-2 py-2 w-full focus:outline-none border rounded-md border-black text-black"
                              id="num"
                            />
                          </div>
                        </form>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction type="submit">Add</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
        )}

        {step === "step2" && (
          <div className="w-full flex flex-col gap-6">
            <h1 className="font-bold text-[20px] mb-4">Shipment Method</h1>

            <RadioGroup
              defaultValue={defaultShippingMethod}
              className="flex flex-col gap-[16px] text-[16px]"
              onValueChange={(val) => {
                const parsed = parseInt(val, 10);
                if (!isNaN(parsed)) {
                  setSelectedShip(parsed);
                }
              }}
            >
              {shippingOptionsMock.map((ship) => (
                <div
                  key={ship.id}
                  className="border rounded-md p-[24px] flex justify-between items-center text-[16px]"
                >
                  <div className="flex items-center gap-4">
                    <RadioGroupItem value={ship.id} id={`ship-${ship.id}`} />
                    <Label htmlFor={`ship-${ship.id}`} className="flex flex-col gap-2 cursor-pointer">
                      <div className="flex gap-3 items-center text-[16px]">
                        <h1 className="font-semibold">{ship.name}</h1>
                        <span className="text-gray-500">{ship.description}</span>
                      </div>
                    </Label>
                  </div>

                  {ship.isSchedule ? (
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="date"
                          className="w-[140px] border-none gap-1 shadow-none justify-between font-normal"
                        >
                          {date ? date.toLocaleDateString() : "Select Date"}
                          <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          captionLayout="dropdown"
                          onSelect={(d) => {
                            setDate(d);
                            setOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <h1 className="text-gray-500">{ship.estimatedDate}</h1>
                  )}
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {step === "step3" && (
          <div className="flex justify-between w-full">
            <div className="border flex flex-col px-[24px] py-[32px] rounded-md gap-6">
              <h1 className="text-[24px] font-bold mb-4">Summary</h1>

              <ScrollArea className="h-[300px] rounded-md w-[464px]">
                <div className="p-4 flex flex-col gap-5">
                  {items.map((tag, i) => (
                    <React.Fragment key={i}>
                      <div className="flex justify-between items-center bg-[#F6F6F6] p-4 rounded-md h-[72px]">
                        <div className="flex items-center gap-4">
                          <div className="w-[40px] h-[50px] flex-shrink-0">
                            <Image
                              src={tag.thumbnail}
                              alt={tag.title}
                              width={30}
                              height={30}
                              className="object-cover w-full h-full"
                            />
                          </div>

                          <h1 className="text-[14px] font-medium max-w-[220px]">
                            {tag.title} {`(${tag.quantity})`}
                          </h1>
                        </div>
                        <h1 className="font-bold">${tag.price}</h1>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex flex-col gap-3">
                <div className="text-semibold flex flex-col gap-2">
                  <h1 className="text-[14px] text-[#545454] font-semibold">Address</h1>
                  <h1 className="text-[16px] font-semibold">
                    {address[selectedAddress - 1]?.address}
                  </h1>
                </div>
                <div className="text-semibold flex flex-col gap-2">
                  <h1 className="text-[14px] text-[#545454] font-semibold">Shipment Method</h1>
                  <h1 className="text-[16px] font-semibold">
                    {shippingOptionsMock[selectedShip - 1]?.name}
                  </h1>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex justify-between font-semibold">
                  <h1 className="text-[16px]">Subtotal</h1>
                  <h1>${total.toFixed(2)}</h1>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between font-semibold">
                    <h1 className="text-[#545454]">Estimated Tax</h1>
                    <h1>$50.00</h1>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <h1 className="text-[#545454]">Estimated shipping & Handling</h1>
                    <h1>$29.00</h1>
                  </div>
                </div>

                <div className="flex justify-between">
                  <h1 className="font-semibold">Total</h1>
                  <h1 className="font-bold">${(total + 79).toFixed(2)}</h1>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[40px] w-[500px]">
              <div className="flex flex-col gap-[24px]">
                <h1 className="text-[20px] font-bold">Payment</h1>
                <div className="flex gap-[56px] text-[14px] font-semibold">
                  {PaymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPMethod(method.type)}
                      className={
                        selectedPMethod === method.type ? "border-b-2 border-black" : "border-b-2 border-white"
                      }
                    >
                      {method.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-[40px]">
                <Image
                  src={CardImage}
                  alt="card"
                  width={320}
                  height={160}
                  className="object-contain"
                />

                <div className="w-full flex flex-col gap-[16px] font-semibold">
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    className="border focus:outline-none w-full p-4 text-[14px] rounded-md"
                  />

                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="Card Number (xxxx xxxx xxxx xxxx)"
                    className="border focus:outline-none w-full p-4 text-[14px] rounded-md"
                  />

                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={expDate}
                      onChange={handleExpDateChange}
                      placeholder="Exp. Date (MM/YY)"
                      className="border focus:outline-none w-full p-4 text-[14px] rounded-md"
                    />
                    <input
                      type="text"
                      value={cvv}
                      onChange={handleCvvChange}
                      placeholder="CVV"
                      className="border focus:outline-none w-full p-4 text-[14px] rounded-md"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[15px]">
                  <Checkbox id="checkbx" />
                  <label htmlFor="checkbx" className="font-semibold">
                    Same as billing address
                  </label>
                </div>
                <div className="flex justify-between">
                  <button
                    className="px-[104px] py-[24px] border rounded-md border-black cursor-pointer"
                    onClick={() => setStep("step2")}
                  >
                    Back
                  </button>
                  <Dialog>
                    <DialogTrigger className="px-[104px] py-[24px] border rounded-md border-black bg-black text-white cursor-pointer">
                      Pay
                    </DialogTrigger>

                    <DialogContent className="flex flex-col items-center justify-center space-y-6">
                      <DialogHeader>
                        <DialogTitle className="text-center text-[20px] font-semibold">Enter SMS Code</DialogTitle>
                      </DialogHeader>

                      <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={(value) => {
                          setOtp(value);
                          setError("");
                        }}
                        className="w-full text-[20px]"
                      >
                        <InputOTPGroup>
                          <InputOTPSlot className="w-[60px] h-[60px] text-[20px] font-bold" index={0} />
                          <InputOTPSlot className="w-[60px] h-[60px] text-[20px] font-bold" index={1} />
                          <InputOTPSlot className="w-[60px] h-[60px] text-[20px] font-bold" index={2} />
                        </InputOTPGroup>

                        <InputOTPSeparator />

                        <InputOTPGroup>
                          <InputOTPSlot className="w-[60px] h-[60px] text-[20px] font-bold" index={3} />
                          <InputOTPSlot className="w-[60px] h-[60px] text-[20px] font-bold" index={4} />
                          <InputOTPSlot className="w-[60px] h-[60px] text-[20px] font-bold" index={5} />
                        </InputOTPGroup>
                      </InputOTP>

                      {error && <p className="text-red-500 text-sm">{error}</p>}

                      <div className="flex justify-end items-center gap-[24px]">
                        <button
                          className="px-[30px] py-[10px] border rounded-md bg-red-500 text-white cursor-pointer"
                          onClick={() => {
                            setOtp("");
                            setError("");
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleConfirm}
                          className="px-[30px] py-[10px] border rounded-md text-white bg-green-500 cursor-pointer"
                        >
                          Confirm
                        </button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {step !== "step3" && (
        <div className="flex justify-end items-center py-[48px] px-[160px] gap-[24px]">
          <button
            className="px-[86px] py-[24px] border rounded-md border-black cursor-pointer"
            onClick={() => {
              if (step === "step1") setStep("step1");
              else if (step === "step2") setStep("step1");
              else if (step === "step3") setStep("step2");
            }}
          >
            Back
          </button>
          <button
            className="px-[86px] py-[24px] border rounded-md border-black bg-black text-white cursor-pointer"
            onClick={() => {
              if (step === "step1") setStep("step2");
              else if (step === "step2") setStep("step3");
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
