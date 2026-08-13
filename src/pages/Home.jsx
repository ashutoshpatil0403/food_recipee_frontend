import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const recipes = [
    {
      id: 1,
      title: "Creamy Garlic Butter Salmon",
      category: "Seafood",
      time: "25 min",
      difficulty: "Medium",
      image:
        "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=400&fit=crop",
      description:
        "Pan-seared salmon with a rich garlic butter sauce, served with asparagus.",
    },
    {
      id: 2,
      title: "Mediterranean Greek Salad",
      category: "Veg",
      time: "15 min",
      difficulty: "Easy",
      image:
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop",
      description:
        "Fresh cucumbers, tomatoes, olives, and feta cheese with Greek dressing.",
    },
    {
      id: 3,
      title: "Grilled Steak with Chimichurri",
      category: "Meat",
      time: "35 min",
      difficulty: "Hard",
      image:
        "https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=400&fit=crop",
      description:
        "Perfectly grilled steak topped with fresh herb chimichurri sauce.",
    },
    {
      id: 4,
      title: "Wild Mushroom Risotto",
      category: "Veg",
      time: "40 min",
      difficulty: "Hard",
      image:
        "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&h=400&fit=crop",
      description:
        "Creamy Arborio rice with wild mushrooms and Parmesan cheese.",
    },
    {
      id: 5,
      title: "Fresh Fruit Tart",
      category: "Veg",
      time: "30 min",
      difficulty: "Medium",
      image:
        "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=400&fit=crop",
      description:
        "Buttery tart shell filled with vanilla custard and fresh seasonal fruits.",
    },
    {
      id: 6,
      title: "Spicy Ramen Bowl",
      category: "Asian",
      time: "20 min",
      difficulty: "Medium",
      image:
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop",
      description:
        "Rich pork broth with ramen noodles, soft-boiled egg, and spicy miso.",
    },
    {
      id: 7,
      title: "Margherita Pizza",
      category: "Veg",
      time: "25 min",
      difficulty: "Easy",
      image:
        "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600&h=400&fit=crop",
      description:
        "Classic Italian pizza with tomato sauce, fresh mozzarella, and basil.",
    },
    {
      id: 8,
      title: "Quinoa Avocado Bowl",
      category: "Veg",
      time: "20 min",
      difficulty: "Easy",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
      description:
        "Healthy bowl with quinoa, avocado, black beans, and lime dressing.",
    },
    {
      id: 9,
      title: "Vegetable Pad Thai",
      category: "Veg",
      time: "30 min",
      difficulty: "Medium",
      image:
        "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600&h=400&fit=crop",
      description:
        "Stir-fried rice noodles with tofu, vegetables, and tangy tamarind sauce.",
    },
    {
      id: 10,
      title: "Eggplant Parmesan",
      category: "Veg",
      time: "45 min",
      difficulty: "Hard",
      image:
        "https://images.unsplash.com/photo-1593431445074-6e5a1dec2565?w=600&h=400&fit=crop",
      description:
        "Breaded eggplant layered with marinara and melted mozzarella cheese.",
    },
    {
      id: 11,
      title: "Butternut Squash Soup",
      category: "Veg",
      time: "35 min",
      difficulty: "Easy",
      image:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop",
      description:
        "Creamy roasted butternut squash soup with a touch of warming spices.",
    },
    {
      id: 12,
      title: "Mushroom & Spinach Pasta",
      category: "Veg",
      time: "25 min",
      difficulty: "Medium",
      image:
        "https://images.unsplash.com/photo-1645112411342-9669b6a8be5a?w=600&h=400&fit=crop",
      description:
        "Penne pasta tossed with sautéed mushrooms, spinach, and garlic cream.",
    },
  ];

  // Filter veg recipes for popular section
  const vegRecipes = recipes.filter((recipe) => recipe.category === "Veg");
  const popularVegRecipes = vegRecipes.slice(0, 6);

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isPaused) return;

    let scrollInterval = setInterval(() => {
      if (scrollContainer) {
        const maxScroll =
          scrollContainer.scrollWidth - scrollContainer.clientWidth;
        if (scrollContainer.scrollLeft >= maxScroll) {
          scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollContainer.scrollBy({ left: 1, behavior: "smooth" });
        }
      }
    }, 30);

    return () => clearInterval(scrollInterval);
  }, [isPaused]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
      {/* Hero Section with Food Image Background - No Orange Color */}
      <div className="relative text-white overflow-hidden">
        {/* Background Image with 30% Opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=1200&h=600&fit=crop')`,
            opacity: 0.6,
          }}
        ></div>

        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center z-10">
          <div className="flex justify-center mb-6">
            <span className="text-6xl animate-bounce">🍳</span>
          </div>
          <p className="text-white/80 font-medium uppercase tracking-[0.3em] text-sm mb-4">
            Welcome to FoodieHub
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight text-white">
            Discover Delicious Recipes
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
            Explore hundreds of mouth-watering recipes. Cook with love, eat with
            joy.
          </p>
          <button
            onClick={() => navigate("/add-recipee")}
            className="group bg-white text-gray-800 font-bold px-10 py-4 rounded-full text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            <span>Add Your Recipe</span>
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </div>
      </div>

      {/* Trending Recipes - Horizontal Scroller with Auto-scroll */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <span>🔥 Trending Recipes</span>
              <span className="text-orange-500 text-2xl">✦</span>
            </h2>
            <span className="block w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 mt-3 rounded-full"></span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg hover:bg-gray-50 transition-all flex items-center justify-center text-gray-700"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg hover:bg-gray-50 transition-all flex items-center justify-center text-gray-700"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="min-w-[280px] max-w-[280px] bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex-shrink-0"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                  {recipe.difficulty}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="flex items-center gap-3 text-white">
                    <span className="flex items-center gap-1 text-sm">
                      <i className="fas fa-clock"></i>
                      {recipe.time}
                    </span>
                    <span className="flex items-center gap-1 text-sm">
                      <i className="fas fa-tag"></i>
                      {recipe.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-md font-bold text-gray-800 hover:text-gray-600 transition-colors line-clamp-1">
                  {recipe.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {recipe.description}
                </p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <button className="text-gray-700 font-medium text-sm hover:text-gray-900 transition-colors flex items-center gap-2">
                    View Recipe
                    <i className="fas fa-arrow-right text-xs"></i>
                  </button>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <i className="far fa-heart text-lg"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Veg Recipes Section */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <span>🌱 Popular Veg This Week</span>
              <span className="text-orange-500 text-2xl">✦</span>
            </h2>
            <span className="block w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 mt-3 rounded-full"></span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {popularVegRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="relative rounded-xl overflow-hidden group cursor-pointer"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-3">
                <div className="w-full">
                  <h3 className="text-white font-semibold text-xs line-clamp-2">
                    {recipe.title}
                  </h3>
                  <span className="text-gray-300 text-xs">{recipe.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Recipe Floating CTA (Mobile friendly) */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <button
          onClick={() => navigate("/add-recipee")}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
        >
          <i className="fas fa-plus text-2xl"></i>
        </button>
      </div>
    </div>
  );
};

export default Home;
