import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Workout = {
  id: number;
  exercise: string;
  weight: number | null;
  reps: number | null;
  sets: number | null;
  notes: string;
};

export type WorkoutContextType = {
  workouts: Workout[];
  addWorkout: (workout: Workout) => void;
  updateWorkout: (id: number, updatedWorkout: Workout) => void;
  deleteWorkout: (id: number) => void;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const loadWorkouts = async () => {
      const storedWorkouts = await AsyncStorage.getItem('workouts');
      if (storedWorkouts) setWorkouts(JSON.parse(storedWorkouts));
    };
    loadWorkouts();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('workouts', JSON.stringify(workouts));
  }, [workouts]);

  const addWorkout = (workout: Workout) => {
    setWorkouts([...workouts, { ...workout, id: Date.now() }]);
  };

  const updateWorkout = (id: number, updatedWorkout: Workout) => {
    setWorkouts(workouts.map((w) => (w.id === id ? { ...updatedWorkout, id } : w)));
  };

  const deleteWorkout = (id: number) => {
    setWorkouts(workouts.filter((w) => w.id !== id));
  };

  return (
    <WorkoutContext.Provider value={{ workouts, addWorkout, updateWorkout, deleteWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkoutContext must be used within a WorkoutProvider');
  }
  return context;
};


export { WorkoutContext };