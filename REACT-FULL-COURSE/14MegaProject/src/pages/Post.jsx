import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import {
  ArrowLeft,
  CalendarDays,
  Edit3,
  FileText,
  LoaderCircle,
  Trash2,
} from "lucide-react";

import appwriteService from "../appwrite/config";
import { Container } from "../components";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = Boolean(post && userData) && post.userId === userData.$id;

  const imageId = post?.featuredImage || post?.imageUrl;

  useEffect(() => {
    let isMounted = true;

    async function fetchPost() {
      if (!slug) {
        setPost(null);
        setLoadError(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setLoadError(false);

        const result = await appwriteService.getPost(slug);

        if (!isMounted) return;

        if (result) {
          setPost(result);
        } else {
          setPost(null);
          setLoadError(true);
        }
      } catch (error) {
        console.error("Error fetching post:", error);

        if (isMounted) {
          setPost(null);
          setLoadError(true);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchPost();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const deletePost = async () => {
    if (!post || !isAuthor || deleting) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this article? This action cannot be undone.",
    );

    if (!confirmed) return;

    setDeleting(true);

    try {
      const deleted = await appwriteService.deletePost(post.$id);

      if (!deleted) {
        window.alert("The article could not be deleted. Please try again.");
        return;
      }

      // Remove the associated image after the post has been deleted.
      if (imageId) {
        try {
          await appwriteService.deleteFile(imageId);
        } catch (imageError) {
          console.error(
            "Article deleted, but image cleanup failed:",
            imageError,
          );
        }
      }

      navigate("/all-posts", { replace: true });
    } catch (error) {
      console.error("Error deleting post:", error);
      window.alert("Unable to delete this article. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080f1e] py-24 text-slate-100">
        <Container>
          <div className="flex flex-col items-center justify-center gap-4">
            <LoaderCircle size={34} className="animate-spin text-blue-400" />
            <p className="text-sm text-slate-400">Loading your article...</p>
          </div>
        </Container>
      </div>
    );
  }

  if (loadError || !post) {
    return (
      <div className="min-h-screen bg-[#080f1e] py-20 text-slate-100">
        <Container>
          <div className="mx-auto max-w-lg rounded-2xl border border-slate-800 bg-[#111c30] p-8 text-center">
            <FileText size={42} className="mx-auto text-slate-500" />

            <h1 className="mt-5 text-2xl font-bold text-white">
              Article not found
            </h1>

            <p className="mt-3 leading-7 text-slate-400">
              This article may have been removed, or it could not be loaded.
              Please return to the homepage and try again.
            </p>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Back to homepage
            </button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080f1e] py-8 text-slate-100 sm:py-12">
      <Container>
        <div className="mx-auto max-w-4xl">
          <Link
            to="/all-posts"
            className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-blue-400"
          >
            <ArrowLeft size={17} />
            Back to articles
          </Link>

          <article>
            {/* Article header */}
            <header className="mb-8">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-300">
                  <span className="inline-flex items-center gap-2">
                    <FileText size={14} />
                    Article
                  </span>
                </span>

                {post.$createdAt && (
                  <span className="inline-flex items-center gap-2 text-sm text-slate-500">
                    <CalendarDays size={15} />
                    {new Date(post.$createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                )}
              </div>

              <h1 className="break-words text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                {post.title || "Untitled article"}
              </h1>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-slate-800 py-4">
                <p className="text-sm text-slate-400">Published on ChaiBlog</p>

                {isAuthor && (
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      to={`/edit-post/${post.$id}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-blue-500/60 hover:text-blue-300"
                    >
                      <Edit3 size={15} />
                      Edit article
                    </Link>

                    <button
                      type="button"
                      onClick={deletePost}
                      disabled={deleting}
                      className="inline-flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deleting ? (
                        <LoaderCircle size={15} className="animate-spin" />
                      ) : (
                        <Trash2 size={15} />
                      )}
                      {deleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                )}
              </div>
            </header>

            {/* Featured image */}
            {imageId && (
              <div className="mb-10 overflow-hidden rounded-2xl border border-slate-800 bg-[#050a14]">
                <img
                  src={appwriteService.getFilePreview(imageId)}
                  alt={post.title || "Article featured image"}
                  className="max-h-[520px] w-full object-contain"
                  onError={(event) => {
                    console.error(
                      "Unable to load Appwrite image. File ID:",
                      imageId,
                    );
                    event.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}

            {/* Article body */}
            <div className="rounded-2xl border border-slate-800/80 bg-[#0d1728] p-5 sm:p-8 lg:p-10">
              <div className="prose-content text-base sm:text-lg">
                {parse(post.content || "")}
              </div>
            </div>

            {/* Article footer */}
            <footer className="mt-8 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-[#111c30] p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-white">
                  Enjoyed this article?
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Explore more ideas and tutorials on ChaiBlog.
                </p>
              </div>

              <Link
                to="/all-posts"
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Explore articles
              </Link>
            </footer>
          </article>
        </div>
      </Container>
    </div>
  );
}
