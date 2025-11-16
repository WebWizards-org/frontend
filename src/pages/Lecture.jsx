import React, { useState, useRef } from "react";
import axios from "axios";

export default function LectureForm() {
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileRef = useRef(null);

  const resetForm = () => {
    setTitle("");
    setOrder("");
    setVideoURL("");
    setProgress(0);
    setError("");
    setSuccess("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleVideoUpload = async (e) => {
    setError("");
    setSuccess("");
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      setError("Please select a video file.");
      return;
    }

    setLoading(true);
    setProgress(0);

    try {
      // 1. Get auth from backend (adjust URL if needed)
      const auth = await axios.get("http://localhost:4000/auth");

      // 2. Prepare formData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);
      formData.append("signature", auth.data.signature);
      formData.append("expire", auth.data.expire);
      formData.append("token", auth.data.token);

      // 3. Upload to ImageKit with progress
      const upload = await axios.post(
        "https://upload.imagekit.io/api/v1/files/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (evt) => {
            if (evt.total) {
              const percent = Math.round((evt.loaded * 100) / evt.total);
              setProgress(percent);
            }
          },
        }
      );

      setVideoURL(upload.data.url);
      setSuccess("Video uploaded successfully.");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Upload failed. Try again."
      );
      setVideoURL("");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!order || Number(order) <= 0) {
      setError("Order must be a positive number.");
      return;
    }
    if (!videoURL) {
      setError("Please upload a video first.");
      return;
    }

    const lecture = {
      title: title.trim(),
      order: Number(order),
      videoURL,
    };

    try {
      // Replace with real API endpoint
      await axios.post("http://localhost:3001/api/lectures", lecture);
      setSuccess("Lecture saved.");
      resetForm();
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Saving lecture failed."
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white shadow-xl p-8 rounded-2xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Create Lecture
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lecture Title
          </label>
          <input
            type="text"
            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            aria-label="Lecture title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Order
          </label>
          <input
            type="number"
            min="1"
            className="w-40 border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="1"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            required
            aria-label="Lecture order"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Video
          </label>
          <div className="flex items-center gap-3">
            <input
              ref={fileRef}
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 cursor-pointer"
              aria-label="Upload video"
            />
            {loading && (
              <div className="text-sm text-gray-600">{progress}%</div>
            )}
          </div>

          {progress > 0 && progress < 100 && (
            <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
              <div
                className="h-2 rounded-full bg-blue-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {videoURL && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preview
              </label>
              <div className="bg-gray-50 p-3 rounded-lg">
                <video
                  src={videoURL}
                  controls
                  className="w-full max-h-80 rounded-md"
                />
                <div className="mt-2 text-sm text-gray-600 break-words">
                  <a
                    href={videoURL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    {videoURL}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="text-sm text-green-700 bg-green-50 p-2 rounded">
            {success}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg shadow disabled:opacity-50"
          >
            Save Lecture
          </button>
        </div>
      </form>
    </div>
  );
}
