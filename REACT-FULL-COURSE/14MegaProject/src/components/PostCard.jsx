import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen } from "lucide-react";

function PostCard({ $id, title, imageUrl, featuredImage, content }) {
  const imageId = featuredImage || imageUrl;

  // Create a short plain-text excerpt from the post content.
  const excerpt = (content || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return (
    <Link
      to={`/post/${$id}`}
      className="group block h-full rounded-2xl focus-visible:outline-blue-400"
      aria-label={`Read ${title || "post"}`}
    >
      <article className="surface-transition flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#111c30] shadow-lg shadow-black/10 hover:-translate-y-1 hover:border-blue-500/60 hover:shadow-blue-950/40">
        {/* Featured image */}
        <div className="relative overflow-hidden bg-[#080f1e]">
          {imageId ? (
            <img
              src={appwriteService.getFilePreview(imageId)}
              alt={title || "Post featured image"}
              loading="lazy"
              className="aspect-video w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              onError={(event) => {
                console.error("Image failed to load:", imageId);
                event.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="flex aspect-video w-full items-center justify-center text-slate-500">
              <div className="flex flex-col items-center gap-2">
                <BookOpen size={32} />
                <span className="text-sm">No featured image</span>
              </div>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111c30]/40 to-transparent opacity-60" />
        </div>

        {/* Post details */}
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
              Programming
            </span>
            <span className="text-xs text-slate-500">Article</span>
          </div>

          <h2 className="line-clamp-2 text-lg font-bold leading-snug text-slate-100 transition-colors group-hover:text-blue-400 sm:text-xl">
            {title || "Untitled post"}
          </h2>

          {excerpt && (
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
              {excerpt}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between border-t border-slate-800 pt-4 mt-5">
            <span className="text-sm font-medium text-slate-300">
              Read article
            </span>
            <ArrowUpRight
              size={18}
              className="text-blue-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </div>
        </div>
      </article>
    </Link>
  );
}

export default PostCard;
