import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import RecipeCard from "./RecipeeCard";

const GetAllRecipees = () => {
  const [recipees, setRecipees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipees = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/allrecipees`);
        setRecipees(response.data);
      } catch (error) {
        console.error("Error fetching recipees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipees();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (recipees.length === 0) {
    return (
      <div className="text-center py-24 text-gray-400">
        <p className="text-5xl mb-4">🍽️</p>
        <p className="text-lg font-medium">No recipes found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {recipees.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
};

export default GetAllRecipees;
