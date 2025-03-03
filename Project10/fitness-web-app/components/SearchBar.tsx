import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { Exercise } from "../types/exercise";
import { searchExercises } from "../services/api";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onSelectExercise: (exercise: Exercise) => void;
}

export default function SearchBar({
  onSearch,
  onSelectExercise,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await searchExercises(query);
        setSuggestions(results.slice(0, 5));
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (exercise: Exercise) => {
    setQuery(exercise.name);
    onSelectExercise(exercise);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search exercises by name, muscle group, or equipment..."
          className="w-full h-12 pl-12 pr-4 text-white bg-dark-lighter rounded-xl border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
        />
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      </form>

      <AnimatePresence>
        {showSuggestions && (query.length >= 2 || suggestions.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full mt-2 bg-dark-lighter rounded-xl shadow-lg border border-gray-700 overflow-hidden z-50"
          >
            {isLoading ? (
              <div className="p-4 text-gray-400 text-center">Loading...</div>
            ) : suggestions.length > 0 ? (
              <ul>
                {suggestions.map((exercise) => (
                  <li
                    key={exercise.id}
                    onClick={() => handleSuggestionClick(exercise)}
                    className="px-4 py-3 hover:bg-dark cursor-pointer border-b border-gray-700 last:border-0"
                  >
                    <div className="text-white">{exercise.name}</div>
                    <div className="text-sm text-gray-400">
                      {exercise.muscleGroups.primary.join(", ")}
                    </div>
                  </li>
                ))}
              </ul>
            ) : query.length >= 2 ? (
              <div className="p-4 text-gray-400 text-center">
                No exercises found
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
