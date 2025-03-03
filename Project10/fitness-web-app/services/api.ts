import { Exercise, ExerciseFilters } from '../types/exercise';

const API_URL = 'https://exercisedb.p.rapidapi.com';

const headers = {
  'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
  'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPIDAPI_HOST!
};

// Check API Status
export const checkApiStatus = async () => {
  try {
    console.log('Checking API status with headers:', {
      ...headers,
      'X-RapidAPI-Key': '***' // Hide the actual key in logs
    });
    
    const response = await fetch(`${API_URL}/status`, { 
      headers,
      method: 'GET'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API Response:', data);
    return data;
  } catch (error) {
    console.error('Error checking API status:', error);
    throw error;
  }
};

export const fetchExercises = async (filters?: ExerciseFilters): Promise<Exercise[]> => {
  try {
    const response = await fetch(`${API_URL}/exercises`, { headers });
    const data = await response.json();
    
    console.log('Raw API response:', data[0]);
    
    return data.map((exercise: any) => {
      console.log('Processing exercise:', {
        name: exercise.name,
        bodyPart: exercise.bodyPart,
        target: exercise.target,
        equipment: exercise.equipment
      });
      
      return {
        id: exercise.id,
        name: exercise.name,
        category: exercise.bodyPart as Exercise['category'],
        description: `${exercise.name} targeting ${exercise.target}`,
        difficulty: 'Intermediate', // ExerciseDB doesn't provide difficulty
        muscleGroups: {
          primary: [mapMuscleGroup(exercise.target)],
          secondary: exercise.secondaryMuscles?.map(mapMuscleGroup) || [],
        },
        equipment: [mapEquipment(exercise.equipment)],
        instructions: exercise.instructions,
        videoUrl: '', // ExerciseDB doesn't provide videos
        thumbnailUrl: exercise.gifUrl, // Using gif as thumbnail
        gifUrl: exercise.gifUrl,
        duration: 45, // Default duration
        calories: 150, // Default calories
        rating: 4.5, // Default rating
        ratingCount: 100, // Default rating count
      };
    });
  } catch (error) {
    console.error('Error fetching exercises:', error);
    throw error;
  }
};

export const fetchExerciseById = async (id: string): Promise<Exercise> => {
  try {
    const response = await fetch(`${API_URL}/exercises/exercise/${id}`, { headers });
    const exercise = await response.json();
    
    return {
      id: exercise.id,
      name: exercise.name,
      category: exercise.bodyPart as Exercise['category'],
      description: `${exercise.name} targeting ${exercise.target}`,
      difficulty: 'Intermediate',
      muscleGroups: {
        primary: [mapMuscleGroup(exercise.target)],
        secondary: exercise.secondaryMuscles?.map(mapMuscleGroup) || [],
      },
      equipment: [mapEquipment(exercise.equipment)],
      instructions: exercise.instructions,
      videoUrl: '',
      thumbnailUrl: exercise.gifUrl,
      gifUrl: exercise.gifUrl,
      duration: 45,
      calories: 150,
      rating: 4.5,
      ratingCount: 100,
    };
  } catch (error) {
    console.error('Error fetching exercise:', error);
    throw error;
  }
};

export const searchExercises = async (query: string): Promise<Exercise[]> => {
  try {
    const response = await fetch(`${API_URL}/exercises/name/${query}`, { headers });
    const data = await response.json();
    
    return data.map((exercise: any) => ({
      id: exercise.id,
      name: exercise.name,
      category: exercise.bodyPart as Exercise['category'],
      description: `${exercise.name} targeting ${exercise.target}`,
      difficulty: 'Intermediate',
      muscleGroups: {
        primary: [mapMuscleGroup(exercise.target)],
        secondary: exercise.secondaryMuscles?.map(mapMuscleGroup) || [],
      },
      equipment: [mapEquipment(exercise.equipment)],
      instructions: exercise.instructions,
      videoUrl: '',
      thumbnailUrl: exercise.gifUrl,
      gifUrl: exercise.gifUrl,
      duration: 45,
      calories: 150,
      rating: 4.5,
      ratingCount: 100,
    }));
  } catch (error) {
    console.error('Error searching exercises:', error);
    throw error;
  }
};

// Helper functions to map API values to our enum types
const mapMuscleGroup = (muscle: string): Exercise['muscleGroups']['primary'][0] => {
  if (!muscle) return 'Full Body';
  
  const muscleMap: Record<string, Exercise['muscleGroups']['primary'][0]> = {
    'chest': 'Chest',
    'back': 'Back',
    'shoulders': 'Shoulders',
    'upper arms': 'Arms',
    'lower arms': 'Arms',
    'upper legs': 'Legs',
    'lower legs': 'Legs',
    'waist': 'Core',
    'cardio': 'Full Body',
  };
  return muscleMap[muscle.toLowerCase()] || 'Full Body';
};

const mapEquipment = (equipment: string): Exercise['equipment'][0] => {
  if (!equipment) return 'None';
  
  const equipmentMap: Record<string, Exercise['equipment'][0]> = {
    'body weight': 'None',
    'dumbbell': 'Dumbbells',
    'barbell': 'Barbell',
    'kettlebell': 'Kettlebell',
    'cable': 'Resistance Bands',
    'band': 'Resistance Bands',
    'yoga mat': 'Yoga Mat',
    'pull-up bar': 'Pull-up Bar',
    'bench': 'Bench',
  };
  return equipmentMap[equipment.toLowerCase()] || 'None';
}; 