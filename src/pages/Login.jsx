import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/useAuth";
import { useToast } from "../context/useToast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.post("http://localhost:5000/login", { email, password }, { withCredentials: true });
      login(response.data.user);
      showToast("Logged in successfully");
      navigate("/");
    } catch (error) {
      const msg = error.response?.data?.message || "Login failed. Please try again.";
      setErrorMessage(msg);
      showToast(msg, "error");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-sm text-center mb-8">
          Login to your account
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
            />
          </div>

          {errorMessage && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-medium text-red-600">{errorMessage}</p>
            </div>
          )}

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 py-2.5 border border-gray-300 text-gray-600 font-medium rounded-xl hover:bg-gray-100 transition cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition cursor-pointer"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-orange-500 font-semibold hover:underline"
            >
              Create new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
