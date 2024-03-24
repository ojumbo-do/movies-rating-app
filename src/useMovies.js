import { useEffect, useState } from "react";

const API_KEY = "45145fd9";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // callback?.();

    //Abbort controller API helps cleanup the useEffect it is a browser API
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!response.ok)
          throw new Error("Something went wrong while fetching movies");

        const data = await response.json();

        if (data.Response === "False") throw new Error("Movie(s) not found");

        setMovies(data.Search);
        setError("");
      } catch (err) {
        console.error(err.message);

        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
    }

    // handleCloseMovie();
    fetchMovies();
    return () => controller.abort();
  }, [query]);

  return { movies, isLoading, error };
}
