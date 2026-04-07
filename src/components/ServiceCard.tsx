"use client";

import * as React from "react";
import { Star } from "lucide-react";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  duration: string;
  onAdd: () => void;
}

const ServiceCard = ({
  title,
  image,
  rating,
  reviewCount,
  price,
  originalPrice,
  duration,
  onAdd,
}: ServiceCardProps) => {
  return (
    <div 
      className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      style={{
        width: "287px",
        height: "232px",
        borderRadius: "12px",
        background: "#fff",
      }}
    >
      <div 
        className="relative w-full"
        style={{
          width: "287px",
          height: "120px",
          borderRadius: "12px 12px 0 0",
        }}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          style={{
            borderRadius: "12px 12px 0 0",
          }}
        />
      </div>

      <div
        className="flex flex-col justify-between"
        style={{
          padding: "10px 12px",
          height: "calc(232px - 120px)",
        }}
      >
        <div>
          <h3
            className="text-gray-900"
            style={{
              fontSize: "13px",
              fontWeight: 600,
              lineHeight: "1.2",
              marginBottom: "6px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={title}
          >
            {title}
          </h3>

          <div className="flex items-center gap-1" style={{ marginBottom: "4px" }}>
            <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
            <span className="text-gray-700" style={{ fontSize: "12px", fontWeight: 600 }}>
              {Number(rating || 0).toFixed(1)}
            </span>
            <span className="text-gray-500" style={{ fontSize: "12px" }}>
              ({Math.round(reviewCount / 1000)}m Review)
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2" style={{ minWidth: 0 }}>
            <span className="text-gray-900" style={{ fontSize: "12px", fontWeight: 700 }}>
              ₹{price}
            </span>
            {typeof originalPrice === "number" && originalPrice > price ? (
              <span className="text-gray-400 line-through" style={{ fontSize: "11px", fontWeight: 600 }}>
                ₹{originalPrice}
              </span>
            ) : null}
            <span className="text-gray-500" style={{ fontSize: "11px" }}>
              {duration}
            </span>
          </div>

          <button
            onClick={onAdd}
            className="text-white font-semibold rounded-md hover:opacity-95 transition-opacity"
            style={{
              background: "#FF6A00",
              padding: "7px 14px",
              fontSize: "12px",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;