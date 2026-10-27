import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { ArrowRight, BookOpen, Code2, Layers, Sparkles } from "lucide-react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

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
        console.error("Failed to load homepage posts:", error);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#080f1e] text-slate-100">
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-slate-800">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.18),transparent_55%)]" />

        <Container>
          <div className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
                <Sparkles size={16} />
                Your developer learning space
              </div>

              <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Turn curiosity into
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                  code and creation.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                Discover programming tutorials, strengthen your problem-solving
                skills, and explore practical guides for your journey as a
                developer.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/all-posts"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
                >
                  Explore articles
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to={authStatus ? "/add-post" : "/signup"}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-6 py-3.5 font-semibold text-slate-200 transition hover:border-blue-400/60 hover:bg-slate-800"
                >
                  {authStatus ? "Write a post" : "Join ChaiBlog"}
                  <Code2 size={18} />
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <BookOpen size={17} className="text-blue-400" />
                  Practical tutorials
                </span>
                <span className="flex items-center gap-2">
                  <Layers size={17} className="text-blue-400" />
                  Developer resources
                </span>
              </div>
            </div>

            {/* Decorative code panel */}
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-4 rounded-3xl bg-blue-500/10 blur-2xl" />

              <div className="relative overflow-hidden rounded-2xl border border-slate-700/80 bg-[#0d1729] shadow-2xl shadow-black/30">
                <div className="flex items-center gap-2 border-b border-slate-800 px-5 py-4">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                  <span className="ml-3 text-xs text-slate-500">
                    developer.java
                  </span>
                </div>

                <div className="space-y-4 p-6 font-mono text-sm leading-7 sm:p-8">
                  <p className="text-slate-500">
                    {"// Your next idea starts here"}
                  </p>
                  <p>
                    <span className="text-purple-400">class</span>{" "}
                    <span className="text-cyan-300">Developer</span>{" "}
                    <span className="text-slate-300">{"{"}</span>
                  </p>
                  <p className="pl-5">
                    <span className="text-purple-400">void</span>{" "}
                    <span className="text-blue-300">learn</span>
                    <span className="text-slate-300">() {"{"}</span>
                  </p>
                  <p className="pl-10 text-green-300">practice();</p>
                  <p className="pl-10 text-green-300">buildProjects();</p>
                  <p className="pl-5 text-slate-300">{"}"}</p>
                  <p className="text-slate-300">{"}"}</p>
                  <div className="mt-5 rounded-xl border border-blue-400/15 bg-blue-500/5 p-4">
                    <p className="text-xs text-slate-500">
                      DAILY DEVELOPER REMINDER
                    </p>
                    <p className="mt-1 font-sans font-semibold text-blue-300">
                      Learn something. Build something.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Articles */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                The latest
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Explore articles
              </h2>
              <p className="mt-3 text-slate-400">
                Ideas, tutorials, and skills to move your coding journey
                forward.
              </p>
            </div>

            <Link
              to="/all-posts"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
            >
              View all posts
              <ArrowRight size={17} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-80 animate-pulse rounded-2xl border border-slate-800 bg-slate-900"
                />
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {posts.slice(0, 6).map((post) => (
                <PostCard key={post.$id} {...post} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 px-6 py-16 text-center">
              <BookOpen size={36} className="mx-auto mb-4 text-slate-500" />
              <h3 className="text-xl font-semibold text-white">
                Your next great read starts here
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                There are no published posts to display yet. Create your first
                article and it will appear here.
              </p>

              <Link
                to={authStatus ? "/add-post" : "/signup"}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
              >
                {authStatus ? "Create a post" : "Join ChaiBlog"}
                <ArrowRight size={17} />
              </Link>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
