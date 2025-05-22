import { useState } from "react";
import Layout from "../components/Layout";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <Layout>
      <label htmlFor="game_search">
        <h2>Game Search</h2>
        <input 
          type="text" 
          id="game_search" 
          name="game_search" 
          placeholder="Enter game name..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </label>
    </Layout>
  );
}