"use client";

import { X, Star, Plus, Minus } from "lucide-react";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  service: any;
  onAdd: () => void;
}

export default function ServiceDetailsModal({
  isOpen,
  onClose,
  service,
  onAdd,
}: Props) {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
      {/* Modal */}
      <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-orange-500 text-white rounded-full p-1 z-10"
        >
          <X size={18} />
        </button>

        {/* Top Image */}
        <div className="relative h-48 w-full">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Title + Price */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-lg">{service.title}</h2>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
                {service.rating} • {service.duration}
              </div>
            </div>

            <div className="text-right">
              <p className="font-semibold">₹{service.price}</p>
              <p className="text-xs line-through text-gray-400">
                ₹{service.originalPrice}
              </p>
            </div>
          </div>

          {/* Warranty */}
          <div className="text-green-600 text-sm font-medium">
            30 Days Warranty
          </div>

          {/* Badge */}
          <div className="border rounded-lg px-3 py-2 text-sm text-gray-600 flex justify-between">
            Standard Rate Card no hidden charges
            <span>›</span>
          </div>

          {/* How it works */}
          <div>
            <h3 className="font-semibold mb-2">How it Works?</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>Step 1: Lorem ipsum dummy text</p>
              <p>Step 2: Lorem ipsum dummy text</p>
              <p>Step 3: Lorem ipsum dummy text</p>
            </div>
          </div>

          {/* Sections */}
          <div>
            <h3 className="font-semibold mb-1">Service Inclusion</h3>
            <p className="text-sm text-gray-600">
              Lorem ipsum is dummy text used in printing industry.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Service Exclusion</h3>
            <p className="text-sm text-gray-600">
              Lorem ipsum is dummy text used in printing industry.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Important Note</h3>
            <p className="text-sm text-gray-600">
              Lorem ipsum is dummy text used in printing industry.
            </p>
          </div>

          {/* Bottom Button */}
          <button
            onClick={onAdd}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
