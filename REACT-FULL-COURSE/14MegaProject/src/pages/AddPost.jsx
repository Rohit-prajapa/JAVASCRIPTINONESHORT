import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowLeft, FileText, Sparkles } from "lucide-react";
import { Container } from "../components";
import appwriteService from "../appwrite/config";
import PostForm from "../components/post-form/PostForm";

export default function AddPost() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (!userData?.$id) {
      console.error("You must be logged in to create a post.");
      return;
    }

    let uploadedFile = null;

    try {
      if (data.image?.[0]) {
        uploadedFile = await appwriteService.uploadFile(data.image[0]);

        if (!uploadedFile) {
          throw new Error("Image upload failed. Please try again.");
        }

        data.featuredImage = uploadedFile.$id;
      }

      const post = await appwriteService.createPost({
        ...data,
        userId: userData.$id,
      });

      if (!post) {
        if (uploadedFile?.$id) {
          await appwriteService.deleteFile(uploadedFile.$id);
        }
        throw new Error("Post creation failed.");
      }

      navigate(`/post/${post.$id}`);
    } catch (error) {
      console.error("Error creating post:", error);

      if (uploadedFile?.$id) {
        await appwriteService.deleteFile(uploadedFile.$id);
      }

      window.alert(error.message || "Unable to create post.");
    }
  };

  return (
    <div className="min-h-screen bg-[#080f1e] py-10 text-slate-100 sm:py-14">
      <Container>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-blue-400"
        >
          <ArrowLeft size={17} />
          Back
        </button>

        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-sm font-medium text-blue-300">
              <Sparkles size={16} />
              Creator studio
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Create a new article
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Share your knowledge, explain a concept, and help other developers
              learn something new.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#111c30] p-5 shadow-2xl shadow-black/10 sm:p-8">
            <div className="mb-7 flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <FileText size={22} />
              </div>

              <div>
                <h2 className="font-bold text-white">Article details</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Add your title, content, and featured image.
                </p>
              </div>
            </div>

            <PostForm onSubmit={submit} />
          </div>

          <p className="mt-5 text-center text-xs leading-6 text-slate-500">
            Make it useful. Keep it clear. Keep building.
          </p>
        </div>
      </Container>
    </div>
  );
}
