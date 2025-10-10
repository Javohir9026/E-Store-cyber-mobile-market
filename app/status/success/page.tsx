"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ThanksPage() {
  const params = useSearchParams();
  const txn = params.get("txn") ?? `TXN${Math.floor(Math.random() * 10000000)}`;
  const name = params.get("name") ?? "Customer";
  const email = params.get("email") ?? "customer@example.com";
  const amount = params.get("amount") ?? "99.99";
  const currency = params.get("currency") ?? "USD";
  const dateStr = new Date().toLocaleString();

  useEffect(() => {
    const el = document.getElementById("thanks-main");
    if (el) el.focus();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <main
      id="thanks-main"
      tabIndex={-1}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6"
    >
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-8 text-white flex items-center gap-6">
            <div className="flex-shrink-0">
              <div className="h-24 w-24 rounded-full bg-white/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-semibold">Payment Received</h1>
              <p className="mt-1 text-white/90">Thank you, <span className="font-medium">{name}</span> — your payment was successful.</p>
              <p className="mt-2 text-sm text-white/80">Transaction ID: <span className="font-mono bg-white/10 px-2 py-1 rounded">{txn}</span></p>
            </div>

            <div className="ml-auto text-right">
              <div className="text-sm text-white/90">Paid</div>
              <div className="text-2xl font-bold">{currency} {Number(amount).toFixed(2)}</div>
              <div className="mt-1 text-xs text-white/90">{dateStr}</div>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <section className="md:col-span-2">
              <div className="border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">Receipt</h2>
                    <p className="text-sm text-gray-500 mt-1">A confirmation has been sent to <span className="font-medium">{email}</span>.</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Status</div>
                    <div className="mt-1 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Completed
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500">Transaction</div>
                    <div className="mt-2 font-mono">{txn}</div>

                    <div className="mt-4 text-xs text-gray-500">Paid by</div>
                    <div className="mt-2">{name}</div>
                    <div className="text-sm text-gray-400">{email}</div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500">Method</div>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="h-8 w-12 rounded-md bg-white/90 flex items-center justify-center border">
                        <svg width="36" height="20" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="24" height="14" rx="2" fill="#111827" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">Credit / Debit Card</div>
                        <div className="text-xs text-gray-500">•••• •••• •••• 3456</div>
                      </div>
                    </div>

                    <div className="mt-4 text-xs text-gray-500">Amount</div>
                    <div className="mt-2 text-lg font-semibold">{currency} {Number(amount).toFixed(2)}</div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700">Order summary</h3>
                  <ul className="mt-3 divide-y">
                    <li className="py-3 flex items-center justify-between">
                      <div>
                        <div className="font-medium">Premium Subscription</div>
                        <div className="text-xs text-gray-400">1 × 12 months</div>
                      </div>
                      <div className="font-medium">{currency} {Number(amount).toFixed(2)}</div>
                    </li>
                    <li className="py-3 flex items-center justify-between">
                      <div>
                        <div className="font-medium">Taxes</div>
                        <div className="text-xs text-gray-400">VAT included</div>
                      </div>
                      <div className="font-medium">{currency} 0.00</div>
                    </li>
                  </ul>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-gray-500">Total</div>
                    <div className="text-xl font-bold">{currency} {Number(amount).toFixed(2)}</div>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-500">
                This receipt confirms that we received your payment. If you have any questions, contact support at <a className="text-emerald-600 underline" href="mailto:support@example.com">support@example.com</a>.
              </p>
            </section>

            <aside className="md:col-span-1">
              <div className="border rounded-xl p-6 sticky top-8 bg-white">
                <div className="text-sm text-gray-500">Need a copy?</div>

                <div className="mt-4 flex flex-col gap-3">
                  <button
                    onClick={handlePrint}
                    className="w-full px-4 py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
                  >
                    Print / Save as PDF
                  </button>

                  <a
                    href={`mailto:${email}?subject=Receipt%20${txn}&body=Thank%20you%20for%20your%20payment%20(${txn}).%0AAmount:%20${currency}%20${Number(amount).toFixed(2)}`}
                    className="block text-center px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
                  >
                    Send receipt by email
                  </a>

                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(txn);
                      alert("Transaction ID copied to clipboard");
                    }}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
                  >
                    Copy Transaction ID
                  </button>
                </div>

                <div className="mt-6">
                  <div className="text-xs text-gray-400">Receipt ID</div>
                  <div className="mt-1 font-mono text-sm">{txn}</div>

                  <div className="text-xs text-gray-400 mt-4">Date</div>
                  <div className="mt-1 text-sm">{dateStr}</div>
                </div>

                <div className="mt-6 text-xs text-gray-400">
                  <strong>Business:</strong> Example Inc.<br />
                  <strong>VAT:</strong> 123456789
                </div>
              </div>
            </aside>
          </div>

          <div className="bg-white/50 p-4 text-center text-xs text-gray-500">
            <span>Receipt generated on {dateStr} • Transaction {txn}</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #thanks-main, #thanks-main * {
            visibility: visible;
          }
          #thanks-main {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0;
          }
        }
      `}</style>
    </main>
  );
}
