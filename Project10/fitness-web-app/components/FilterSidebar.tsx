import { Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import {
  ExerciseFilters,
  ExerciseCategory,
  DifficultyLevel,
  MuscleGroup,
  Equipment,
  Exercise,
} from "../types/exercise";

interface FilterSidebarProps {
  filters: ExerciseFilters;
  onFilterChange: (filters: ExerciseFilters) => void;
}

const CATEGORIES: Exercise["category"][] = [
  "back",
  "cardio",
  "chest",
  "lower arms",
  "lower legs",
  "neck",
  "shoulders",
  "upper arms",
  "upper legs",
  "waist",
];

const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];

const MUSCLE_GROUPS = [
  "Chest",
  "Back",
  "Shoulders",
  "Arms",
  "Legs",
  "Core",
  "Full Body",
];

const EQUIPMENT = [
  "None",
  "Dumbbells",
  "Barbell",
  "Kettlebell",
  "Resistance Bands",
  "Yoga Mat",
  "Pull-up Bar",
  "Bench",
];

export default function FilterSidebar({
  filters,
  onFilterChange,
}: FilterSidebarProps) {
  const handleCategoryChange = (category: Exercise["category"]) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleDifficultyChange = (difficulty: Exercise["difficulty"]) => {
    const newDifficulties = filters.difficulty.includes(difficulty)
      ? filters.difficulty.filter((d) => d !== difficulty)
      : [...filters.difficulty, difficulty];
    onFilterChange({ ...filters, difficulty: newDifficulties });
  };

  const handleMuscleGroupChange = (muscleGroup: string) => {
    const newMuscleGroups = filters.muscleGroups.includes(muscleGroup)
      ? filters.muscleGroups.filter((m) => m !== muscleGroup)
      : [...filters.muscleGroups, muscleGroup];
    onFilterChange({ ...filters, muscleGroups: newMuscleGroups });
  };

  const handleEquipmentChange = (equipment: string) => {
    const newEquipment = filters.equipment.includes(equipment)
      ? filters.equipment.filter((e) => e !== equipment)
      : [...filters.equipment, equipment];
    onFilterChange({ ...filters, equipment: newEquipment });
  };

  const formatLabel = (str: string) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="w-64 bg-dark-lighter p-4 rounded-xl">
      <div className="space-y-4">
        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
          <div className="space-y-2">
            {CATEGORIES.map((category) => (
              <label
                key={category}
                className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="rounded border-gray-600 text-primary focus:ring-primary bg-dark"
                />
                <span>{formatLabel(category)}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Difficulty</h3>
          <div className="space-y-2">
            {DIFFICULTIES.map((difficulty) => (
              <label
                key={difficulty}
                className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.difficulty.includes(difficulty)}
                  onChange={() => handleDifficultyChange(difficulty)}
                  className="rounded border-gray-600 text-primary focus:ring-primary bg-dark"
                />
                <span>{difficulty}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Muscle Groups */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Muscle Groups
          </h3>
          <div className="space-y-2">
            {MUSCLE_GROUPS.map((muscleGroup) => (
              <label
                key={muscleGroup}
                className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.muscleGroups.includes(muscleGroup)}
                  onChange={() => handleMuscleGroupChange(muscleGroup)}
                  className="rounded border-gray-600 text-primary focus:ring-primary bg-dark"
                />
                <span>{muscleGroup}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Equipment */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Equipment</h3>
          <div className="space-y-2">
            {EQUIPMENT.map((item) => (
              <label
                key={item}
                className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.equipment.includes(item)}
                  onChange={() => handleEquipmentChange(item)}
                  className="rounded border-gray-600 text-primary focus:ring-primary bg-dark"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
