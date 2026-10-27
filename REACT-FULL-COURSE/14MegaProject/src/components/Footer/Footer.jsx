import React from "react";
import { Link } from "react-router-dom";
import { Code2, ArrowUp, ExternalLink } from "lucide-react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-800 bg-[#080f1e] text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
                <Code2 size={23} className="text-white" />
              </span>

              <span className="text-2xl font-bold tracking-tight text-white">
                Chai<span className="text-blue-400">Blog</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
              A place to explore programming tutorials, share knowledge, and
              keep growing as a developer.
            </p>

            <p className="mt-4 text-xs font-medium tracking-[0.2em] text-blue-400">
              CODE. LEARN. BUILD.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Explore
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link to="/" className="transition-colors hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-posts"
                  className="transition-colors hover:text-blue-400"
                >
                  All Posts
                </Link>
              </li>
              <li>
                <Link
                  to="/add-post"
                  className="transition-colors hover:text-blue-400"
                >
                  Write a Post
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Community
            </h3>

            <p className="mt-5 text-sm leading-6 text-slate-400">
              Keep learning, build projects, and share what you discover.
            </p>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-blue-400"
            >
              <Code2 size={17} />
              <ArrowUp size={15} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 flex flex-col gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} ChaiBlog. All rights reserved.</p>

          <Link to="/" className="transition-colors hover:text-blue-400">
            Made for developers
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
