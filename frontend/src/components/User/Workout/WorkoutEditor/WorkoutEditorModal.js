import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { setCurrentWorkout } from 'state/actions';
import lazyLoad from '../../../UI/lazyLoad';


const mapStateToProps = ({ workouts: { currentWorkout } }) => (
  { currentWorkout }
);

const mapDispatchToProps = dispatch => (
  {
    unsetCurrent: bool => dispatch(setCurrentWorkout(bool))
  }
);

const WorkoutEditorModal = (props) => {
  const { unsetCurrent, currentWorkout } = props;
  const [name, setName] = useState(null);
  const [workoutEditor, setWorkoutEditor] = useState(null);
  useEffect(() => {
    if (currentWorkout) {
      setName(currentWorkout.name);
      setWorkoutEditor(lazyLoad(import('./WorkoutEditor')));
    }
  }, [currentWorkout]);

  // Make sure to remove the workout editor before unsetting the editing workout id
  const handleOnHide = () => {
    setWorkoutEditor(null);
    unsetCurrent();
  };

  return (
    <Modal show={Boolean(currentWorkout)} onHide={handleOnHide} size="xl">
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
  currentWorkout: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }),
  unsetCurrent: PropTypes.func.isRequired
};

WorkoutEditorModal.defaultProps = {
  currentWorkout: undefined
};
