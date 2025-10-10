"use client";

export default function ContactUs() {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Biz bilan bog‘laning
        </h2>
        <p className="text-gray-600 mb-10">
          Agar savollaringiz bo‘lsa yoki hamkorlik qilishni istasangiz, biz bilan bog‘lanishingiz mumkin.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-800">Telefon</h3>
            <p className="text-gray-600 mt-2">+998 (90) 123-45-67</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-800">Email</h3>
            <p className="text-gray-600 mt-2">javohiramanbayev84@gmail.com</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-800">Manzil</h3>
            <p className="text-gray-600 mt-2">Xorazm, Urganch, Najot Ta'lim</p>
          </div>
        </div>

        <form className="mt-12 bg-white shadow-md p-8 rounded-xl max-w-2xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Ismingiz"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email manzilingiz"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <textarea
            placeholder="Xabaringiz"
            className="w-full mt-6 border rounded-lg px-4 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            type="submit"
            className="mt-6 w-full bg-white text-black border font-semibold py-3 rounded-lg hover:bg-black hover:text-white transition"
          >
            Xabar yuborish
          </button>
        </form>
      </div>
    </section>
  );
}
