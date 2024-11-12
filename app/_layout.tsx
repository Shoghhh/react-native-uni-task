import React from 'react';
import { WorkoutProvider } from '../context/WorkoutContext'; // Adjust path if necessary
import { Stack } from 'expo-router';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WorkoutProvider>
      <Stack>
        <Stack.Screen name="index" options={{
          headerTitle: 'Workout List',
        }} />
        <Stack.Screen
          name="workout/new"
          options={({ route }: { route: any }) => ({
            headerTitle: route.params?.name || 'Add Workout', // Dynamically set based on route params
          })}

        />
        <Stack.Screen
          name="workout/[id]"
          options={({ route }: { route: any }) => ({
            headerTitle: route.params?.name || 'Workout Details', // Dynamically set based on route params
          })}
        />
      </Stack>
    </WorkoutProvider>
  );
}

