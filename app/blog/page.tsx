// "use client";

// import { useEffect } from "react";
// import { Calendar, User, Tag, ArrowRight } from "lucide-react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// const BlogPage = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const blogPosts = [
//     {
//       id: 1,
//       title: "10 Essential Home Maintenance Tips for Every Season",
//       excerpt: "Learn how to keep your home in perfect condition year-round with these professional maintenance tips from our expert service providers.",
//       author: "Sarah Johnson",
//       date: "February 5, 2026",
//       category: "Home Maintenance",
//       readTime: "5 min read",
//       image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=400&fit=crop"
//     },
//     {
//       id: 2,
//       title: "The Ultimate Guide to Choosing the Right AC Service Provider",
//       excerpt: "Not all AC service providers are created equal. Here's what to look for when selecting a professional service for your air conditioning needs.",
//       author: "Michael Chen",
//       date: "February 3, 2026",
//       category: "AC Services",
//       readTime: "7 min read",
//       image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=400&fit=crop"
//     },
//     {
//       id: 3,
//       title: "DIY vs Professional Cleaning: What You Need to Know",
//       excerpt: "Discover when it makes sense to tackle cleaning projects yourself and when it's better to call in the professionals for optimal results.",
//       author: "Priya Sharma",
//       date: "January 30, 2026",
//       category: "Cleaning Services",
//       readTime: "6 min read",
//       image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=400&fit=crop"
//     },
//     {
//       id: 4,
//       title: "Understanding Electrical Safety in Your Home",
//       excerpt: "Essential electrical safety tips every homeowner should know to prevent accidents and maintain a safe living environment.",
//       author: "David Wilson",
//       date: "January 25, 2026",
//       category: "Electrical Services",
//       readTime: "4 min read",
//       image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=400&fit=crop"
//     },
//     {
//       id: 5,
//       title: "Plumbing Problems: Early Signs and Prevention Strategies",
//       excerpt: "Learn to recognize early warning signs of plumbing issues and discover preventive measures to avoid costly repairs.",
//       author: "Anita Patel",
//       date: "January 20, 2026",
//       category: "Plumbing Services",
//       readTime: "5 min read",
//       image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&h=400&fit=crop"
//     },
//     {
//       id: 6,
//       title: "Maximizing Your Home's Energy Efficiency",
//       excerpt: "Simple yet effective ways to reduce energy consumption and lower your utility bills while maintaining comfort.",
//       author: "Robert Kumar",
//       date: "January 15, 2026",
//       category: "Energy Solutions",
//       readTime: "8 min read",
//       image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=400&fit=crop"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />

//       <main className="flex-grow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           {/* Hero Section */}
//           <div className="text-center mb-16">
//             <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//               TAS PRO Blog
//             </h1>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Expert tips, industry insights, and helpful guides to make your home maintenance easier and more efficient.
//             </p>
//           </div>

//           {/* Featured Post */}
//           <div className="mb-16">
//             <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//               <div className="md:flex">
//                 <div className="md:w-1/2">
//                   <img
//                     src={blogPosts[0].image}
//                     alt={blogPosts[0].title}
//                     className="w-full h-64 md:h-full object-cover"
//                   />
//                 </div>
//                 <div className="p-8 md:w-1/2">
//                   <div className="flex items-center gap-4 mb-4">
//                     <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
//                       {blogPosts[0].category}
//                     </span>
//                     <span className="text-gray-500 text-sm">{blogPosts[0].readTime}</span>
//                   </div>
//                   <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
//                     {blogPosts[0].title}
//                   </h2>
//                   <p className="text-gray-600 mb-6">
//                     {blogPosts[0].excerpt}
//                   </p>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-4 text-sm text-gray-500">
//                       <div className="flex items-center gap-1">
//                         <User className="w-4 h-4" />
//                         <span>{blogPosts[0].author}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Calendar className="w-4 h-4" />
//                         <span>{blogPosts[0].date}</span>
//                       </div>
//                     </div>
//                     <button className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium">
//                       Read More
//                       <ArrowRight className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Blog Posts Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {blogPosts.slice(1).map((post) => (
//               <div key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
//                 <img
//                   src={post.image}
//                   alt={post.title}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-6">
//                   <div className="flex items-center gap-3 mb-3">
//                     <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
//                       {post.category}
//                     </span>
//                     <span className="text-gray-500 text-xs">{post.readTime}</span>
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
//                     {post.title}
//                   </h3>
//                   <p className="text-gray-600 mb-4 line-clamp-3">
//                     {post.excerpt}
//                   </p>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2 text-sm text-gray-500">
//                       <User className="w-4 h-4" />
//                       <span>{post.author}</span>
//                     </div>
//                     <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">
//                       Read More
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Newsletter Signup */}
//           <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 md:p-12 text-center text-white">
//             <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
//             <p className="text-xl mb-8 opacity-90">
//               Subscribe to our newsletter for the latest tips and industry insights
//             </p>
//             <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
//               />
//               <button className="px-6 py-3 bg-white text-orange-600 font-medium rounded-lg hover:bg-gray-100 transition-colors">
//                 Subscribe
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default BlogPage;

