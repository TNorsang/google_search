"use client";
import { useState } from "react";
import axios from "axios";

interface SearchResult {
  url: string;
  title: string;
  snippet: string;
}

interface SearchResponse {
  web: {
    results: SearchResult[];
  };
}
export default function Home() {
  let googoo = ["G", "O", "O", "G", "O", "O"];
  let googooColor = [
    "#4086f4", 
    "#eb4132", 
    "#fbbd01", 
    "#4086f4", 
    "#31aa52", 
    "#fbbd01", 
  ];

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/search?query=${query}`);
      setResults(response.data); // Set the results in state
    } catch (err) {
      setError(`Failed to fetch search results ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center space-y-8 items-center h-screen">
      <h1 className="text-black text-8xl">Googoo</h1>
      <form onSubmit={handleSearch}>
      <div className="flex flex-row">
        {googoo.map((letter, index) => (
          <p
            key={index}
            className="text-7xl p-2" // Keep common styles here
            style={{ color: googooColor[index] }} // Apply dynamic background color
          >
            {letter}
          </p>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="rounded-full border border-gray-300 w-96 px-4 py-2 text-black"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {error && <p>{error}</p>}
      <div>
        {results?.web?.results?.map((result, index) => (
          <div key={index}>
            <h3>
              <a href={result.url} target="_blank" rel="noopener noreferrer">
                {result.title}
              </a>
            </h3>
            <p>{result.snippet}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
