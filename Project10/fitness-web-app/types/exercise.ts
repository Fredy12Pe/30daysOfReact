export type Exercise = {
  id: string;
  name: string;
  category: 'back' | 'cardio' | 'chest' | 'lower arms' | 'lower legs' | 'neck' | 'shoulders' | 'upper arms' | 'upper legs' | 'waist';
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  muscleGroups: {
    primary: MuscleGroup[];
    secondary: MuscleGroup[];
  };
  equipment: Equipment[];
  instructions: string[];
  videoUrl: string;
  thumbnailUrl: string;
  gifUrl: string;
  duration: number; // in seconds
  calories: number; // estimated calories burned in 1 minute
  rating: number;
  ratingCount: number;
};

export type MuscleGroup = 'Chest' | 'Back' | 'Shoulders' | 'Arms' | 'Legs' | 'Core' | 'Full Body';

export type Equipment = 'None' | 'Dumbbells' | 'Barbell' | 'Kettlebell' | 'Resistance Bands' | 'Yoga Mat' | 'Pull-up Bar' | 'Bench';

export interface ExerciseFilters {
  categories: Exercise['category'][];
  difficulty: Exercise['difficulty'][];
  muscleGroups: MuscleGroup[];
  equipment: Equipment[];
  searchQuery: string;
}

export interface ExerciseState {
  exercises: Exercise[];
  filteredExercises: Exercise[];
  filters: ExerciseFilters;
  selectedExercise: Exercise | null;
  loading: boolean;
  error: string | null;
} 