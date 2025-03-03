"use client";

import { useState, useEffect } from "react";
import { Exercise, ExerciseFilters } from "../types/exercise";
import { fetchExercises, checkApiStatus } from "../services/api";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSidebar";
import ExerciseGrid from "../components/ExerciseGrid";
import ExerciseDetail from "../components/ExerciseDetail";
import LoadingSpinner from "../components/LoadingSpinner";

const initialFilters: ExerciseFilters = {
  categories: [],
  difficulty: [],
  muscleGroups: [],
  equipment: [],
  searchQuery: "",
};

export default function Home() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [filters, setFilters] = useState<ExerciseFilters>(initialFilters);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check API status first
        const status = await checkApiStatus();
        console.log("API Status:", status);

        // If status check passes, load exercises
        const data = await fetchExercises();
        setExercises(data);
        setFilteredExercises(data);
      } catch (err) {
        console.error("Initialization error:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load exercises. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
    let filtered = [...exercises];

    // Apply category filters
    if (filters.categories.length > 0) {
      filtered = filtered.filter((exercise) =>
        filters.categories.includes(exercise.category)
      );
    }

    // Apply difficulty filters
    if (filters.difficulty.length > 0) {
      filtered = filtered.filter((exercise) =>
        filters.difficulty.includes(exercise.difficulty)
      );
    }

    // Apply muscle group filters
    if (filters.muscleGroups.length > 0) {
      filtered = filtered.filter((exercise) =>
        exercise.muscleGroups.primary.some((muscle) =>
          filters.muscleGroups.includes(muscle)
        )
      );
    }

    // Apply equipment filters
    if (filters.equipment.length > 0) {
      filtered = filtered.filter((exercise) =>
        exercise.equipment.some((item) => filters.equipment.includes(item))
      );
    }

    // Apply search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(query) ||
          exercise.muscleGroups.primary.some((muscle) =>
            muscle.toLowerCase().includes(query)
          ) ||
          exercise.equipment.some((item) => item.toLowerCase().includes(query))
      );
    }

    setFilteredExercises(filtered);
  }, [exercises, filters]);

  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const handleFilterChange = (newFilters: ExerciseFilters) => {
    setFilters(newFilters);
  };

  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsDetailOpen(true);
  };

  return (
    <main className="min-h-screen bg-dark">
      {/* Header */}
      <header className="bg-dark-lighter shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-3xl font-bold text-white">
              Fitness Exercise Library
            </h1>
            <SearchBar
              onSearch={handleSearch}
              onSelectExercise={handleExerciseClick}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-8">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <LoadingSpinner />
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-red-500">{error}</div>
              </div>
            ) : (
              <ExerciseGrid
                exercises={filteredExercises}
                onExerciseClick={handleExerciseClick}
              />
            )}
          </div>
        </div>
      </div>

      {/* Exercise Detail Modal */}
      <ExerciseDetail
        exercise={selectedExercise}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </main>
  );
}
