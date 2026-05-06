import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import LayoutContainer from "./LayoutContainer";

const majorServices = [
  {
    title: "Plumbing Service Agency",
    rating: 4.5,
    reviews: "30 Reviews",
    image: "/heroimage.jpg",
  },
  {
    title: "Electrical Service Agency",
    rating: 4.5,
    reviews: "30 Reviews",
    image: "/heroimage.jpg",
  },
  {
    title: "Water proofing Service Agency",
    rating: 4.5,
    reviews: "30 Reviews",
    image: "/heroimage.jpg",
  },
  {
    title: "Bathroom & Kitchen Renovation",
    rating: 4.5,
    reviews: "30 Reviews",
    image: "/heroimage.jpg",
  },
];

const MajorServices = ({ data = [] }: { data?: any[] }) => {
  const finalServices = data.length > 0 ? data : majorServices;
  const router = useRouter();

  const handleBookService = (serviceTitle: string) => {
    router.push(`/service/${serviceTitle.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <section className="">
      <LayoutContainer>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mb-5">
          Major Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {finalServices.map((service, index) => (
            <div
              key={index}
              style={{
                borderRadius: "16px",
                boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Large Service Image */}
              <div
                style={{
                  width: "100%",
                  height: "195px",
                  overflow: "hidden",
                  borderRadius: "16px 16px 0 0",
                }}
              >
                <img
                  src={service.image}
                  alt={service.title || service.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Content Below Image */}
              <div
                style={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  flex: 1,
                }}
              >
                {/* Service Title */}
                <h3
                  style={{
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "#1F2937",
                    margin: 0,
                    lineHeight: "1.3",
                  }}
                >
                  {service.title || service.name}
                </h3>

                {/* Rating Row */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <Star
                    style={{
                      width: "12px",
                      height: "12px",
                      color: "#F97316",
                      fill: "#F97316",
                    }}
                  />
                  <span style={{ fontSize: "13px", color: "#6B7280" }}>
                    {Number(service.rating) || 0}
                  </span>
                  <span style={{ fontSize: "13px", color: "#6B7280" }}>
                    ({service.reviews})
                  </span>
                </div>

                {/* Buttons Row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#16A34A",
                      fontWeight: "500",
                    }}
                  >
                    Free Consultancy
                  </span>

                  <button
                    onClick={() =>
                      service.slug
                        ? router.push(`/service/${service.slug}`)
                        : handleBookService(service.title || service.name)
                    }
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </LayoutContainer>
    </section>
  );
};

export default MajorServices;
