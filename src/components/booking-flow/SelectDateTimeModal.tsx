// "use client";

// import { X } from "lucide-react";
// import { useState } from "react";

// interface SelectDateTimeModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onContinue: (date: string, time: string, notes: string) => void;
// }

// const timeSlots = [
//   "9:00 AM - 12:00 PM",
//   "12:00 PM - 3:00 PM",
//   "3:00 PM - 6:00 PM",
//   "6:00 PM - 9:00 PM",
// ];

// export const SelectDateTimeModal: React.FC<SelectDateTimeModalProps> = ({
//   isOpen,
//   onClose,
//   onContinue,
// }) => {
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedTime, setSelectedTime] = useState("");
//   const [notes, setNotes] = useState("");

//   if (!isOpen) return null;

//   const handleContinue = () => {
//     if (selectedDate && selectedTime) {
//       onContinue(selectedDate, selectedTime, notes);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-[28px] w-full max-w-md p-6 relative">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute -top-3 -right-3 w-9 h-9 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-md"
//         >
//           <X className="w-5 h-5" />
//         </button>

//         {/* Title */}
//         <h2 className="text-xl font-semibold text-gray-900 mb-6">
//           Select Date
//         </h2>

//         {/* Date Input */}
//         <div className="relative mb-5">
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="w-full bg-gray-100 px-4 py-3 rounded-xl outline-none"
//           />
//           <span className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500">
//             📅
//           </span>
//         </div>

//         {/* Time */}
//         <h2 className="text-lg font-semibold text-gray-900 mb-3">
//           Select Time Slot
//         </h2>

//         <div className="relative mb-6">
//           <select
//             value={selectedTime}
//             onChange={(e) => setSelectedTime(e.target.value)}
//             className="w-full bg-gray-100 px-4 py-3 rounded-xl outline-none appearance-none"
//           >
//             <option value="">Time</option>
//             {timeSlots.map((slot) => (
//               <option key={slot} value={slot}>
//                 {slot}
//               </option>
//             ))}
//           </select>

//           <span className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500">
//             🕒
//           </span>
//         </div>

//         {/* Notes */}
//         <h2 className="text-lg font-semibold text-gray-900 mb-3">
//           Special Notes
//         </h2>

//         <textarea
//           value={notes}
//           onChange={(e) => setNotes(e.target.value)}
//           placeholder="Write Here"
//           className="w-full bg-gray-100 px-4 py-4 rounded-xl outline-none resize-none mb-6 h-32"
//         />

//         {/* Button */}
//         <button
//           onClick={handleContinue}
//           disabled={!selectedDate || !selectedTime}
//           className="w-full py-3 rounded-full text-white font-semibold"
//           style={{
//             background:
//               selectedDate && selectedTime
//                 ? "linear-gradient(90deg, #FF6B00, #FFA500)"
//                 : "#D1D5DB",
//           }}
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// };






"use client";

import { CalendarDays, MapPin, X } from "lucide-react";
// import { useState } from "react";
import { Clock } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

// import DatePicker from "react-datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



interface SelectDateTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (date: string, time: string, notes: string) => void;
  showLocation?: boolean;
  location?: string;
  serviceId?: number | string;
}

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

export const SelectDateTimeModal: React.FC<SelectDateTimeModalProps> = ({
  isOpen,
  onClose,
  onContinue,
  showLocation = false,
  location = "",
  serviceId = 1,
}) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateObj, setDateObj] = useState<Date | null>(null);
  // if (!isOpen) return null;
const [timeSlots, setTimeSlots] = useState<any[]>([]);
const [slotLoading, setSlotLoading] = useState(false);

useEffect(() => {
  if (!isOpen) return;

  const fetchSlots = async () => {
    // your slots api
  };

  fetchSlots();
}, [isOpen, serviceId]);

if (!isOpen) return null;

const handleContinue = () => {
  if (selectedDate && selectedTime) {
    onContinue(selectedDate, selectedTime, notes);
  }
};

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[28px] w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-9 h-9 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Select Date
        </h2>

        {/* Date Input */}
        <div className="mb-5 relative">
          <input
            type="text"
            value={selectedDate}
            placeholder="Select Date"
            readOnly
            onClick={() => setShowCalendar(true)}
            className="w-full text-xs bg-gray-100 px-4 py-3 rounded-xl outline-none pr-10 cursor-pointer"
          />

          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500">
            <CalendarDays className="w-4" />
          </span>
        </div>
        {/* Time */}
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Select Time Slot
        </h2>

        {showCalendar && (
          <div className="absolute z-50">
            <DatePicker
              selected={dateObj}
              onChange={(date: Date | null) => {
                if (date) {
                  setDateObj(date);
                  setSelectedDate(date.toLocaleDateString());
                }
                setShowCalendar(false);
              }}
              inline
              minDate={new Date()}
            />
          </div>
        )}
        <div className="mb-6">
          <div className="grid grid-cols-3 gap-3">
            {slotLoading ? (
              <p className="col-span-3 text-sm text-gray-500">
                Loading slots...
              </p>
            ) : timeSlots.length > 0 ? (
              timeSlots.map((slot: any) => {
                const slotText =
                  slot.time ||
                  slot.slot ||
                  slot.name ||
                  `${slot.start_time || ""} ${slot.end_time ? `- ${slot.end_time}` : ""}`;

                const isActive = selectedTime === slotText;

                return (
                  <button
                    key={slot.id || slotText}
                    type="button"
                    onClick={() => setSelectedTime(slotText)}
                    className={`py-3 rounded-full border text-[10px] font-medium transition-all ${
                      isActive
                        ? "border-orange-500 bg-orange-50 text-orange-600"
                        : "border-gray-200 bg-white text-[#2B2B2B]"
                    }`}
                  >
                    {slotText}
                  </button>
                );
              })
            ) : (
              <p className="col-span-3 text-sm text-gray-500">
                No slots available
              </p>
            )}
          </div>
        </div>

        {showLocation && (
          <>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Your Location
            </h2>

            <div className="relative mb-6">
              <div className="w-full text-xs bg-gray-100 px-4 py-4 rounded-xl pr-10 text-gray-700">
                {location || "No location found"}
              </div>

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500">
                <MapPin className="w-4 h-4" />
              </span>
            </div>
          </>
        )}

        {/* Notes */}
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Special Notes
        </h2>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write Here"
          className="w-full bg-gray-100 px-4 py-4 rounded-xl outline-none resize-none mb-6 h-32"
        />

        {/* Button */}
        <button
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTime}
          className="w-full py-3 rounded-full text-white font-semibold"
          style={{
            background:
              selectedDate && selectedTime
                ? "linear-gradient(90deg, #FF6B00, #FFA500)"
                : "#D1D5DB",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};


