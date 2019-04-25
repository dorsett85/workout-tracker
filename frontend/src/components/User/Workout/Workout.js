import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { addWorkouts, setFetchingWorkouts } from 'state/actions';
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
    addToWorkouts: workouts => dispatch(addWorkouts(workouts))
  }
);

const Workout = (props) => {
  const { userId, addToWorkouts, setFetching, fetchingWorkouts } = props;
  useEffect(() => {
    if (fetchingWorkouts) {
      if (userId) {
        getFetch({
          url: '/api/workout',
          success: (workouts) => {
            if (workouts.length) {
              const workoutsWithDate = workouts.map(({ created, ...workout }) => (
                { ...workout, created: new Date(created) }
              ));
              addToWorkouts(workoutsWithDate);
            }
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
  setFetching: PropTypes.func.isRequired
};

Workout.defaultProps = {
  userId: undefined
};
