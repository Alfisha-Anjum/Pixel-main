import Image from "next/image";
import GradientButton from "@/components/ui/GradientButton";
import { useRouter } from "next/navigation";

export default function ProfileCard() {
  const router = useRouter();

  return (
    <div className="flex flex-col mb-10 items-center lg:items-start text-center lg:text-left">
      <Image
        src="/img/profileimg.png"
        alt="profile"
        width={100}
        height={100}
        className="rounded-full mb-3"
      />

      <h4 className="font-semibold text-[#0A0F0D] text-[16px]">
        Danial Austin
      </h4>
      <p className="text-[#808080] text-[14px]">danialaustin007@gmail.com</p>

      <div className="flex gap-2 md:gap-3 mt-5">
        <GradientButton
          text="My Bookings"
          width="w-[185px]"
          height="h-[35px]"
          textClassName="text-[16px]"
          onClick={() => router.push("/my-booking")}
        />

        <GradientButton
          text="Help Center"
          width="w-[185px]"
          height="h-[35px]"
          textClassName="text-[16px]"
          onClick={() => router.push("/contact-us")}
        />
      </div>
    </div>
  );
}
