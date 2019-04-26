import { useEffect } from 'react';
import { getFetch } from 'api/';


export function useInitialData(userId, workoutId, callback, deps = []) {
  useEffect(() => {
    if (userId) {
      getFetch({
        url: `/api/workout/${workoutId}`,
        success: data => callback(data)
      });
    } else {
      callback([]);
    }
  }, deps);
}

export function useAddExercise(callback) {
  callback();
}
