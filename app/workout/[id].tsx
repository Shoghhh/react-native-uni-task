import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useWorkoutContext, Workout } from '@/context/WorkoutContext';

export default function WorkoutDetail() {
  const { workouts, deleteWorkout } = useWorkoutContext();
  const { id } = useLocalSearchParams();
  const workout = workouts.find((w: Workout) => w.id.toString() === id);
  const router = useRouter();

  if (!workout) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workout.exercise} {"\n"}</Text>
      <Text style={styles.description}>Weight: {workout.weight} kg </Text>
      <Text style={styles.description}>Reps: {workout.reps} </Text>
      <Text style={styles.description}>Sets: {workout.sets}</Text>
      <Text style={styles.description}>Notes: {workout.notes}</Text>
      <Button title="Edit" onPress={() => workout.id && router.push(`/workout/new?workoutId=${workout.id}?name=${workout.exercise}`,)} />
      <Button title="Delete" onPress={() => { deleteWorkout(+id); router.back(); }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  title: {
    fontSize: 25,
    textAlign: 'center'
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 15,
    padding: 5,
    borderColor: 'grey',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    verticalAlign: 'middle',
    justifyContent: 'center'
  }
})
