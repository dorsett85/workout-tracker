import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WorkoutContainer from './Workout/WorkoutContainer';


const mapStateToProps = ({ user }) => (
  { user }
);


class User extends React.Component {
  constructor(props) {
    super(props);
    /**
     * TODO 4/20/19
     * Add additional user functionality other than workouts
     */
    this.state = {};
  }

  render() {
    const { user: { username } } = this.props;
    return (
      <>
        <h2 className="mb-3">{`Welcome ${username}`}</h2>
        <WorkoutContainer />
      </>
    );
  }
}

export default connect(mapStateToProps)(User);

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string
  }).isRequired
};
