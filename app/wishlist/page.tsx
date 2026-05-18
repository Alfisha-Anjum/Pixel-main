"use client";

import { ArrowLeft, Heart, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function WishlistPage() {
  const router = useRouter();

  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://taskpro.itmingo.com/api/customers/wish-lists",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setWishlist(response.data?.data || []);
    } catch (error) {
      console.log("Wishlist Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className=" max-w-7xl mx-auto">
      <div className="relative flex items-center justify-center sm:mb-10">
        <button onClick={() => router.back()} className="absolute left-0">
          <ArrowLeft className="w-7 h-7" />
        </button>
        <h1 className="text-2xl font-bold">Wishlist</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-5">
        {wishlist.map((item) => (
          <div
            key={item.title || item.name}
            className="relative bg-white rounded-2xl shadow-md p-5 overflow-hidden"
          >
            <div className="absolute right-0 top-0 bg-orange-500 text-white text-sm font-bold px-5 py-2 rounded-bl-2xl hidden">
              {item.offer || "15% OFF"}
            </div>
            <div className="flex justify-between items-center mb-4 w-full">
              <span className="text-sm inline-block bg-orange-50 text-orange-500 font-bold px-3 py-2 rounded-lg">
                {item.badge || "30 Days Warranty"}
              </span>
              <Heart className=" w-7 h-7 fill-red-500 text-red-500 text-right" />
            </div>
            <div className="flex gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 rounded-xl object-cover bg-gray-100"
              />

              <div className="flex-1">
                <h2 className="text-sm font-bold text-black">{item.title}</h2>

                <div className="flex text-xs items-center gap-1 text-gray-500 mt-1">
                  <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                  <span>{item.rating || "4.8"}</span>
                  <span>({item.reviews || "3,287"} reviews)</span>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-base font-bold">
                    ₹{item.price || item.sale_price}
                  </span>
                  <span className="line-through text-gray-400">
                    ₹{item.oldPrice || item.original_price}
                  </span>
                  <span className="text-gray-500 text-sm">• {item.time}</span>
                </div>
              </div>
            </div>

            <ul className="text-gray-500 mt-4 space-y-1">
              {(item.points || item.features || []).map(
                (point: any, idx: number) => (
                  <li key={idx}>• {point}</li>
                ),
              )}
            </ul>

            <div className="flex items-center justify-between mt-4">
              <button className="text-blue-500 text-sm">
                More Details
              </button>

              <button className="border border-orange-500 text-orange-500 rounded-full px-5 py-1 font-bold">
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
