import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/useAuth";
import { useToast } from "../context/useToast";

const RecipeCard = ({ recipe }) => {
  const { isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const ingredientsList = recipe.ingredients.split(",").slice(0, 4);
  const hasMoreIngredients = recipe.ingredients.split(",").length > 4;

  const handleAddToFav = async () => {
    if (!isLoggedIn) {
      showToast("Login to add favourites", "error");
      return;
    }
    try {
      await axios.post(`http://localhost:5000/favourites/${recipe._id}`, {}, { withCredentials: true });
      showToast("Added to favourites!");
    } catch (error) {
      if (error.response?.status === 400) {
        showToast("Already in favourites", "error");
      } else {
        showToast("Failed to add to favourites", "error");
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
      {/* Cover Image */}
      {recipe.coverImage && (
        <img
          src={`http://localhost:5000${recipe.coverImage}`}
          alt={recipe.title}
          className="w-full h-44 object-cover"
        />
      )}

      {/* Card Header */}
      <div className="bg-gradient-to-r from-orange-700 to-red-700 p-5">
        <h3 className="text-white text-lg font-bold leading-snug line-clamp-2">
          {recipe.title}
        </h3>
        <div className="flex flex-wrap gap-2 mt-3">
          {recipe.time && (
            <span className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">
              ⏱ {recipe.time}
            </span>
          )}
          {recipe.Servings && (
            <span className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">
              🍽 {recipe.Servings} servings
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col gap-4">
        {/* Ingredients */}
        <div>
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Key Ingredients
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {ingredientsList.map((item, idx) => (
              <span
                key={idx}
                className="bg-orange-50 text-orange-600 text-xs font-medium px-2.5 py-0.5 rounded-full border border-orange-100"
              >
                {item.trim()}
              </span>
            ))}
            {hasMoreIngredients && (
              <span className="bg-gray-100 text-gray-500 text-xs font-medium px-2.5 py-0.5 rounded-full">
                +more
              </span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-auto space-y-2">
          <button
            onClick={handleAddToFav}
            className="w-full bg-red-50 hover:bg-red-100 text-red-500 font-semibold py-2.5 rounded-xl transition-all duration-200 text-sm cursor-pointer border border-red-200"
          >
            ❤️ Add to Favourites
          </button>
          <Link
            to={`/recipee/${recipe._id}`}
            className="block w-full bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 hover:shadow-md text-sm text-center"
          >
            View Full Recipe →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
