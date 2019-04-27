import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Alert } from 'react-bootstrap';
import { setCurrentWorkout } from 'state/actions';
import lazyLoad from '../../../UI/lazyLoad';


const mapStateToProps = ({ user: { id: userId }, workouts: { currentWorkout } }) => (
  { userId, currentWorkout }
);

const mapDispatchToProps = dispatch => (
  {
    unsetCurrent: bool => dispatch(setCurrentWorkout(bool))
  }
);

const WorkoutEditorModal = (props) => {
  const { userId, unsetCurrent, currentWorkout } = props;
  const [name, setName] = useState(null);
  const [workoutEditor, setWorkoutEditor] = useState(null);
  useEffect(() => {
    if (currentWorkout) {
      setName(currentWorkout.name);

      // End of the line for non-users!!
      if (userId) {
        setWorkoutEditor(lazyLoad(import('./WorkoutEditor')));
      } else {
        setWorkoutEditor(
          <Alert variant="danger">
            <Alert.Heading>Sorry!</Alert.Heading>
            <p>Sign in or Register to use this feature</p>
          </Alert>
        );
      }
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
  userId: PropTypes.number,
  currentWorkout: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }),
  unsetCurrent: PropTypes.func.isRequired
};

WorkoutEditorModal.defaultProps = {
  userId: undefined,
  currentWorkout: undefined
};
