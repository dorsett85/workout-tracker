import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import WorkoutList from './WorkoutList';
import AddWorkout from './AddWorkout';


const mapStateToProps = ({ user }) => (
  { user }
);

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addingWorkout: false
    };
    this.handleToggleNewWorkout = this.handleToggleNewWorkout.bind(this);
  }

  handleToggleNewWorkout() {
    const { addingWorkout } = this.state;
    this.setState({ addingWorkout: !addingWorkout });
  }

  render() {
    const { addingWorkout } = this.state;
    const { user } = this.props;
    const { handleToggleNewWorkout } = this;
    return (
      <>
        <h2>Welcome {user.name}</h2>
        <div className="mt-3">
          {!addingWorkout
            ? <Button variant="success" onClick={handleToggleNewWorkout}>Add Workout</Button>
            : <AddWorkout handleClose={handleToggleNewWorkout} />
          }
        </div>
        <hr />
        <WorkoutList />
      </>
    );
  }
}

export default connect(mapStateToProps)(User);

User.propTypes = {
  user: PropTypes.object.isRequired
};
