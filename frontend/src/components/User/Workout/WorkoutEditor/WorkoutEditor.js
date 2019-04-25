import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const mapStateToProps = ({ workouts: { workouts, editingWorkoutId } }) => {
  const workout = workouts.find(workoutInfo => workoutInfo.id === editingWorkoutId);
  return { workout };
};

const WorkoutEditor = (props) => {
  const { workout: { created } } = props;
  return (
    <div>{created.toDateString()}</div>
  );
};

export default connect(mapStateToProps)(WorkoutEditor);

WorkoutEditor.propTypes = {
  workout: PropTypes.object.isRequired
};
