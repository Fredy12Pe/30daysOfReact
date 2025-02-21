import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieModal from "./components/MovieModal";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch popular movies
  const fetchPopularMovies = async (pageNum) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_TMDB_BASE_URL}/movie/popular`,
        {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            page: pageNum,
          },
        }
      );

      const newMovies = response.data.results;
      setMovies((prev) =>
        pageNum === 1 ? newMovies : [...prev, ...newMovies]
      );
      setHasMore(response.data.page < response.data.total_pages);
      setIsLoading(false);
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    setIsLoading(true);
    fetchPopularMovies(1);
  }, []);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (isLoading || !hasMore || searchQuery) return;

    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      setIsLoading(true);
      setPage((prev) => prev + 1);
      fetchPopularMovies(page + 1);
    }
  }, [isLoading, hasMore, page, searchQuery]);

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Search effect - modified to work properly
  useEffect(() => {
    const searchMovies = async () => {
      if (!searchQuery.trim()) {
        // Reset to popular movies when search is cleared
        setPage(1);
        fetchPopularMovies(1);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_TMDB_BASE_URL}/search/movie`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              query: searchQuery,
              page: 1,
            },
          }
        );
        setMovies(response.data.results);
        setHasMore(false); // Disable infinite scroll for search results
      } catch (err) {
        setError("Failed to fetch movies. Please try again.");
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimeout = setTimeout(searchMovies, 500);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const handleSearchChange = (newQuery) => {
    setSearchQuery(newQuery);
    setPage(1); // Reset page when search changes
    setHasMore(true); // Reset hasMore
  };

  return (
    <div className="min-h-screen w-screen bg-gray-900">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          Movie Search
        </h1>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={handleSearchChange}
        />
        <MovieList
          movies={movies}
          onMovieClick={setSelectedMovie}
          isLoading={isLoading}
          error={error}
        />
        {selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
