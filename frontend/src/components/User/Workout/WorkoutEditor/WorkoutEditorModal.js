import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Alert } from 'react-bootstrap';
import { setCurrentWorkout } from 'state/actions';
import lazyLoad from '../../../UI/lazyLoad';


const mapStateToProps = ({ user: { id: userId }, workouts: { currentWorkout } }) => (
  { userId, ...currentWorkout }
);

const mapDispatchToProps = dispatch => (
  {
    unsetCurrent: () => dispatch(setCurrentWorkout())
  }
);

const WorkoutEditorModal = (props) => {
  const { userId, unsetCurrent, id, name } = props;
  const [workoutEditor, setWorkoutEditor] = useState(null);
  useEffect(() => {
    if (id) {
      // End of the line for non-users!!
      setWorkoutEditor(userId
        ? lazyLoad(import('./WorkoutEditor'))
        : (
          <Alert variant="danger">
            <Alert.Heading>Sorry!</Alert.Heading>
            <p>Sign in or Register to use this feature</p>
          </Alert>
        ));
    }
  }, [id]);

  // Make sure to remove the workout editor before unsetting the editing workout id
  const handleOnHide = () => {
    setWorkoutEditor(null);
    unsetCurrent();
  };

  return (
    <Modal show={Boolean(id)} onHide={handleOnHide} size="xl">
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
  id: PropTypes.number,
  name: PropTypes.string,
  unsetCurrent: PropTypes.func.isRequired
};

WorkoutEditorModal.defaultProps = {
  userId: undefined,
  id: undefined,
  name: undefined
};
