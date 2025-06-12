import { Routes, Route } from "react-router";
import { ThemeProvider } from "./components/ThemeContext";
import { ReviewsProvider } from "./context/ReviewsContext";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import GamePage from "./pages/GamePage";
import ReviewPage from "./pages/ReviewPage";
import LoginPage from "./pages/LoginPage";
import "./index.css";
import { ValidRoutes } from "../../backend/src/shared/ValidRoutes";

function App() {
  return (
    <ThemeProvider>
      <ReviewsProvider>
        <Routes>
          <Route path={ValidRoutes.HOME} element={<HomePage />} />
          <Route path={ValidRoutes.USER} element={<UserPage />} />
          <Route path={ValidRoutes.GAME} element={<GamePage />} />
          <Route path={ValidRoutes.REVIEW} element={<ReviewPage />} />
          <Route path={ValidRoutes.LOGIN} element={<LoginPage />} />
        </Routes>
      </ReviewsProvider>
    </ThemeProvider>
  );
}

export default App;