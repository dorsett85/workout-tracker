import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { addWorkouts } from 'state/actions';
import { getFetch } from 'api';
import Workout from './Workout';


const mapStateToProps = ({ user: { id: userId } }) => (
  { userId }
);

const mapDispatchToProps = dispatch => (
  {
    addToWorkouts: workouts => dispatch(addWorkouts(workouts))
  }
);

class WorkoutContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingUserWorkouts: true
    };
  }

  componentDidMount() {
    this.getWorkouts();
  }

  getWorkouts() {
    const { userId, addToWorkouts } = this.props;
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

  render() {
    const { fetchingUserWorkouts } = this.state;
    return (
      <Workout fetchingUserWorkouts={fetchingUserWorkouts} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WorkoutContainer));

WorkoutContainer.propTypes = {
  userId: PropTypes.number,
  addToWorkouts: PropTypes.func.isRequired
};

WorkoutContainer.defaultProps = {
  userId: undefined
};
