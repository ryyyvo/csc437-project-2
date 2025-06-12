import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import Layout from "../components/Layout";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginMutation } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      // Error is handled by the mutation
    }
  };

  return (
    <Layout>
      <h2>Login</h2>
      <form className="create_review" onSubmit={handleSubmit}>
        {loginMutation.error && (
          <p style={{ color: "red" }}>
            {loginMutation.error instanceof Error 
              ? loginMutation.error.message 
              : "Login failed"}
          </p>
        )}

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loginMutation.isPending}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loginMutation.isPending}
        />

        <button type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>

        <p>
          Don't have an account?{" "}
          <Link to="/register">Register here</Link>
        </p>
      </form>
    </Layout>
  );
}