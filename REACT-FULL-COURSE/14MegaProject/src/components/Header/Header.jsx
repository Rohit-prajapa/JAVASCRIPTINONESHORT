import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X, Code2, ChevronRight } from "lucide-react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", show: true },
    { name: "Login", slug: "/login", show: !authStatus },
    { name: "Signup", slug: "/signup", show: !authStatus },
    { name: "All Posts", slug: "/all-posts", show: authStatus },
    { name: "Add Post", slug: "/add-post", show: authStatus },
  ];

  const visibleItems = navItems.filter((item) => item.show);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-blue-500/15 text-blue-400"
        : "text-slate-300 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#080f1e]/95 shadow-lg shadow-black/10 backdrop-blur-xl">
      <Container>
        <nav className="flex min-h-[76px] items-center justify-between gap-4">
          {/* Brand */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="group flex shrink-0 items-center gap-3"
            aria-label="ChaiBlog home"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20 transition-transform duration-200 group-hover:scale-105">
              <Code2 size={24} className="text-white" />
            </span>

            <span className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white">
                Chai<span className="text-blue-400">Blog</span>
              </span>
              <span className="text-[11px] tracking-wide text-slate-500">
                CODE. LEARN. BUILD.
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {visibleItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.slug}
                end={item.slug === "/"}
                className={linkClass}
              >
                {item.name}
              </NavLink>
            ))}

            {authStatus && (
              <div className="ml-2 border-l border-slate-700 pl-3">
                <LogoutBtn />
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-200 transition hover:border-blue-500 hover:bg-slate-800 md:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-800 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {visibleItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.slug}
                  end={item.slug === "/"}
                  onClick={() => setMobileMenuOpen(false)}
                  className={linkClass}
                >
                  {item.name}
                  <ChevronRight size={16} className="ml-auto" />
                </NavLink>
              ))}

              {authStatus && (
                <div className="mt-2 border-t border-slate-800 pt-3">
                  <LogoutBtn />
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
