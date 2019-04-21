import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';
import AddWorkout from './AddWorkout';
import WorkoutCard from './WorkoutCard';


const Workout = (props) => {
  const {
    workouts, addingWorkout, fetchingUserWorkouts,
    handleToggleNewWorkout, handleEditClick, handleDeleteClick
  } = props;
  return (
    <>
      <Row>
        <Col>
          {!addingWorkout
            ? <Button variant="success" onClick={handleToggleNewWorkout}>Add Workout</Button>
            : <AddWorkout handleClose={handleToggleNewWorkout} />
          }
        </Col>
      </Row>
      <hr />
      <p>
        <span>Here are your workouts:</span>
      </p>
      {!fetchingUserWorkouts && (
        !workouts.length
          ? (
            <h4>
              {'You haven\'t saved any workouts yet!'}
            </h4>
          )
          : (
            <Row>
              {workouts.map(({ id, name, createdDate, lastCompleted }) => (
                <Col key={id} xs={12} md={4} className="mb-4">
                  <WorkoutCard
                    key={id}
                    id={id}
                    name={name}
                    createdDate={createdDate}
                    lastCompleted={lastCompleted}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                </Col>
              ))}
            </Row>
          )
      )}
    </>
  );
};

export default Workout;

Workout.propTypes = {
  workouts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    createdDate: PropTypes.instanceOf(Date),
    lastCompleted: PropTypes.instanceOf(Date)
  })).isRequired
};
