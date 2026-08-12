import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const RecipeeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/recipee/${id}`);
        setRecipe(res.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Recipe not found.</p>
      </div>
    );
  }

  const ingredientsList = recipe.ingredients.split(",");

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Cover Image */}
        {recipe.coverImage && (
          <img
            src={`http://localhost:5000${recipe.coverImage}`}
            alt={recipe.title}
            className="w-full h-72 object-cover"
          />
        )}

        {/* Header */}
        <div className="bg-gradient-to-r from-orange-700 to-red-700 p-6">
          <h1 className="text-white text-2xl md:text-3xl font-bold">
            {recipe.title}
          </h1>
          <div className="flex flex-wrap gap-3 mt-4">
            {recipe.time && (
              <span className="bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full">
                ⏱ {recipe.time}
              </span>
            )}
            {recipe.Servings && (
              <span className="bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full">
                🍽 {recipe.Servings} servings
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 space-y-8">
          {/* Ingredients */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">
              🧾 Ingredients
            </h2>
            <div className="flex flex-wrap gap-2">
              {ingredientsList.map((item, idx) => (
                <span
                  key={idx}
                  className="bg-orange-50 text-orange-700 text-sm font-medium px-3 py-1 rounded-full border border-orange-200"
                >
                  {item.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">
              📝 Instructions
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {recipe.instructions}
            </p>
          </div>

          {/* Back button */}
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white font-semibold py-2.5 px-6 rounded-xl transition-all duration-200 hover:shadow-md text-sm"
          >
            ← Back to Recipes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeeDetail;
