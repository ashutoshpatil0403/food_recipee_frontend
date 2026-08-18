import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";

const MyRecipees = () => {
  const [recipees, setRecipees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyRecipees();
  }, []);

  const fetchMyRecipees = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/my-recipees`, { withCredentials: true });
      setRecipees(response.data);
    } catch (error) {
      console.error("Error fetching my recipees:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (recipe) => {
    setEditingId(recipe._id);
    setEditForm({
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      time: recipe.time || "",
      Servings: recipe.Servings,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (id) => {
    try {
      await axios.put(`${BASE_URL}/recipee/${id}`, editForm, { withCredentials: true });
      setEditingId(null);
      fetchMyRecipees();
    } catch (error) {
      console.error("Error editing recipe:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">My Recipes</h2>
            <span className="block w-16 h-1 bg-orange-500 mt-2 rounded-full"></span>
          </div>
          <button
            onClick={() => navigate("/add-recipee")}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-full transition-colors"
          >
            + Add New
          </button>
        </div>

        {recipees.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-5xl mb-4">📝</p>
            <p className="text-lg font-medium">You haven't added any recipes yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipees.map((recipe) => (
              <div
                key={recipe._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
              >
                {recipe.coverImage && (
                  <img
                    src={`${BASE_URL}${recipe.coverImage}`}
                    alt={recipe.title}
                    className="w-full h-44 object-cover"
                  />
                )}}
                <div className="p-5 flex-1 flex flex-col">
                  {editingId === recipe._id ? (
                    <div className="space-y-3 flex-1">
                      <input
                        type="text"
                        name="title"
                        value={editForm.title}
                        onChange={handleEditChange}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                        placeholder="Title"
                      />
                      <textarea
                        name="ingredients"
                        value={editForm.ingredients}
                        onChange={handleEditChange}
                        rows={2}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                        placeholder="Ingredients"
                      />
                      <textarea
                        name="instructions"
                        value={editForm.instructions}
                        onChange={handleEditChange}
                        rows={2}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                        placeholder="Instructions"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="time"
                          value={editForm.time}
                          onChange={handleEditChange}
                          className="w-1/2 border rounded-lg px-3 py-2 text-sm"
                          placeholder="Time"
                        />
                        <input
                          type="text"
                          name="Servings"
                          value={editForm.Servings}
                          onChange={handleEditChange}
                          className="w-1/2 border rounded-lg px-3 py-2 text-sm"
                          placeholder="Servings"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditSubmit(recipe._id)}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 rounded-lg"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm font-semibold py-2 rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {recipe.title}
                      </h3>
                      <div className="flex gap-2 mb-3">
                        {recipe.time && (
                          <span className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full">
                            ⏱ {recipe.time}
                          </span>
                        )}
                        <span className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full">
                          🍽 {recipe.Servings} servings
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                        {recipe.instructions}
                      </p>
                      <button
                        onClick={() => handleEdit(recipe)}
                        className="w-full bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white font-semibold py-2.5 rounded-xl transition-all text-sm cursor-pointer"
                      >
                        Edit Recipe ✏️
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRecipees;
