import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import GamePage from "./pages/GamePage";
import ReviewPage from "./pages/ReviewPage";
import LoginPage from "./pages/LoginPage";
import "./styles.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/game/:id" element={<GamePage />} />
      <Route path="/review" element={<ReviewPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;