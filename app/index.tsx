import React from 'react';
import { useWorkoutContext } from '../context/WorkoutContext';
import { useRouter } from 'expo-router';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

export default function Index() {
  const { workouts } = useWorkoutContext();
  const router = useRouter();

  return (
    <View style={{ padding: 16 }}>
      <FlatList
        style={styles.listContainer}
        data={workouts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text >{item.exercise} - {item.weight}kg</Text>
            <Button title="View" onPress={() => router.push(`/workout/${item.id}`)} />
          </View>
        )}
        ListEmptyComponent={() => <Text >There are no workouts logged</Text>}
      />
      <Button title="Add Workout" onPress={() => router.push('/workout/new')} />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: 'black',
    marginBottom: 20,
    borderRadius: 2,
    padding: 10
  }
})
