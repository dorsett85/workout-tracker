import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import WorkoutCard from './WorkoutCard';
import LoadingSpinner from '../../UI/LoadingSpinner';


const mapStateToProps = ({ workouts: { fetchingWorkouts, workouts } }) => {
  const workoutIds = workouts.map(workout => workout.id);
  return { fetchingWorkouts, workoutIds };
};

const WorkoutList = (props) => {
  const { workoutIds, fetchingWorkouts } = props;
  const workoutList = (
    <Row>
      {workoutIds.map(id => (
        <Col key={id} xs={12} md={4} className="mb-4">
          <WorkoutCard id={id} />
        </Col>
      ))}
    </Row>
  );
  const workoutContent = !workoutIds.length
    ? (
      <h4>
        {'You haven\'t saved any workouts yet!'}
      </h4>
    )
    : (
      <>
        <p>
          <span>Here are your workouts:</span>
        </p>
        {workoutList}
      </>
    );


  return (
    <Row>
      <Col>
        {fetchingWorkouts
          ? <LoadingSpinner />
          : workoutContent
        }
      </Col>
    </Row>
  );
};

export default connect(mapStateToProps)(WorkoutList);

WorkoutList.propTypes = {
  fetchingWorkouts: PropTypes.bool.isRequired,
  workoutIds: PropTypes.arrayOf(PropTypes.number).isRequired
};
