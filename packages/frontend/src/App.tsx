import { Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from "./components/ThemeContext";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import GamePage from "./pages/GamePage";
import ReviewPage from "./pages/ReviewPage";
import LoginPage from "./pages/LoginPage";
import "./index.css";
import { ValidRoutes } from "../../backend/src/shared/ValidRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Routes>
          <Route path={ValidRoutes.HOME} element={<HomePage />} />
          <Route path={ValidRoutes.USER} element={<UserPage />} />
          <Route path={ValidRoutes.GAME} element={<GamePage />} />
          <Route path={ValidRoutes.REVIEW} element={<ReviewPage />} />
          <Route path={ValidRoutes.LOGIN} element={<LoginPage />} />
        </Routes>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;