"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ChevronDown } from "lucide-react";

const RateCardPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service_id");

  const [rateData, setRateData] = useState<any[]>([]);

  useEffect(() => {
    const fetchRateCard = async () => {
      try {
        const res = await fetch(
          `https://taskpro.itmingo.com/api/service-details?service_id=${serviceId}&state_name=Chhattisgarh&city_name=Raipur`,
          { headers: { accept: "application/json" } },
        );

        const data = await res.json();
        setRateData(data?.data?.subServices || []);
      } catch (error) {
        console.log("RATE CARD ERROR:", error);
      }
    };

    if (serviceId) fetchRateCard();
  }, [serviceId]);

  const rateCart = rateData.flatMap((item) => item.rate_cart || []);
  const spareParts = rateData.flatMap((item) => item.spare_parts || []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto sm:px-4">
        <div className="flex items-center justify-center relative mb-5">
          <button onClick={() => router.back()} className="absolute left-0">
            <ArrowLeft size={24} />
          </button>

          <h1 className="text-lg sm:text-2xl font-semibold">Rate Card</h1>
        </div>

        {/* Electrical Parts */}
        <div className="border rounded-2xl overflow-hidden mb-8">
          <div className="bg-black text-white px-5 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Electrical Parts</h2>
            <ChevronDown className="rotate-180" />
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-4">Description</th>
                <th className="text-left px-4 py-4">Service Charge</th>
                <th className="text-left px-4 py-4">Labour</th>
              </tr>
            </thead>
            <tbody>
              {rateCart.map((item: any, index: number) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-5">{item.description}</td>

                  <td className="px-4 py-5">
                    <p className="text-gray-400 line-through">
                      {item.originalService}
                    </p>
                    <p>{item.service}</p>
                  </td>

                  <td className="px-4 py-5">
                    <p className="text-gray-400 line-through">
                      {item.originalLabour}
                    </p>
                    <p>{item.labour}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Spare Parts */}
        <div className="border rounded-2xl overflow-hidden">
          <div className="bg-black text-white px-5 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Spare Parts</h2>
            <ChevronDown className="rotate-180" />
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-4">Part Name</th>
                <th className="text-left px-4 py-4">Price</th>
                <th className="text-left px-4 py-4">Warranty</th>
              </tr>
            </thead>

            <tbody>
              {spareParts.map((item: any, index: number) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-5">{item.description}</td>

                  <td className="px-4 py-5">
                    <p className="text-gray-400 line-through">
                      {item.originalPrice}
                    </p>
                    <p>{item.price}</p>
                  </td>

                  <td className="px-4 py-5">{item.warranty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RateCardPage;
