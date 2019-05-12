import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { postFetch } from 'api/';
import styles from '../workoutEditor.scss';
import { convertQueryData } from '../functions';
import { addExercise } from '../actions';


const AddExerciseDropdownMenu = React.forwardRef((props, _) => {
  const { id, dispatch, className, close } = props;
  const [name, setName] = useState('');
  const [isInvalid, setIsInvalid] = useState(null);

  const handleChange = (e) => {
    setName(e.target.value);
    setIsInvalid(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postFetch({
      url: '/api/workout/exercise',
      body: { id, name },
      success: (workoutData) => {
        if (workoutData) {
          dispatch(addExercise(convertQueryData(workoutData)));
          setName('');
          close();
        } else {
          setIsInvalid(true);
        }
      }
    });
  };

  return (
    <Form className={`${className} px-2 ${styles.addExerciseForm}`} onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control
          autoFocus
          size="sm"
          placeholder="Enter a name"
          isInvalid={isInvalid}
          onChange={handleChange}
          value={name}
        />
        <InputGroup.Append>
          {name && (
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
  );
});

export default memo(AddExerciseDropdownMenu);

AddExerciseDropdownMenu.propTypes = {
  id: PropTypes.number.isRequired,
  close: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};