// "use client";

// import { useEffect } from "react";
// import { Calendar, User, Tag, ArrowRight } from "lucide-react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// const BlogPage = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const blogPosts = [
//     {
//       id: 1,
//       title: "10 Essential Home Maintenance Tips for Every Season",
//       excerpt: "Learn how to keep your home in perfect condition year-round with these professional maintenance tips from our expert service providers.",
//       author: "Sarah Johnson",
//       date: "February 5, 2026",
//       category: "Home Maintenance",
//       readTime: "5 min read",
//       image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=400&fit=crop"
//     },
//     {
//       id: 2,
//       title: "The Ultimate Guide to Choosing the Right AC Service Provider",
//       excerpt: "Not all AC service providers are created equal. Here's what to look for when selecting a professional service for your air conditioning needs.",
//       author: "Michael Chen",
//       date: "February 3, 2026",
//       category: "AC Services",
//       readTime: "7 min read",
//       image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=400&fit=crop"
//     },
//     {
//       id: 3,
//       title: "DIY vs Professional Cleaning: What You Need to Know",
//       excerpt: "Discover when it makes sense to tackle cleaning projects yourself and when it's better to call in the professionals for optimal results.",
//       author: "Priya Sharma",
//       date: "January 30, 2026",
//       category: "Cleaning Services",
//       readTime: "6 min read",
//       image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=400&fit=crop"
//     },
//     {
//       id: 4,
//       title: "Understanding Electrical Safety in Your Home",
//       excerpt: "Essential electrical safety tips every homeowner should know to prevent accidents and maintain a safe living environment.",
//       author: "David Wilson",
//       date: "January 25, 2026",
//       category: "Electrical Services",
//       readTime: "4 min read",
//       image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=400&fit=crop"
//     },
//     {
//       id: 5,
//       title: "Plumbing Problems: Early Signs and Prevention Strategies",
//       excerpt: "Learn to recognize early warning signs of plumbing issues and discover preventive measures to avoid costly repairs.",
//       author: "Anita Patel",
//       date: "January 20, 2026",
//       category: "Plumbing Services",
//       readTime: "5 min read",
//       image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&h=400&fit=crop"
//     },
//     {
//       id: 6,
//       title: "Maximizing Your Home's Energy Efficiency",
//       excerpt: "Simple yet effective ways to reduce energy consumption and lower your utility bills while maintaining comfort.",
//       author: "Robert Kumar",
//       date: "January 15, 2026",
//       category: "Energy Solutions",
//       readTime: "8 min read",
//       image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=400&fit=crop"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />

//       <main className="flex-grow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           {/* Hero Section */}
//           <div className="text-center mb-16">
//             <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//               TAS PRO Blog
//             </h1>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Expert tips, industry insights, and helpful guides to make your home maintenance easier and more efficient.
//             </p>
//           </div>

