import GetAllRecipees from "../components/AllRecipees";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <p className="text-orange-100 font-medium uppercase tracking-widest text-sm mb-3">
            Welcome to FoodieHub
          </p>
          <h1 className="text-5xl font-extrabold mb-5 tracking-tight leading-tight">
            Discover Delicious Recipes
          </h1>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto mb-8">
            Explore hundreds of mouth-watering recipes. Cook with love, eat with
            joy.
          </p>
          <button
            onClick={() => navigate("/add-recipee")}
            className="bg-white text-orange-500 font-bold px-8 py-3 rounded-full text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            Add Your Recipee
          </button>
        </div>
      </div>

      {/* Recipes Section */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800">All Recipes</h2>
          <span className="block w-16 h-1 bg-orange-500 mt-2 rounded-full"></span>
        </div>
        <GetAllRecipees />
      </div>
    </div>
  );
};

export default Home;
