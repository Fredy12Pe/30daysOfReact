import { motion } from "framer-motion";
import { Exercise } from "../types/exercise";
import ExerciseCard from "./ExerciseCard";

interface ExerciseGridProps {
  exercises: Exercise[];
  onExerciseClick: (exercise: Exercise) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ExerciseGrid({
  exercises,
  onExerciseClick,
}: ExerciseGridProps) {
  // Group exercises by category
  const exercisesByCategory = exercises.reduce((acc, exercise) => {
    const category = exercise.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(exercise);
    return acc;
  }, {} as Record<string, Exercise[]>);

  return (
    <div className="space-y-8">
      {Object.entries(exercisesByCategory).map(
        ([category, categoryExercises]) => (
          <section key={category}>
            <h2 className="text-2xl font-bold text-white mb-4">{category}</h2>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {categoryExercises.map((exercise) => (
                <motion.div key={exercise.id} variants={item}>
                  <ExerciseCard exercise={exercise} onClick={onExerciseClick} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        )
      )}

      {exercises.length === 0 && (
        <div className="text-center py-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400"
          >
            No exercises found. Try adjusting your filters.
          </motion.div>
        </div>
      )}
    </div>
  );
}
