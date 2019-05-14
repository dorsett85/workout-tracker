import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { addWorkouts, setFetchingWorkouts, deleteWorkout } from 'state/actions';
import { getFetch } from 'api';
import WorkoutCreate from './WorkoutCreate';
import WorkoutList from './WorkoutList';


const mapStateToProps = ({
  user: { id: userId },
  workouts: { fetchingWorkouts }
}) => ({ userId, fetchingWorkouts });

const mapDispatchToProps = dispatch => (
  {
    setFetching: bool => dispatch(setFetchingWorkouts(bool)),
    addToWorkouts: workouts => dispatch(addWorkouts(workouts)),
    resetWorkouts: () => dispatch(deleteWorkout()),
  }
);

const Workout = (props) => {
  const { userId, addToWorkouts, setFetching, fetchingWorkouts, resetWorkouts } = props;
  useEffect(() => {
    if (fetchingWorkouts) {
      resetWorkouts();
      if (userId) {
        getFetch({
          url: '/api/workout/all',
          success: (workouts) => {
            addToWorkouts(workouts);
            setFetching(false);
          }
        });
      } else {
        setFetching(false);
      }
    }
  }, []);

  return (
    <Row>
      <Col>
        <WorkoutCreate />
        <hr />
        <WorkoutList />
      </Col>
    </Row>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Workout);

Workout.propTypes = {
  userId: PropTypes.number,
  addToWorkouts: PropTypes.func.isRequired,
  fetchingWorkouts: PropTypes.bool.isRequired,
  setFetching: PropTypes.func.isRequired,
  resetWorkouts: PropTypes.func.isRequired
};

Workout.defaultProps = {
  userId: undefined
};
