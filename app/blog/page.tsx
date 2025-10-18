"use client";

import Image from "next/image";

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "Mexanika jihozlarini to‘g‘ri tanlash bo‘yicha maslahatlar",
      excerpt:
        "Bozorimizdagi eng sifatli mexanika jihozlarini qanday tanlash mumkin? Biz sizga foydali maslahatlar tayyorladik.",
      image:
        "https://integrouz.uz/wp-content/uploads/2022/08/img_8291.jpg",
    },
    {
      id: 2,
      title: "Ishlab chiqarishda xavfsizlik qoidalari",
      excerpt:
        "Mexanika jihozlaridan foydalanishda xavfsizlik — birinchi o‘rinda. Bu maqolada asosiy qoida va maslahatlar bilan tanishing.",
      image:
        "https://yuz.uz/imageproxy/1200x/https://yuz.uz/file/news/c2ba6eed790541cfc3c0d3eccd9c04c3.JPG",
    },
    {
      id: 3,
      title: "Mexanika Market yangiliklari",
      excerpt:
        "Yangi kelgan mahsulotlar va aksiyalar haqida birinchi bo‘lib xabardor bo‘ling!",
      image:
        "https://www.gazeta.uz/media/img/2022/08/RtINHl16615992834342_b.jpg",
    },
  ];

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Bizning Blog
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <Image
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {post.title}
                </h3>
                <p className="text-gray-600 mt-3">{post.excerpt}</p>
                <button className="mt-4 inline-block text-blue-600 font-medium hover:underline">
                  Batafsil o‘qish →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
