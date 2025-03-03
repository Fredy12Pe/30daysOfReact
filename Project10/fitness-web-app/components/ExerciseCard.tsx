import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Exercise } from "../types/exercise";
import { StarIcon, ClockIcon, FireIcon } from "@heroicons/react/24/outline";

interface ExerciseCardProps {
  exercise: Exercise;
  onClick: (exercise: Exercise) => void;
}

export default function ExerciseCard({ exercise, onClick }: ExerciseCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Strength":
        return "bg-primary-dark";
      case "Cardio":
        return "bg-secondary-dark";
      case "Flexibility":
        return "bg-purple-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <motion.div
      className="relative bg-dark-lighter rounded-xl overflow-hidden cursor-pointer"
      variants={cardVariants}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onClick(exercise)}
    >
      <div className="relative h-48 w-full">
        {isHovered ? (
          <div className="absolute inset-0">
            <Image
              src={exercise.gifUrl}
              alt={exercise.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <Image
            src={exercise.thumbnailUrl}
            alt={exercise.name}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute top-2 right-2">
          <span
            className={`px-2 py-1 rounded-md text-xs text-white ${getCategoryColor(
              exercise.category
            )}`}
          >
            {exercise.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
          {exercise.name}
        </h3>

        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center">
            <StarIcon className="w-4 h-4 mr-1 text-yellow-500" />
            <span>{exercise.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="w-4 h-4 mr-1" />
            <span>{Math.floor(exercise.duration / 60)}m</span>
          </div>
          <div className="flex items-center">
            <FireIcon className="w-4 h-4 mr-1 text-orange-500" />
            <span>{exercise.calories}</span>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex flex-wrap gap-1">
            {exercise.muscleGroups.primary.slice(0, 2).map((muscle) => (
              <span
                key={muscle}
                className="px-2 py-1 text-xs bg-dark rounded-md text-gray-300"
              >
                {muscle}
              </span>
            ))}
            {exercise.muscleGroups.primary.length > 2 && (
              <span className="px-2 py-1 text-xs bg-dark rounded-md text-gray-300">
                +{exercise.muscleGroups.primary.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
