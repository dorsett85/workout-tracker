import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { editWorkout } from 'state/actions';


const mapStateToProps = ({ workouts: { editingWorkoutId } }) => (
  { editingWorkoutId }
);

const mapDispatchToProps = dispatch => (
  { unsetEditWorkout: () => dispatch(editWorkout()) }
);

const WorkoutEditModal = (props) => {
  const { editingWorkoutId, unsetEditWorkout } = props;
  return (
    <Modal show={Boolean(editingWorkoutId)} onHide={unsetEditWorkout}>
      <Modal.Header closeButton>
        <Modal.Title>{editingWorkoutId}</Modal.Title>
      </Modal.Header>
    </Modal>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutEditModal);

WorkoutEditModal.propTypes = {
  editingWorkoutId: PropTypes.number,
  unsetEditWorkout: PropTypes.func.isRequired
};

WorkoutEditModal.defaultProps = {
  editingWorkoutId: undefined
};
