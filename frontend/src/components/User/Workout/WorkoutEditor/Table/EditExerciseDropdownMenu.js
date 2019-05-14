import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Form, InputGroup, Button, ButtonGroup } from 'react-bootstrap';
import { updateFetch, deleteFetch } from 'api';
import debounce from 'assets/js/functions/debounce';
import appStyles from 'assets/css/app.scss';
import styles from '../workoutEditor.scss';
import { convertQueryData } from '../functions';
import { updateExerciseName, updateExerciseNotes, deleteExercise } from '../actions';
import FormInput from '../../../../UI/FormInput';


const EditExerciseDropdownMenu = React.forwardRef((props, _) => {
  const { id, exId, title, exNotes, className, dispatch, show, close } = props;
  const [exName, setExName] = useState('');
  const [isInvalidExName, setIsInvalidExName] = useState(false);
  const [newExNotes, setNewExNotes] = useState(exNotes || '');
  const [updatingExNotes, setUpdatingExNotes] = useState(false);
  const [updateExNotes, setUpdateExNotes] = useState(false);
  const [updatedExNotes, setUpdatedExNotes] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Create effect for when the dropdown is shown or not
  useEffect(() => {
    if (!show) {
      setExName('');
      setUpdatedExNotes(false);
      setConfirmDelete(false);
    }
  }, [show]);

  const handleClose = () => close();

  const handleRename = (e) => {
    setIsInvalidExName(false);
    setExName(e.target.value);
  };

  const handleSubmitExName = (e) => {
    e.preventDefault();
    if (!exName) { return; }
    updateFetch({
      url: '/api/workout/exercise',
      body: { exId, exName },
      success: (res) => {
        if (res) {
          dispatch(updateExerciseName({ exId, exName }));
          setExName('');
        } else {
          setIsInvalidExName(true);
        }
      }
    });
  };

  // Handler for notes change, use debounce to only update after a timeout
  const handleUpdateNotes = (e) => {
    setNewExNotes(e.target.value);
    setUpdatingExNotes(true);
    setUpdateExNotes(false);
    setUpdatedExNotes(false);
    debounce(() => setUpdateExNotes(true), 500);
  };

  // Create an effect for when the notes are ready to update
  useEffect(() => {
    if (updateExNotes) {
      updateFetch({
        url: '/api/workout/exercise',
        body: { exId, exNotes: newExNotes },
        success: (res) => {
          if (res) { dispatch(updateExerciseNotes({ exId, exNotes })); }
          setUpdatingExNotes(false);
          setUpdatedExNotes(true);
        }
      });
    }
  }, [updateExNotes]);

  const handleDeleteClick = () => setConfirmDelete(true);
  const handleCancelDelete = () => setConfirmDelete(false);

  const handleConfirmDelete = () => {
    deleteFetch({
      url: '/api/workout/exercise',
      body: { id, exId },
      success: workoutData => dispatch(deleteExercise(convertQueryData(workoutData)))
    });
  };

  return (
    <div className={`px-3 ${className} ${styles.editExerciseDropdownMenu}`}>
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <span className={appStyles.breakWord}>{title}</span>
        <Button
          onClick={handleClose}
          variant="outline-dark"
          size="sm"
        >
          {'x'}
        </Button>
      </div>
      <hr />
      <Form className="my-3" onSubmit={handleSubmitExName}>
        <InputGroup>
          <Form.Control
            autoFocus
            size="sm"
            isInvalid={isInvalidExName}
            onChange={handleRename}
            placeholder="Rename..."
            value={exName}
          />
          {exName && (
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
        isValid={updatedExNotes || null}
        onChange={handleUpdateNotes}
        label={`Notes${updatingExNotes ? '...' : ''}`}
        size="sm"
        as="textarea"
        rows={3}
        value={newExNotes}
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

export default memo(EditExerciseDropdownMenu);

EditExerciseDropdownMenu.propTypes = {
  id: PropTypes.number.isRequired,
  exId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  notes: PropTypes.string,
  close: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};

EditExerciseDropdownMenu.defaultProps = {
  notes: undefined
};
