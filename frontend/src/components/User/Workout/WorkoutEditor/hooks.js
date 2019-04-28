import { useEffect } from 'react';
import { getFetch } from 'api/';
import { convertQueryData } from './functions';


export function useInitialData(workoutId, callback) {
  useEffect(() => {
    getFetch({
      url: `/api/workout/results/${workoutId}`,
      success: data => callback(convertQueryData(data))
    });
  }, []);
}

export function useAddExercise(callback) {
  callback();
}
