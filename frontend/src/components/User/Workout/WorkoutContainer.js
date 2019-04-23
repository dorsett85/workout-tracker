import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { addWorkouts, removeWorkouts } from 'state/actions';
import { getFetch, deleteFetch } from 'api/';
import Workout from './Workout';


const mapStateToProps = ({ user: { id }, workouts }) => (
  { id, workouts }
);

const mapDispatchToProps = dispatch => (
  {
    addToWorkouts: workouts => dispatch(addWorkouts(workouts)),
    removeFromWorkouts: workouts => dispatch(removeWorkouts(workouts))
  }
);

class WorkoutContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addingWorkout: false,
      fetchingUserWorkouts: true
    };
    this.handleToggleNewWorkout = this.handleToggleNewWorkout.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  componentDidMount() {
    this.getWorkouts();
  }

  getWorkouts() {
    const { id, addToWorkouts } = this.props;
    if (id) {
      getFetch({
        url: '/api/workout',
        success: (workouts) => {
          if (workouts.length) {
            const workoutsWithDate = workouts.map(({ created, ...workout }) => (
              { ...workout, created: new Date(created) }
            ));
            addToWorkouts(workoutsWithDate);
          }
          this.setState({
            fetchingUserWorkouts: false
          });
        }
      });
    } else {
      this.setState({
        fetchingUserWorkouts: false
      });
    }
  }

  getWorkoutProps() {
    const { fetchingUserWorkouts, addingWorkout } = this.state;
    const {
      props: { workouts },
      handleToggleNewWorkout,
      handleEditClick,
      handleDeleteClick
    } = this;
    return {
      workouts,
      fetchingUserWorkouts,
      addingWorkout,
      handleToggleNewWorkout,
      handleEditClick,
      handleDeleteClick
    };
  }

  handleToggleNewWorkout() {
    const { addingWorkout } = this.state;
    this.setState({ addingWorkout: !addingWorkout });
  }

  handleEditClick(e) {
    const { value } = e.target;

  }

  handleDeleteClick(e) {
    const workoutId = +e.target.value;
    const { id, removeFromWorkouts } = this.props;

    if (id) {
      deleteFetch({
        url: '/api/workout',
        body: {
          id: workoutId
        },
        success: (workout) => {
          removeFromWorkouts(workout.id);
        }
      });
    } else {
      removeFromWorkouts(workoutId);
    }
  }

  render() {
    const workoutProps = this.getWorkoutProps();
    return (
      <>
        <Workout {...workoutProps} />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WorkoutContainer));

WorkoutContainer.propTypes = {
  id: PropTypes.number,
  workouts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    created: PropTypes.instanceOf(Date),
    lastCompleted: PropTypes.instanceOf(Date)
  })).isRequired,
  addToWorkouts: PropTypes.func.isRequired,
  removeFromWorkouts: PropTypes.func.isRequired
};

WorkoutContainer.defaultProps = {
  id: undefined
};
