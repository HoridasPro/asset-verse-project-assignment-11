import React from "react";

const Blog = () => {
  // Sample blog posts
  const posts = [
    {
      title: "How to Efficiently Manage Corporate Assets",
      date: "Jan 10, 2026",
      excerpt:
        "Learn best practices for managing company assets, tracking inventory, and ensuring accountability using modern asset management platforms like Asset Verse.",
    },
    {
      title: "Top 5 Benefits of Asset Management Systems",
      date: "Dec 22, 2025",
      excerpt:
        "Discover how asset management solutions can save time, reduce loss, and improve operational efficiency in your organization.",
    },
    {
      title: "Employee Asset Request Process Made Simple",
      date: "Nov 15, 2025",
      excerpt:
        "Streamline the way employees request company assets with intuitive dashboards and approval workflows.",
    },
    {
      title: "Future of Asset Management: Trends to Watch",
      date: "Feb 5, 2026",
      excerpt:
        "Explore the emerging trends in corporate asset management, including AI-driven tracking, automation, and enhanced reporting for better decision-making.",
    },
  ];

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-[#E9EEFF] via-[#DDE6FF] to-[#CCDFFF] text-black py-20">
      <div className="w-full max-w-5xl mx-auto px-6 flex flex-col gap-10">
        {/* Hero / Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
            Our Blog
          </h1>
          <p className="text-gray-800 mt-4 text-lg md:text-xl">
            Stay updated with the latest articles, guides, and news about asset
            management and corporate productivity.
          </p>
        </div>

        {/* Blog Posts */}
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post, idx) => (
            <div
              key={idx}
              className="bg-white/20 backdrop-blur-xl p-6 rounded-2xl shadow-2xl flex flex-col justify-between hover:scale-105 transition-transform"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="text-sm text-gray-500 mb-4">{post.date}</p>
                <p className="text-gray-800">{post.excerpt}</p>
              </div>
              <button className="mt-4 w-full px-6 py-3 rounded-full font-bold border-blue-700 text-blue-700 hover:bg-[#CCE1FF] transition-transform border cursor-pointer">
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
