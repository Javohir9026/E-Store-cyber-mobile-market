"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function RejectedPage() {
  const params = useSearchParams();
  const router = useRouter();

  const txn = params.get("txn") ?? `TXN${Math.floor(Math.random() * 10000000)}`;
  const name = params.get("name") ?? "Customer";
  const email = params.get("email") ?? "customer@example.com";
  const amount = params.get("amount") ?? "0.00";
  const currency = params.get("currency") ?? "USD";
  const reason = params.get("reason") ?? "Payment could not be processed";
  const dateStr = new Date().toLocaleString();

  useEffect(() => {
    const el = document.getElementById("rejected-main");
    if (el) el.focus();
  }, []);

  const handleRetry = () => {
    router.push(`/checkout?txn=${encodeURIComponent(txn)}&amount=${encodeURIComponent(amount)}`);
  };

  const handleContact = () => {
    const subject = encodeURIComponent(`Problem with payment ${txn}`);
    const body = encodeURIComponent(`Hello,\n\nI had an issue with my payment.\n\nTransaction ID: ${txn}\nName: ${name}\nEmail: ${email}\nAmount: ${currency} ${amount}\nReason: ${reason}\n\nPlease help.\n`);
    window.location.href = `mailto:support@example.com?subject=${subject}&body=${body}`;
  };

  const handlePrint = () => {
    window.print();
  };

  const copyTxn = async () => {
    try {
      await navigator.clipboard?.writeText(txn);
      alert("Transaction ID copied to clipboard");
    } catch {
      alert("Unable to copy. Please copy manually.");
    }
  };

  return (
    <main
      id="rejected-main"
      tabIndex={-1}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6"
    >
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-rose-500 p-8 text-white flex items-center gap-6">
            <div className="flex-shrink-0">
              <div className="h-24 w-24 rounded-full bg-white/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-semibold">Payment Failed</h1>
              <p className="mt-1 text-white/90">Sorry, <span className="font-medium">{name}</span> — we couldn't process your payment.</p>
              <p className="mt-2 text-sm text-white/80">Transaction ID: <span className="font-mono bg-white/10 px-2 py-1 rounded">{txn}</span></p>
            </div>

            <div className="ml-auto text-right">
              <div className="text-sm text-white/90">Attempted</div>
              <div className="text-2xl font-bold">{currency} {Number(amount).toFixed(2)}</div>
              <div className="mt-1 text-xs text-white/90">{dateStr}</div>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <section className="md:col-span-2">
              <div className="border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-rose-700">Payment not completed</h2>
                    <p className="text-sm text-gray-500 mt-1">We couldn't complete your transaction. You can retry or contact support for help.</p>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-gray-400">Status</div>
                    <div className="mt-1 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Failed
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500">Transaction</div>
                    <div className="mt-2 font-mono">{txn}</div>

                    <div className="mt-4 text-xs text-gray-500">Payer</div>
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
                  <h3 className="text-sm font-medium text-gray-700">Failure reason</h3>
                  <div className="mt-3 p-4 bg-rose-50 border border-rose-100 rounded">
                    <p className="text-sm text-rose-700">{reason}</p>
                    <p className="mt-2 text-xs text-gray-500">If this message is unclear, contact support for details.</p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-500">
                You can retry the payment or contact support at <a className="text-rose-600 underline" href="mailto:support@example.com">support@example.com</a>.
              </p>
            </section>

            <aside className="md:col-span-1">
              <div className="border rounded-xl p-6 sticky top-8 bg-white">
                <div className="text-sm text-gray-500">Next steps</div>

                <div className="mt-4 flex flex-col gap-3">
                  <button
                    onClick={handleRetry}
                    className="w-full px-4 py-3 rounded-lg bg-rose-600 text-white font-medium hover:bg-rose-700 transition"
                  >
                    Retry payment
                  </button>

                  <button
                    onClick={handleContact}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
                  >
                    Contact support
                  </button>

                  <button
                    onClick={handlePrint}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
                  >
                    Save / Print details
                  </button>

                  <button
                    onClick={copyTxn}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
                  >
                    Copy Transaction ID
                  </button>
                </div>

                <div className="mt-6">
                  <div className="text-xs text-gray-400">Transaction</div>
                  <div className="mt-1 font-mono text-sm">{txn}</div>

                  <div className="text-xs text-gray-400 mt-4">Attempted on</div>
                  <div className="mt-1 text-sm">{dateStr}</div>
                </div>

                <div className="mt-6 text-xs text-gray-400">
                  <strong>Business:</strong> Example Inc.<br />
                  <strong>Support:</strong> support@example.com
                </div>
              </div>
            </aside>
          </div>

          <div className="bg-white/50 p-4 text-center text-xs text-gray-500">
            <span>Transaction {txn} • {reason}</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #rejected-main, #rejected-main * {
            visibility: visible;
          }
          #rejected-main {
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