//           {/* Featured Post */}
//           <div className="mb-16">
//             <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//               <div className="md:flex">
//                 <div className="md:w-1/2">
//                   <img
//                     src={blogPosts[0].image}
//                     alt={blogPosts[0].title}
//                     className="w-full h-64 md:h-full object-cover"
//                   />
//                 </div>
//                 <div className="p-8 md:w-1/2">
//                   <div className="flex items-center gap-4 mb-4">
//                     <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
//                       {blogPosts[0].category}
//                     </span>
//                     <span className="text-gray-500 text-sm">{blogPosts[0].readTime}</span>
//                   </div>
//                   <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
//                     {blogPosts[0].title}
//                   </h2>
//                   <p className="text-gray-600 mb-6">
//                     {blogPosts[0].excerpt}
//                   </p>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-4 text-sm text-gray-500">
//                       <div className="flex items-center gap-1">
//                         <User className="w-4 h-4" />
//                         <span>{blogPosts[0].author}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Calendar className="w-4 h-4" />
//                         <span>{blogPosts[0].date}</span>
//                       </div>
//                     </div>
//                     <button className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium">
//                       Read More
//                       <ArrowRight className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Blog Posts Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {blogPosts.slice(1).map((post) => (
//               <div key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
//                 <img
//                   src={post.image}
//                   alt={post.title}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-6">
//                   <div className="flex items-center gap-3 mb-3">
//                     <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
//                       {post.category}
//                     </span>
//                     <span className="text-gray-500 text-xs">{post.readTime}</span>
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
//                     {post.title}
//                   </h3>
//                   <p className="text-gray-600 mb-4 line-clamp-3">
//                     {post.excerpt}
//                   </p>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2 text-sm text-gray-500">
//                       <User className="w-4 h-4" />
//                       <span>{post.author}</span>
//                     </div>
//                     <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">
//                       Read More
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Newsletter Signup */}
//           <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 md:p-12 text-center text-white">
//             <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
//             <p className="text-xl mb-8 opacity-90">
//               Subscribe to our newsletter for the latest tips and industry insights
//             </p>
//             <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
//               />
//               <button className="px-6 py-3 bg-white text-orange-600 font-medium rounded-lg hover:bg-gray-100 transition-colors">
//                 Subscribe
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default BlogPage;

"use client";
import SidebarCard from "@/components/ui/SidebarCard";
import Image from "next/image";
import BlogSlider from "@/components/ui/BlogSlider";
import { useState, useEffect } from "react";
import BlogCard from "@/components/BlogCards";
import BlogDetail from "@/components/BlogDetail";

type SidebarCardProps = {
  title: string;
  description?: string;
  buttonText?: string;
  onClick?: () => void;
  variant?: "orange" | "gray";
  image?: string;
  buttonClassName?: string;
  imageClassName?: string;
};

