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
  const googoo = ["G", "O", "O", "G", "O", "O"];
  const googooColor = [
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
      <div className="flex flex-row">
        {googoo.map((letter, index) => (
          <p
            key={index}
            className="text-7xl font-bold"
            style={{ color: googooColor[index] }}
          >
            {letter}
          </p>
        ))}
      </div>
      <form onSubmit={handleSearch}>
        <div className="space-x-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="rounded-full border border-gray-300 w-96 px-4 py-2 text-black"
          />
          <button
            className="text-black rounded-full border border-gray-300 w-20 px-4 py-2"
            type="submit"
            disabled={loading}
          >
            {loading ? "..." : "Search"}
          </button>
        </div>
      </form>
      {error && <p>{error}</p>}
      <div>
        {results?.web?.results?.map((result, index) => (
          <div key={index}>
            <h3>
              <a
                className="text-blue-500 underline"
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {result.title}
              </a>
            </h3>
            <p className="text-black">{result.snippet}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
