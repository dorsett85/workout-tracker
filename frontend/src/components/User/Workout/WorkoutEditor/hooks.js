import { useEffect } from 'react';
import { getFetch } from 'api/';


export function useInitialData(userId, workoutId, callback) {
  useEffect(() => {
    if (userId) {
      getFetch({
        url: `/api/workout/results/${workoutId}`,
        success: data => callback(data)
      });
    } else {
      callback([]);
    }
  }, []);
}

export function useAddExercise(callback) {
  callback();
}
