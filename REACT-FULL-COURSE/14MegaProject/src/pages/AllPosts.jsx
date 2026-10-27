import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { Search, BookOpen, ArrowRight, FileText, X } from "lucide-react";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let mounted = true;

    appwriteService
      .getPosts()
      .then((result) => {
        if (!mounted) return;

        if (result) {
          setPosts(result.rows || result.documents || []);
        }
      })
      .catch((error) => {
        console.error("Failed to load posts:", error);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const filteredPosts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) return posts;

    return posts.filter((post) => {
      const title = (post.title || "").toLowerCase();
      const content = (post.content || "")
        .replace(/<[^>]*>/g, " ")
        .toLowerCase();

      return title.includes(term) || content.includes(term);
    });
  }, [posts, searchTerm]);

  return (
    <div className="min-h-screen bg-[#080f1e] py-10 text-slate-100 sm:py-14">
      <Container>
        {/* Page heading */}
        <section className="relative mb-10 overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-[#111c30] via-[#0d1729] to-[#101e3a] px-6 py-10 sm:px-10 sm:py-12">
          <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-sm font-medium text-blue-300">
              <BookOpen size={16} />
              The ChaiBlog library
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Explore all articles
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Discover tutorials, programming concepts, and practical resources
              to help you grow as a developer.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-slate-400">
              <span className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-950/30 px-3 py-2">
                <FileText size={16} className="text-blue-400" />
                {posts.length} {posts.length === 1 ? "article" : "articles"}
              </span>
            </div>
          </div>
        </section>

        {/* Search */}
        <section className="mb-8">
          <label
            htmlFor="post-search"
            className="mb-3 block text-sm font-semibold text-slate-200"
          >
            Find something to learn
          </label>

          <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-[#111c30] px-4 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10">
            <Search size={20} className="shrink-0 text-slate-500" />

            <input
              id="post-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by title or article content..."
              className="min-w-0 flex-1 bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-500"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </section>

        {/* Results heading */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">
              {searchTerm ? "Search results" : "All articles"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {loading
                ? "Loading articles..."
                : `${filteredPosts.length} ${
                    filteredPosts.length === 1 ? "result" : "results"
                  }`}
            </p>
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-80 animate-pulse rounded-2xl border border-slate-800 bg-[#111c30]"
              />
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredPosts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-[#111c30]/60 px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900">
              <Search size={25} className="text-slate-400" />
            </div>

            <h3 className="mt-5 text-xl font-bold text-white">
              {searchTerm ? "No matching articles" : "No articles yet"}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
              {searchTerm
                ? "Try another keyword or clear your search to see all published articles."
                : "Published articles will appear here when they're available."}
            </p>

            {searchTerm ? (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="mt-6 rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-blue-500 hover:bg-slate-800"
              >
                Clear search
              </button>
            ) : (
              <Link
                to="/"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Back to home
                <ArrowRight size={17} />
              </Link>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}
