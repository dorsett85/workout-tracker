import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { addWorkouts, setFetchingWorkouts, removeWorkouts } from 'state/actions';
import { getFetch } from 'api';
import WorkoutCreate from './WorkoutCreate';
import WorkoutList from './WorkoutList';
import WorkoutEditorModal from './WorkoutEditor/WorkoutEditorModal';


const mapStateToProps = ({
  user: { id: userId },
  workouts: { fetchingWorkouts }
}) => ({ userId, fetchingWorkouts });

const mapDispatchToProps = dispatch => (
  {
    setFetching: bool => dispatch(setFetchingWorkouts(bool)),
    addToWorkouts: workouts => dispatch(addWorkouts(workouts)),
    resetWorkouts: () => dispatch(removeWorkouts()),
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

    // Reset fetching to true on unmount
    return () => setFetching(true);
  }, []);

  return (
    <Row>
      <Col>
        <WorkoutCreate />
        <hr />
        <WorkoutList />
        <WorkoutEditorModal />
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
