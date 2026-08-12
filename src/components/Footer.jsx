import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🍽️</span>
              <span className="text-xl font-bold">
                <span className="text-orange-400">Foodie</span>
                <span className="text-white">Hub</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Discover, cook, and share delicious recipes from around the world. Your kitchen, your rules.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-orange-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/my-recipees" className="text-sm hover:text-orange-400 transition-colors">
                  My Recipes
                </Link>
              </li>
              <li>
                <Link to="/favourites" className="text-sm hover:text-orange-400 transition-colors">
                  Favourites
                </Link>
              </li>
              <li>
                <Link to="/add-recipee" className="text-sm hover:text-orange-400 transition-colors">
                  Add Recipe
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="text-sm hover:text-orange-400 transition-colors cursor-pointer">
                  Cooking Tips
                </span>
              </li>
              <li>
                <span className="text-sm hover:text-orange-400 transition-colors cursor-pointer">
                  Ingredients Guide
                </span>
              </li>
              <li>
                <span className="text-sm hover:text-orange-400 transition-colors cursor-pointer">
                  Kitchen Tools
                </span>
              </li>
              <li>
                <span className="text-sm hover:text-orange-400 transition-colors cursor-pointer">
                  FAQs
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span>📧</span>
                <span>support@foodiehub.com</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>Mumbai, India</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <span className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-sm hover:bg-orange-500 transition-colors cursor-pointer">
                𝕏
              </span>
              <span className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-sm hover:bg-orange-500 transition-colors cursor-pointer">
                in
              </span>
              <span className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-sm hover:bg-orange-500 transition-colors cursor-pointer">
                gh
              </span>
            </div>
          </div>
        </div>

        {/* Divider + Bottom */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} FoodieHub. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <span className="hover:text-gray-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-300 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
