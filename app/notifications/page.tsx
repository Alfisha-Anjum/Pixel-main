"use client";

import { ArrowLeft, Bell, CheckCircle, MessageSquare, Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getDateLabel = (dateString?: string | null) => {
    if (!dateString) return "Today";

    const datePart = dateString.split(" ").slice(0, 1)[0]; // 16-05-2026
    const [day, month, year] = datePart.split("-");

    const date = new Date(`${year}-${month}-${day}`);
    const today = new Date();

    const isToday = date.toDateString() === today.toDateString();

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isToday)
      return `Today, ${date.toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })}`;

    if (isYesterday) return "Yesterday";

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  };

  const groupedNotifications = notifications.reduce((acc: any, item: any) => {
    const label = getDateLabel(item.sent_at || item.created_at);

    if (!acc[label]) acc[label] = [];
    acc[label].push(item);

    return acc;
  }, {});
  
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://taskpro.itmingo.com/api/customers/notifications",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setNotifications(res.data?.data || []);
    } catch (error) {
      console.log("NOTIFICATION API ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const getIcon = (type: string) => {
    if (type === "SMS") return MessageSquare;
    if (type === "Push") return CheckCircle;
    return Bell;
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
  <div className="min-h-screen max-w-7xl mx-auto px-4 py-6">
    <div className="relative flex items-center justify-center mb-10">
      <button onClick={() => router.back()} className="absolute left-0">
        <ArrowLeft className="w-7 h-7" />
      </button>

      <h1 className="text-2xl font-bold">Notification</h1>
    </div>

    <div className="space-y-8">
      {Object.entries(groupedNotifications).map(([title, items]: any) => (
        <div key={title}>
          <h2 className="text-lg font-bold text-gray-500 mb-4">
            {title}
          </h2>

          <div className="space-y-4">
            {items.map((item: any) => {
              const Icon = getIcon(item.type);
              const unread = !item.read_at;

              return (
                <div
                  key={item.id}
                  className="relative bg-white rounded-2xl shadow-md p-5 flex gap-5 items-center"
                >
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center ${
                      unread ? "bg-green-100" : "bg-blue-100"
                    }`}
                  >
                    <Icon
                      className={`w-9 h-9 ${
                        unread ? "text-green-600" : "text-blue-600"
                      }`}
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-black">
                      {item.title}
                    </h3>

                    <p className="text-gray-500 text-base leading-6">
                      {item.message}
                    </p>

                    <p className="text-xs text-gray-400 mt-2">
                      {item.sent_at || item.created_at}
                    </p>
                  </div>

                  {unread && (
                    <span className="absolute right-5 top-8 w-3 h-3 bg-blue-600 rounded-full" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  </div>
);
}
