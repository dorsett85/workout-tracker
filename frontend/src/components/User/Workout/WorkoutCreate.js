import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, InputGroup, FormControl, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { setCreatingWorkout, addWorkouts } from 'state/actions/index';
import { postFetch } from 'api/';


const mapStateToProps = ({
  user: { id: userId },
  workouts: { creatingWorkout }
}) => ({ userId, creatingWorkout });

const mapDispatchToProps = dispatch => (
  {
    setCreating: show => dispatch(setCreatingWorkout(show)),
    addToWorkouts: workout => dispatch(addWorkouts(workout))
  }
);

class WorkoutCreate extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      invalidWorkoutName: null
    };
    this.workoutInputRef = React.createRef();
    this.workoutOverlayRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShowCreateWorkout = this.handleShowCreateWorkout.bind(this);
  }

  componentDidUpdate() {
    const { creatingWorkout } = this.props;
    if (creatingWorkout) {
      this.workoutInputRef.current.focus();
    }
  }

  componentWillUnmount() {
    this.handleClose();
  }

  handleChange(e) {
    this.setState({
      name: e.target.value,
      invalidWorkoutName: null
    });
  }

  handleClose() {
    const { setCreating } = this.props;
    setCreating(false);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name } = this.state;
    const { userId, addToWorkouts, setCreating } = this.props;
    this.workoutOverlayRef.current.hide();

    // Add workout to database if a user is logged in
    if (userId) {
      postFetch({
        url: '/api/workout',
        body: { name },
        success: (workout) => {
          if (workout) {
            addToWorkouts(workout);
            setCreating(false);
            this.setState({
              name: ''
            });
          } else {
            this.workoutOverlayRef.current.show();
            this.setState({
              invalidWorkoutName: true
            });
          }
        }
      });
    } else {
      addToWorkouts([{
        id: Math.random(),
        name,
        created: new Date()
      }]);
      setCreating(false);
      this.setState({
        name: ''
      });
    }
  }

  handleShowCreateWorkout() {
    const { setCreating } = this.props;
    setCreating(true);
  }

  render() {
    const { name, invalidWorkoutName } = this.state;
    const { creatingWorkout } = this.props;
    const { workoutInputRef, workoutOverlayRef, handleChange, handleClose, handleSubmit, handleShowCreateWorkout } = this;
    return (
      <Row>
        <Col xs={12} md={4}>
          {creatingWorkout
            ? (
              <form onSubmit={handleSubmit}>
                <InputGroup>
                  <OverlayTrigger
                    ref={workoutOverlayRef}
                    trigger={null}
                    overlay={(
                      <Tooltip>
                        {'Workout already exists'}
                      </Tooltip>
                    )}
                    placement="bottom"
                  >
                    <FormControl
                      onChange={handleChange}
                      isInvalid={invalidWorkoutName}
                      value={name}
                      placeholder="Enter workout name"
                      ref={workoutInputRef}
                    />
                  </OverlayTrigger>
                  <InputGroup.Append>
                    {name && (
                      <Button
                        type="submit"
                        variant="outline-success"
                        onClick={handleSubmit}
                      >
                        {'\u2713'}
                      </Button>
                    )}
                    <Button
                      variant="outline-danger"
                      onClick={handleClose}
                    >
                      {'X'}
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </form>
            )
            : (
              <Button variant="success" onClick={handleShowCreateWorkout}>Add Workout</Button>
            )
          }
        </Col>
      </Row>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutCreate);

WorkoutCreate.propTypes = {
  userId: PropTypes.number,
  creatingWorkout: PropTypes.bool.isRequired,
  setCreating: PropTypes.func.isRequired,
  addToWorkouts: PropTypes.func.isRequired
};

WorkoutCreate.defaultProps = {
  userId: undefined
};
