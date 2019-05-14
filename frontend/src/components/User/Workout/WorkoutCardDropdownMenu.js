import React, { useState, useEffect, memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, InputGroup, Button, ButtonGroup } from 'react-bootstrap';
import { updateWorkoutName, updateWorkoutNotes, deleteWorkout } from 'state/actions';
import { updateFetch, deleteFetch } from 'api';
import debounce from 'assets/js/functions/debounce';
import appStyles from 'assets/css/app.scss';
import styles from './workout.scss';
import FormInput from '../../UI/FormInput';


const mapStateToProps = ({ user: { id: userId }, workouts: { workouts } }, { id }) => {
  const thisWorkout = workouts.find(workout => workout.id === id);
  return { userId, ...thisWorkout };
};

const mapDispatchToProps = dispatch => (
  {
    renameWorkout: workout => dispatch(updateWorkoutName(workout)),
    updateNotes: notes => dispatch(updateWorkoutNotes(notes)),
    removeWorkout: id => dispatch(deleteWorkout(id))
  }
);

const WorkoutCardDropdownMenu = React.forwardRef((props, _) => {
  const {
    userId, id, name, notes, className, show, close, renameWorkout, updateNotes, removeWorkout
  } = props;
  const [workoutName, setWorkoutName] = useState('');
  const [isInvalidWorkoutName, setIsInvalidWorkoutName] = useState(false);
  const [workoutNotes, setWorkoutNotes] = useState(notes || '');
  const [updatingWorkoutNotes, setUpdatingWorkoutNotes] = useState(false);
  const [updateNewWorkoutNotes, setUpdateNewWorkoutNotes] = useState(false);
  const [updatedWorkoutNotes, setUpdatedWorkoutNotes] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Create effect for when the dropdown is shown or not
  useEffect(() => {
    if (!show) {
      setWorkoutName('');
      setUpdatedWorkoutNotes(false);
      setConfirmDelete(false);
    }
  }, [show]);

  const handleClose = () => close();

  const handleRename = (e) => {
    setIsInvalidWorkoutName(false);
    setWorkoutName(e.target.value);
  };

  const handleSubmitWorkoutName = (e) => {
    e.preventDefault();
    if (!workoutName) { return; }
    if (userId) {
      updateFetch({
        url: '/api/workout',
        body: { id, workoutName },
        success: (res) => {
          if (res) {
            renameWorkout({ id, workoutName });
            setWorkoutName('');
          } else {
            setIsInvalidWorkoutName(true);
          }
        }
      });
    } else {
      renameWorkout({ id, workoutName });
      setWorkoutName('');
    }
  };

  // Handler for notes change, use debounce to only update after a timeout
  const handleUpdateNotes = (e) => {
    setWorkoutNotes(e.target.value);
    setUpdatingWorkoutNotes(true);
    setUpdateNewWorkoutNotes(false);
    setUpdatedWorkoutNotes(false);
    debounce(() => setUpdateNewWorkoutNotes(true), 500);
  };

  // Create an effect for when the notes are ready to update
  useEffect(() => {
    if (updateNewWorkoutNotes) {
      if (userId) {
        updateFetch({
          url: '/api/workout',
          body: { id, workoutNotes },
          success: (res) => {
            if (res) { updateNotes({ id, workoutNotes }); }
            setUpdatingWorkoutNotes(false);
            setUpdatedWorkoutNotes(true);
          }
        });
      } else {
        updateNotes({ id, workoutNotes });
        setUpdatingWorkoutNotes(false);
        setUpdatedWorkoutNotes(true);
      }
    }
  }, [updateNewWorkoutNotes]);

  const handleDeleteClick = () => setConfirmDelete(true);
  const handleCancelDelete = () => setConfirmDelete(false);

  const handleConfirmDelete = () => {
    if (userId) {
      deleteFetch({
        url: '/api/workout',
        body: { id },
        success: () => removeWorkout(id)
      });
    } else {
      removeWorkout(id);
    }
  };

  return (
    <div className={`px-3 ${className} ${styles.workoutCardDropdownMenu}`}>
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <span className={appStyles.breakWord}>{name}</span>
        <Button
          onClick={handleClose}
          variant="outline-dark"
          size="sm"
        >
          &times;
        </Button>
      </div>
      <hr />
      <Form className="my-3" onSubmit={handleSubmitWorkoutName}>
        <InputGroup>
          <Form.Control
            autoFocus
            size="sm"
            isInvalid={isInvalidWorkoutName}
            onChange={handleRename}
            placeholder="Rename..."
            value={workoutName}
          />
          {workoutName && (
            <>
              <InputGroup.Append>
                <Button
                  type="submit"
                  variant="outline-success"
                  size="sm"
                >
                  {'✓'}
                </Button>
              </InputGroup.Append>
              <Form.Control.Feedback type="invalid">
                {'Enter unique name'}
              </Form.Control.Feedback>
            </>
          )}
        </InputGroup>
      </Form>
      <FormInput
        isValid={updatedWorkoutNotes || null}
        onChange={handleUpdateNotes}
        label="Notes"
        isUpdating={updatingWorkoutNotes}
        size="sm"
        as="textarea"
        rows={3}
        value={workoutNotes}
      />
      {!confirmDelete
        ? (
          <Button
            onClick={handleDeleteClick}
            variant="danger"
            size="sm"
            block
          >
            {'Delete'}
          </Button>
        )
        : (
          <div className="d-flex flex-column">
            <ButtonGroup size="sm">
              <Button
                onClick={handleConfirmDelete}
                variant="danger"
              >
                {'Delete!'}
              </Button>
              <Button
                onClick={handleCancelDelete}
                variant="light"
              >
                {'Cancel'}
              </Button>
            </ButtonGroup>
          </div>
        )
      }
    </div>
  );
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(WorkoutCardDropdownMenu));

WorkoutCardDropdownMenu.propTypes = {
  userId: PropTypes.number,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  notes: PropTypes.string,
  className: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  renameWorkout: PropTypes.func.isRequired,
  updateNotes: PropTypes.func.isRequired,
  removeWorkout: PropTypes.func.isRequired
};

WorkoutCardDropdownMenu.defaultProps = {
  userId: undefined,
  notes: undefined
};
