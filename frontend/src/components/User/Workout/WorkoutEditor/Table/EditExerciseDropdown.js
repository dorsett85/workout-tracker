import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { deleteFetch } from 'api';
import { convertQueryData } from '../functions';
import { addExercise } from '../actions';


const EditExerciseDropdownMenu = React.forwardRef((props, _) => {
  const { id, exId, dispatch, className } = props;

  const handleDelete = () => {
    deleteFetch({
      url: '/api/workout/exercise',
      body: { id, exId },
      success: workoutData => dispatch(addExercise(convertQueryData(workoutData)))
    });
  };

  return (
    <div className={className}>
      <Dropdown.Item
        onClick={handleDelete}
      >
        {'Delete'}
      </Dropdown.Item>
    </div>
  );
});

export default memo(EditExerciseDropdownMenu);

EditExerciseDropdownMenu.propTypes = {
  id: PropTypes.number.isRequired,
  exId: PropTypes.number.isRequired,
  close: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};
