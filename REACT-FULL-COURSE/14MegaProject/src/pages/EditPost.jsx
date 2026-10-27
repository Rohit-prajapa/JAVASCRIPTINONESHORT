import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowLeft, FilePenLine, LoaderCircle } from "lucide-react";

import appwriteService from "../appwrite/config";
import { Container } from "../components";
import PostForm from "../components/post-form/PostForm";

export default function EditPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function fetchPost() {
      if (!slug) {
        setError("Post ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const result = await appwriteService.getPost(slug);

        if (!mounted) return;

        if (!result) {
          setError("This post could not be found.");
          return;
        }

        if (result.userId !== userData?.$id) {
          setError("You are not authorized to edit this post.");
          return;
        }

        setPost(result);
      } catch (err) {
        console.error("Failed to load post for editing:", err);

        if (mounted) {
          setError("Unable to load this post. Please try again.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchPost();

    return () => {
      mounted = false;
    };
  }, [slug, userData?.$id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080f1e] py-20 text-slate-100">
        <Container>
          <div className="flex items-center justify-center gap-3 text-slate-400">
            <LoaderCircle className="animate-spin text-blue-400" size={22} />
            Loading your article...
          </div>
        </Container>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#080f1e] py-16 text-slate-100">
        <Container>
          <div className="mx-auto max-w-xl rounded-2xl border border-slate-800 bg-[#111c30] p-8 text-center">
            <h1 className="text-2xl font-bold text-white">
              Unable to edit post
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              {error || "The requested post is unavailable."}
            </p>

            <button
              type="button"
              onClick={() => navigate("/all-posts")}
              className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Back to posts
            </button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080f1e] py-10 text-slate-100 sm:py-14">
      <Container>
        <button
          type="button"
          onClick={() => navigate(`/post/${post.$id}`)}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-blue-400"
        >
          <ArrowLeft size={17} />
          Back to article
        </button>

        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-sm font-medium text-blue-300">
              <FilePenLine size={16} />
              Creator studio
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Edit your article
            </h1>

            <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
              Refine your content, update your featured image, and save your
              changes.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#111c30] p-5 shadow-2xl shadow-black/10 sm:p-8">
            <div className="mb-7 border-b border-slate-800 pb-5">
              <p className="text-sm text-slate-400">Editing</p>
              <h2 className="mt-1 break-words text-xl font-bold text-white">
                {post.title}
              </h2>
            </div>

            <PostForm post={post} />
          </div>
        </div>
      </Container>
    </div>
  );
}
