import axios from "axios";

export async function GET(req) {
  const url = new URL(req.url);
  const query = url.searchParams.get("query"); // Get the search query from the URL

  if (!query) {
    return new Response(JSON.stringify({ error: "Query is required" }), {
      status: 400,
    });
  }

  const apiKey = process.env.BRAVE_API_KEY;

  try {
    const response = await axios.get(
      "https://api.search.brave.com/res/v1/web/search",
      {
        params: {
          q: query, // Add the search query as a parameter
        },
        headers: {
          Accept: "application/json", // Request JSON response
          "Accept-Encoding": "gzip", // Enable gzip compression
          "X-Subscription-Token": apiKey, // Subscription token for Brave Search API
        },
      }
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error: "Error fetching search results from Brave Search",
      }),
      {
        status: 500,
      }
    );
  }
}
