import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);

    // Mocked silent token refresh
    const interval = setInterval(() => {
      if (localStorage.getItem("token")) {
        localStorage.setItem("token", "fake-jwt-token");
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // ✅ Make sure this is **inside App component**, not outside
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="flex justify-between items-center px-6 py-4 bg-gray-900">
        <h1 className="text-3xl font-bold text-yellow-400">🌌 Star Wars Characters</h1>
        <button
          onClick={handleLogout} // <-- This will now work
          className="bg-yellow-500 text-black px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </header>
      <main className="p-4">
        <Home />
      </main>
    </div>
  );
};

export default App;