type Blog = {
  category: string;
  title: string;
  description: string;
  date: string;
  image: string;
};

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(2);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const sidebarData: SidebarCardProps[] = [
    {
      title: "Looking Job for Technician",
      buttonText: "Apply Now",
      variant: "orange",
      image: "/electrician.png",
      buttonClassName: "bg-orange-500 hover:bg-orange-600 text-white",
      imageClassName: "w-[100%] h-[75%] rounded-t-md",
    },
    {
      title: "Looking for any service?",
      buttonText: "Visit Site",
      variant: "gray",
      image: "/img/advgirl.png",
      imageClassName: "w-[280px] h-[600px] rounded-t-md",
      buttonClassName: "bg-black hover:bg-gray-800 text-white",
    },
  ];
  const blogData: Blog[] = [
    {
      category: "Education",
      title: "What is Salary Range?",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form variations ...",
      date: "27, Oct, 2024",
      image: "/img/officeview.png",
    },
    {
      category: "Education",
      title: "What is Salary Range?",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form variations ...",
      date: "27, Oct, 2024",
      image: "/img/officeview.png",
    },
    {
      category: "Education",
      title: "What is Salary Range?",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form variations ...",
      date: "27, Oct, 2024",
      image: "/img/officeview.png",
    },
    {
      category: "Education",
      title: "What is Salary Range?",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form variations ...",
      date: "27, Oct, 2024",
      image: "/img/officeview.png",
    },
    {
      category: "Education",
      title: "What is Salary Range?",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form variations ...",
      date: "27, Oct, 2024",
      image: "/img/officeview.png",
    },
    {
      category: "Education",
      title: "What is Salary Range?",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form variations ...",
      date: "27, Oct, 2024",
      image: "/img/officeview.png",
    },
    {
      category: "Education",
      title: "What is Salary Range?",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form variations ...",
      date: "27, Oct, 2024",
      image: "/img/officeview.png",
    },
    {
      category: "Education",
      title: "What is Salary Range?",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form variations ...",
      date: "27, Oct, 2024",
      image: "/img/officeview.png",
    },

    {
      category: "Education",
      title: "What is Salary Range?",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form variations ...",
      date: "27, Oct, 2024",
      image: "/img/officeview.png",
    },
    {
      category: "Education",
      title: "What is Salary Range?",
      description:
        "There are many variations of passages of Lorem Ipsum available...",
      date: "27, Oct, 2024",
      image: "/img/officeview.png",
    },
    {
      category: "Education",
      title: "Another Blog Post",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form variations ...",
      date: "27, Oct, 2024",
      image: "/img/officeview.png",
    },
    {
      category: "Education",
      title: "What is Salary Range?",
      description:
        "There are many variations of passages of Lorem Ipsum available...",
      date: "27, Oct, 2024",
      image: "/img/officeview.png",
    },
    {
      category: "Education",
      title: "Another Blog Post",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form variations ...",
      date: "27, Oct, 2024",
      image: "/img/officeview.png",
    },
  ];

  const blogsPerPage = 5;

  const totalPages = Math.ceil(blogData.length / blogsPerPage);

  const startIndex = (currentPage - 1) * blogsPerPage;
  const selectedBlogs = blogData.slice(startIndex, startIndex + blogsPerPage);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        {/* LEFT - BLOGS */}
        <div className="w-full">
          {selectedBlog && (
            <div className="w-full h-[350px] relative">
              <Image
                src="/img/learning.png"
                alt="Learning"
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="w-full flex flex-col lg:flex-row gap-8">
            {/* LEFT */}
            <div className="w-full lg:w-[65%]">
              {selectedBlog ? (
                <>
                  <BlogDetail
                    blog={selectedBlog}
                    onBack={() => setSelectedBlog(null)}
                  />

                  <div className="mt-10">
                    <BlogSlider />
                  </div>
                </>
              ) : (
                <>
                  <div className="m-6">
                    <h3 className="text-[28px] font-semibold">Our Blog</h3>
                    <p className="text-gray-600 text-[18px] mt-2">
                      There are many variations of passages of Lorem Ipsum
                    </p>
                  </div>

                  {selectedBlogs.map((card, i) => (
                    <BlogCard
                      key={i}
                      {...card}
                      onReadMore={() => setSelectedBlog(card)}
                    />
                  ))}

                  {/* PAGINATION */}
                  <div className="flex items-center gap-4 mt-10">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-orange-400 text-orange-500"
                    >
                      {" "}
                      {"<"}{" "}
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (num) => (
                        <button
                          key={num}
                          onClick={() => setCurrentPage(num)}
                          className={`text-lg font-medium ${
                            currentPage === num
                              ? "text-orange-500"
                              : "text-gray-800"
                          }`}
                        >
                          {num}
                        </button>
                      ),
                    )}
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-orange-400 text-orange-500"
                    >
                      {">"}
                    </button>
                  </div>
                </>
              )}
            </div>

            <aside className="w-full lg:w-[35%] lg:min-w-[320px] space-y-6 self-start mt-20 sticky top-20">
              {/* Categories */}
              <div className="bg-white p-6 rounded-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 pb-2">
                  Categories
                </h3>

                <ul className="space-y-2 text-sm text-gray-600">
                  {[
                    "Education",
                    "Information",
                    "Interview",
                    "Learn",
                    "Skill",
                    "Speaking",
                  ].map((item) => (
                    <li
                      key={item}
                      className="hover:text-orange-500 cursor-pointer font-medium py-1"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sidebar Cards */}
              {sidebarData.map((card, i) => (
                <SidebarCard key={i} {...card} />
              ))}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
