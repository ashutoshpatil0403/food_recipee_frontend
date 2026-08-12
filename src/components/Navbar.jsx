import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useToast } from "../context/useToast";

const Navbar = () => {
  const { isLoggedIn, logout, getUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const user = getUser();

  const checkLogin = async () => {
    if (isLoggedIn) {
      await logout();
      showToast("Logged out successfully");
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive ? "text-orange-500" : "text-gray-600 hover:text-orange-500"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo — replace span with <img> when ready */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍽️</span>
          <span className="text-xl font-bold">
            <span className="text-orange-500">Foodie</span>
            <span className="text-gray-800">Hub</span>
          </span>
        </div>

        {/* Nav Links */}
        <ul className="flex items-center gap-8">
          <li>
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-recipees" className={linkClass}>
              My Recipe
            </NavLink>
          </li>
          <li>
            <NavLink to="/favourites" className={linkClass}>
              Favourites
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-recipee" className={linkClass}>
              Add Recipee
            </NavLink>
          </li>
          {isLoggedIn && (
            <li>
              <NavLink to="/edit-profile" className={linkClass}>
                Profile
              </NavLink>
            </li>
          )}
          <li className="flex items-center gap-3">
            {isLoggedIn && user && (
              <span className="text-sm font-medium text-gray-700">
                👋 {user.firstName} {user.lastName}
              </span>
            )}
            <button
              onClick={checkLogin}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors duration-200 cursor-pointer"
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
