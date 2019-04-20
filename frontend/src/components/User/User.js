import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { addWorkouts } from 'state/actions';
import { getFetch } from 'api/';
import WorkoutList from './WorkoutList';
import AddWorkout from './AddWorkout';


const mapStateToProps = ({ user }) => (
  { user }
);

const mapDispatchToProps = dispatch => (
  { addToWorkouts: workouts => dispatch(addWorkouts(workouts)) }
);

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addingWorkout: false,
      fetchingUserWorkouts: true
    };
    this.getWorkouts();
    this.handleToggleNewWorkout = this.handleToggleNewWorkout.bind(this);
  }

  getWorkouts() {
    const { user: { id }, addToWorkouts } = this.props;
    if (id) {
      getFetch({
        url: '/api/workout',
        success: (workouts) => {
          if (workouts.length) {
            const workoutsWithDate = workouts.map(({ createdDate, ...workout }) => (
              { ...workout, createdDate: new Date(createdDate) }
            ));
            addToWorkouts(workoutsWithDate);
          }
          this.setState({
            fetchingUserWorkouts: false
          });
        },
        error: err => console.log(err)
      });
    }
  }

  handleToggleNewWorkout() {
    const { addingWorkout } = this.state;
    this.setState({ addingWorkout: !addingWorkout });
  }

  render() {
    const { addingWorkout, fetchingUserWorkouts } = this.state;
    const { user: { username } } = this.props;
    const { handleToggleNewWorkout } = this;
    return (
      <>
        <h2>Welcome {username}</h2>
        <div className="mt-3">
          {!addingWorkout
            ? <Button variant="success" onClick={handleToggleNewWorkout}>Add Workout</Button>
            : <AddWorkout handleClose={handleToggleNewWorkout} />
          }
        </div>
        <hr />
        {!fetchingUserWorkouts && <WorkoutList />}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);

User.propTypes = {
  addToWorkouts: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};
