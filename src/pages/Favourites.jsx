import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/favourites`, { withCredentials: true });
        if (!ignore) setFavourites(response.data);
      } catch (error) {
        console.error("Error fetching favourites:", error);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchFavourites();
    return () => { ignore = true; };
  }, []);

  const handleRemoveFav = async (recipeeId) => {
    try {
      await axios.delete(`${BASE_URL}/favourites/${recipeeId}`, { withCredentials: true });
      setFavourites(favourites.filter((r) => r._id !== recipeeId));
    } catch (error) {
      console.error("Error removing from favourites:", error);
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
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800">My Favourites</h2>
          <span className="block w-16 h-1 bg-red-500 mt-2 rounded-full"></span>
        </div>

        {favourites.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-5xl mb-4">❤️</p>
            <p className="text-lg font-medium">
              No favourites yet. Browse recipes and add some!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favourites.map((recipe) => (
              <div
                key={recipe._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                {recipe.coverImage && (
                  <img
                    src={`${BASE_URL}${recipe.coverImage}`}
                    alt={recipe.title}
                    className="w-full h-44 object-cover"
                  />
                )}
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
                <div className="p-5 flex-1 flex flex-col gap-4">
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1">
                    {recipe.instructions}
                  </p>
                  <button
                    onClick={() => handleRemoveFav(recipe._id)}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-xl transition-all text-sm cursor-pointer"
                  >
                    Remove from Favourites 💔
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
