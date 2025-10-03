"use client";

export default function AboutUs() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          About Us
        </h1>
        <p className="text-gray-600 mb-10">
          Mexanika Market — sanoat va maishiy mexanika mahsulotlari uchun ishonchli hamkor. 
          Bizning maqsadimiz mijozlarga sifatli va zamonaviy asbob-uskunalarni taqdim etish 
          orqali ularning ish jarayonlarini yengillashtirishdir.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h3>
            <p className="text-gray-600 text-sm">
              Sifatli mahsulotlarni adolatli narxlarda taqdim etib, mexanika sohasini 
              yangi bosqichga olib chiqish.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Values</h3>
            <p className="text-gray-600 text-sm">
              Halollik, ishonch va mijozlarga gamxorlik — bizning asosiy qadriyatlarimiz.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Vision</h3>
            <p className="text-gray-600 text-sm">
              Mexanika bozorida yetakchi kompaniya sifatida rivojlanib, mijozlarimizning 
              birinchi tanloviga aylanish.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
