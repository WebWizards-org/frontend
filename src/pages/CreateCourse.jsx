import React, { useState } from "react";
import axios from "axios";

function CreateCourse() {
  const [file, setFile] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleUpload = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", file);
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("price", price);

    axios
      .post("http://localhost:3001/api/courses", formdata)
      .then((res) => {
        setTitle("");
        setDescription("");
        setPrice("");
        setFile(null);
        alert("Course uploaded successfully!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <form
        onSubmit={handleUpload}
        className="space-y-4 bg-white rounded-xl shadow p-6 mb-8"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default CreateCourse;
