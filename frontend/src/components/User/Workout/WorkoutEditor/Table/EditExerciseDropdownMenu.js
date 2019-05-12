import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { updateFetch, deleteFetch } from 'api';
import { convertQueryData } from '../functions';
import { addExercise } from '../actions';
import styles from '../workoutEditor.scss';


const EditExerciseDropdownMenu = React.forwardRef((props, _) => {
  const { id, exId, title, className, dispatch, close } = props;
  const [exRename, setExRename] = useState('');
  const [isInvalidExRename, setIsInvalidExRename] = useState(false);

  const handleRename = (e) => {
    setIsInvalidExRename(false);
    setExRename(e.target.value);
  };

  const handleSubmitExRename = (e) => {
    e.preventDefault();
    updateFetch({
      url: '/api/workout/exercise',
      body: { id, exId, exRename },
      success: (data) => {
        console.log(data);
      }
    });
  };

  const handleDelete = () => {
    deleteFetch({
      url: '/api/workout/exercise',
      body: { id, exId },
      success: workoutData => dispatch(addExercise(convertQueryData(workoutData)))
    });
  };

  return (
    <div className={`px-3 ${className} ${styles.editExerciseDropdownMenu}`}>
      <div>
        {title}
      </div>
      <hr />
      <Form className="my-2" onSubmit={handleSubmitExRename}>
        <InputGroup>
          <Form.Control
            autoFocus
            size="sm"
            isInvalid={isInvalidExRename}
            onChange={handleRename}
            placeholder="Rename..."
            value={exRename}
          />
          <InputGroup.Append>
            {exRename && (
              <Button
                type="submit"
                variant="outline-success"
                size="sm"
              >
                {'✓'}
              </Button>
            )}
          </InputGroup.Append>
          <Form.Control.Feedback type="invalid">
            {'Enter unique name'}
          </Form.Control.Feedback>
        </InputGroup>
      </Form>
      <Button
        onClick={handleDelete}
        variant="danger"
        block
      >
        {'Delete'}
      </Button>
    </div>
  );
});

export default memo(EditExerciseDropdownMenu);

EditExerciseDropdownMenu.propTypes = {
  id: PropTypes.number.isRequired,
  exId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};
