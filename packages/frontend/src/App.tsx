import { Routes, Route } from "react-router";
import { ThemeProvider } from "./components/ThemeContext";
import { ReviewsProvider } from "./context/ReviewsContext";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import GamePage from "./pages/GamePage";
import ReviewPage from "./pages/ReviewPage";
import LoginPage from "./pages/LoginPage";
import "./index.css";

function App() {
  return (
    <ThemeProvider>
      <ReviewsProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/game/:id" element={<GamePage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </ReviewsProvider>
    </ThemeProvider>
  );
}

export default App;