import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
import { useWorkoutContext, Workout } from '../../context/WorkoutContext';

export default function WorkoutForm() {
  const { addWorkout, workouts, updateWorkout } = useWorkoutContext();
  const router = useRouter();

  const { workoutId } = useGlobalSearchParams();

  useEffect(() => {
    if (workoutId) {
      const existingWorkout = workouts.find(w => w.id === +workoutId);
      if (existingWorkout) {
        setWorkout(existingWorkout)
      };
    }
  }, [workoutId]);

  const handleSave = () => {
    if (workoutId) {
      updateWorkout(+workoutId, workout);
    } else {
      addWorkout(workout);
    }
    router.back();
  };

  const [workout, setWorkout] = useState<Workout>({
    id: 0,
    exercise: '',
    weight: null,
    reps: null,
    sets: null,
    notes: ''
  });

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Exercise"
        value={workout.exercise}
        onChangeText={(text) => setWorkout({ ...workout, exercise: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Weight"
        keyboardType="numeric"
        value={workout.weight?.toString() || ''}
        onChangeText={(text) => setWorkout({
          ...workout,
          weight: text ? parseFloat(text) : null
        })}
      />
      <TextInput
        style={styles.input}
        placeholder="Reps"
        keyboardType="numeric"
        value={workout.reps?.toString() || ''}
        onChangeText={(text) => setWorkout({
          ...workout,
          reps: text ? parseInt(text, 10) : null
        })}
      />
      <TextInput
        style={styles.input}
        placeholder="Sets"
        keyboardType="numeric"
        value={workout.sets?.toString() || ''}
        onChangeText={(text) => setWorkout({
          ...workout,
          sets: text ? parseInt(text, 10) : null
        })}
      />
      <TextInput
        style={styles.input}
        placeholder="Notes"
        value={workout.notes}
        onChangeText={(text) => setWorkout({ ...workout, notes: text })}
      />
      <Button title="Save" onPress={handleSave} disabled={!workout.exercise || !workout.weight || !workout.reps || !workout.sets} />

    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 30,
    height: 50,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10
  },
  formContainer: {
    marginHorizontal: 20,
    marginTop: 20
  }
})