import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';
import { setCreatingWorkout } from 'state/actions';
import WorkoutCreate from './WorkoutCreate';
import WorkoutEditModal from './WorkoutEditModal/WorkoutEditModal';
import WorkoutCard from './WorkoutCard';


const mapStateToProps = ({ workouts: { workouts, editingWorkoutId, creatingWorkout } }) => {
  const workoutIds = workouts.map(workout => workout.id);
  return { workoutIds, editingWorkoutId, creatingWorkout };
};

const mapDispatchToProps = dispatch => (
  { showCreateWorkout: show => dispatch(setCreatingWorkout(show)) }
);

const Workout = (props) => {
  const { workoutIds, creatingWorkout, showCreateWorkout, editingWorkoutId, fetchingUserWorkouts } = props;
  const handleShowCreateWorkout = () => showCreateWorkout(true);
  return (
    <>
      <Row>
        <Col>
          {!creatingWorkout
            ? <Button variant="success" onClick={handleShowCreateWorkout}>Add Workout</Button>
            : <WorkoutCreate />
          }
        </Col>
      </Row>
      <hr />
      <p>
        <span>Here are your workouts:</span>
      </p>
      {!fetchingUserWorkouts && (
        <>
          {!editingWorkoutId && (
            !workoutIds.length
              ? (
                <h4>
                  {'You haven\'t saved any workouts yet!'}
                </h4>
              )
              : (
                <Row>
                  {workoutIds.map(id => (
                    <Col key={id} xs={12} md={4} className="mb-4">
                      <WorkoutCard id={id} />
                    </Col>
                  ))}
                </Row>
              )
          )}
          <WorkoutEditModal />
        </>
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Workout);

Workout.propTypes = {
  creatingWorkout: PropTypes.bool.isRequired,
  showCreateWorkout: PropTypes.func.isRequired,
  editingWorkoutId: PropTypes.number,
  workoutIds: PropTypes.arrayOf(PropTypes.number).isRequired
};

Workout.defaultProps = {
  editingWorkoutId: undefined
};
