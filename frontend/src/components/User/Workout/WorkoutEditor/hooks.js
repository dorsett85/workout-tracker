import { useEffect } from 'react';
import { getFetch } from 'api/';


export function useInitialData(workoutId, callback) {
  useEffect(() => {
    getFetch({
      url: `/api/workout/results/${workoutId}`,
      success: data => callback(data)
    });
  }, []);
}

export function useAddExercise(callback) {
  callback();
}
