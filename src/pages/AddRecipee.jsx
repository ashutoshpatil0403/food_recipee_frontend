import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "../context/useToast";

const AddRecipee = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    time: "",
    Servings: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    if (selected) {
      setPreview(URL.createObjectURL(selected));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("ingredients", form.ingredients);
      formData.append("instructions", form.instructions);
      formData.append("time", form.time);
      formData.append("Servings", form.Servings);
      if (file) {
        formData.append("file", file);
      }
      await axios.post("http://localhost:5000/recipee", formData, { withCredentials: true });
      showToast("Recipe added successfully!");
      navigate("/");
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to add recipee";
      setError(msg);
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Add New Recipe
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Recipe title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ingredients <span className="text-red-500">*</span>
            </label>
            <textarea
              name="ingredients"
              value={form.ingredients}
              onChange={handleChange}
              required
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="List your ingredients"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instructions <span className="text-red-500">*</span>
            </label>
            <textarea
              name="instructions"
              value={form.instructions}
              onChange={handleChange}
              required
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Step by step instructions"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="text"
                name="time"
                value={form.time}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="e.g. 30 mins"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Servings <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="Servings"
                value={form.Servings}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="e.g. 4"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 w-full h-40 object-cover rounded-lg border border-gray-200"
              />
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Recipe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipee;
