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
  const googoo = ["G", "O", "O", "G", "L", "E"];
  const googooColor = [
    "#4086f4",
    "#eb4132",
    "#fbbd01",
    "#4086f4",
    "#31aa52",
    "#eb4132",
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
      setResults(response.data);
    } catch (err) {
      setError(`Failed to fetch search results ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setQuery("");
    setResults(null);
    setError(null);
  };

  return (
    <div className="flex flex-col items-center h-screen p-4 space-y-8">
      {/* Google logo that resets search */}
      <div className="cursor-pointer flex" onClick={handleReset}>
        {googoo.map((letter, index) => (
          <p
            key={index}
            className="text-5xl font-bold"
            style={{ color: googooColor[index] }}
          >
            {letter}
          </p>
        ))}
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="w-full max-w-lg">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="rounded-full border border-gray-300 w-full px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="text-black rounded-full border border-gray-300 px-4 py-2"
            type="submit"
            disabled={loading}
          >
            {loading ? "..." : "Search"}
          </button>
        </div>
      </form>

      {/* Error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Search Results */}
      <div className="w-full max-w-3xl mt-4">
        {results?.web?.results?.map((result, index) => (
          <div key={index} className="mb-6 p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-blue-500 hover:underline">
              <a href={result.url} target="_blank" rel="noopener noreferrer">
                {result.title}
              </a>
            </h3>
            <p className="text-gray-600 mt-1">{result.snippet}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
