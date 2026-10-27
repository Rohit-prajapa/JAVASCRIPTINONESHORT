import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { ImagePlus, FileText, Eye, EyeOff, UploadCloud } from "lucide-react";
import { Button, Input, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";

export default function PostForm({ post }) {
  const navigate = useNavigate();

  const [content, setContent] = useState(post?.content || "");
  const [preview, setPreview] = useState("");
  const [currentImageId, setCurrentImageId] = useState(
    post?.featuredImage || post?.imageUrl || "",
  );
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      status: post?.status || "active",
    },
  });

  const titleValue = watch("title");

  useEffect(() => {
    if (post) {
      setValue("title", post.title || "");
      setValue("slug", post.$id || "");
      setValue("status", post.status || "active");
      setContent(post.content || "");
      setCurrentImageId(post.featuredImage || post.imageUrl || "");
    }
  }, [post, setValue]);

  useEffect(() => {
    if (!post && titleValue) {
      setValue(
        "slug",
        titleValue
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
      );
    }
  }, [titleValue, post, setValue]);

  const selectedImage = watch("image");

  useEffect(() => {
    const file = selectedImage?.[0];

    if (!file) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  const submit = async (formData) => {
    setSubmitting(true);
    setErrorMessage("");

    let uploadedFile = null;

    try {
      const file = formData.image?.[0];

      if (file) {
        uploadedFile = await appwriteService.uploadFile(file);

        if (!uploadedFile) {
          throw new Error("Image upload failed. Please try again.");
        }
      }

      const postData = {
        title: formData.title.trim(),
        slug: formData.slug,
        content,
        status: formData.status,
        featuredImage: uploadedFile?.$id || currentImageId,
      };

      let result;

      if (post?.$id) {
        result = await appwriteService.updatePost(post.$id, postData);
      } else {
        // AddPost's parent should provide the onSubmit handler.
        if (typeof arguments === "undefined") {
          throw new Error("Unable to submit the post.");
        }

        throw new Error(
          "Create mode requires an onSubmit prop. Pass the parent submit handler to PostForm.",
        );
      }

      if (!result) {
        throw new Error("Unable to save the post.");
      }

      // Delete the old image only after the post update succeeds.
      if (
        post?.$id &&
        uploadedFile &&
        currentImageId &&
        currentImageId !== uploadedFile.$id
      ) {
        await appwriteService.deleteFile(currentImageId);
      }

      navigate(`/post/${result.$id}`);
    } catch (error) {
      console.error("Post form submission error:", error);

      if (uploadedFile?.$id) {
        await appwriteService.deleteFile(uploadedFile.$id);
      }

      setErrorMessage(error.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-7">
      {errorMessage && (
        <div
          role="alert"
          className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
        >
          {errorMessage}
        </div>
      )}

      {/* Title */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-200">
          Article title
        </label>
        <Input
          placeholder="e.g. Complete DSA Guide in Java and C++"
          className="w-full rounded-xl border border-slate-700 bg-[#080f1e] text-white placeholder:text-slate-500 focus:border-blue-500"
          {...register("title", {
            required: "Please enter a title.",
            minLength: {
              value: 3,
              message: "Title must contain at least 3 characters.",
            },
          })}
        />
        {errors.title && (
          <p className="mt-2 text-sm text-red-400">{errors.title.message}</p>
        )}
      </div>

      {/* Slug */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-200">
          Slug / Post ID
        </label>
        <Input
          placeholder="post-slug"
          className="w-full rounded-xl border border-slate-700 bg-[#080f1e] text-slate-400"
          readOnly
          {...register("slug")}
        />
        <p className="mt-2 text-xs text-slate-500">
          Your post uses its Appwrite row ID for routing.
        </p>
      </div>

      {/* Featured image */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-200">
          Featured image
        </label>

        <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-[#080f1e] px-5 py-8 text-center transition hover:border-blue-500 hover:bg-blue-500/5">
          <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            <UploadCloud size={24} />
          </span>
          <span className="font-semibold text-slate-200">Choose an image</span>
          <span className="mt-2 text-sm text-slate-500">PNG, JPG, or WEBP</span>
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            {...register("image")}
          />
        </label>

        {(preview || currentImageId) && (
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-700 bg-[#080f1e] p-2">
            <img
              src={preview || appwriteService.getFilePreview(currentImageId)}
              alt="Featured image preview"
              className="max-h-72 w-full rounded-lg object-contain"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-200">
          <FileText size={17} className="text-blue-400" />
          Article content
        </label>

        <div className="overflow-hidden rounded-xl border border-slate-700 bg-white">
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY || "no-api-key"}
            value={content}
            onEditorChange={(value) => setContent(value)}
            init={{
              height: 420,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist | link image | code",
              content_style:
                "body { font-family:Arial,sans-serif; font-size:15px; line-height:1.7; color:#1e293b; padding:12px; } img { max-width:100%; height:auto; }",
            }}
          />
        </div>
        {!content.trim() && (
          <p className="mt-2 text-xs text-slate-500">
            Write your article in the editor above.
          </p>
        )}
      </div>

      {/* Publish status */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-200">
          Publication status
        </label>
        <Select
          options={[
            { label: "Active — Published", value: "active" },
            { label: "Inactive — Draft", value: "inactive" },
          ]}
          className="w-full"
          {...register("status", { required: true })}
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 border-t border-slate-800 pt-6 sm:flex-row">
        <Button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {submitting ? "Saving..." : post ? "Save changes" : "Create article"}
        </Button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-slate-300 transition hover:bg-slate-800"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
