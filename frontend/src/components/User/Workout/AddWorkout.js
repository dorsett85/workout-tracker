import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, InputGroup, FormControl, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { addWorkouts } from 'state/actions/index';
import { postFetch } from 'api/';


const mapStateToProps = ({ user: { id: userId } }) => (
  { userId }
);

const mapDispatchToProps = dispatch => (
  { addToWorkouts: workout => dispatch(addWorkouts(workout)) }
);

class AddWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      invalidWorkoutName: null
    };
    this.workoutInputRef = React.createRef();
    this.workoutOverlayRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.workoutInputRef.current.focus();
  }

  handleChange(e) {
    this.workoutOverlayRef.current.hide();
    this.setState({
      name: e.target.value,
      invalidWorkoutName: null
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name } = this.state;
    const { userId, addToWorkouts, handleClose } = this.props;
    this.workoutOverlayRef.current.hide();

    // Add workout to database if a user is logged in
    if (userId) {
      postFetch({
        url: '/api/workout',
        body: { name },
        success: ({ created, ...workout }) => {
          if (workout.id) {
            addToWorkouts({ ...workout, created: new Date(created) });
            handleClose();
          } else {
            this.workoutOverlayRef.current.show();
            this.setState({
              invalidWorkoutName: true
            });
          }
        }
      });
    } else {
      addToWorkouts({
        id: Math.random(),
        name,
        created: new Date()
      });
      handleClose();
    }
  }

  render() {
    const { name, invalidWorkoutName } = this.state;
    const { handleClose } = this.props;
    const { workoutInputRef, workoutOverlayRef, handleChange, handleSubmit } = this;
    return (
      <Row>
        <Col xs={12} md={4}>
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
        </Col>
      </Row>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWorkout);

AddWorkout.propTypes = {
  userId: PropTypes.number,
  handleClose: PropTypes.func.isRequired,
  addToWorkouts: PropTypes.func.isRequired
};

AddWorkout.defaultProps = {
  userId: undefined
};
