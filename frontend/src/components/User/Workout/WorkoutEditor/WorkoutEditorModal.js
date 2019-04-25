import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { editWorkout } from 'state/actions';
import lazyLoad from '../../../UI/lazyLoad';


const mapStateToProps = ({ workouts: { workouts, editingWorkoutId } }) => (
  { workouts, editingWorkoutId }
);

const mapDispatchToProps = dispatch => (
  { unsetEditWorkout: () => dispatch(editWorkout()) }
);

const WorkoutEditorModal = (props) => {
  const { workouts, editingWorkoutId, unsetEditWorkout } = props;
  const [name, setName] = useState(null);
  const [workoutEditor, setWorkoutEditor] = useState(null);

  // Add component functions
  const handleOnShow = () => {
    const workoutTmp = workouts.find(workout => workout.id === editingWorkoutId);
    setName(workoutTmp.name);
    
    // Lazy load the workout editor
    const WorkoutEditor = lazyLoad(import('./WorkoutEditor'));
    setWorkoutEditor(WorkoutEditor);
  };

  // Make sure to remove the workout editor before unsetting the editing workout id
  const handleOnHide = () => {
    setWorkoutEditor(null);
    unsetEditWorkout();
  };

  return (
    <Modal show={Boolean(editingWorkoutId)} onHide={handleOnHide} onShow={handleOnShow}>
      <Modal.Header closeButton>
        <Modal.Title>
          {name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {workoutEditor}
      </Modal.Body>
    </Modal>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutEditorModal);

WorkoutEditorModal.propTypes = {
  workouts: PropTypes.arrayOf(PropTypes.object).isRequired,
  editingWorkoutId: PropTypes.number,
  unsetEditWorkout: PropTypes.func.isRequired
};

WorkoutEditorModal.defaultProps = {
  editingWorkoutId: undefined
};
