import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
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
      name: ''
    };
    this.workoutNameRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.workoutNameRef.current.focus();
  }

  handleChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name } = this.state;
    const { userId, addToWorkouts, handleClose } = this.props;

    // Add workout to database if a user is logged in
    if (userId) {
      postFetch({
        url: '/api/workout',
        body: { name },
        success: (workout) => {
          addToWorkouts({
            id: workout.id,
            name: workout.name,
            createdDate: new Date(workout.createdDate)
          });
          handleClose();
        },
        error: err => console.log(err)
      });
    } else {
      addToWorkouts({
        id: Math.random(),
        name,
        createdDate: new Date()
      });
      handleClose();
    }
  }

  render() {
    const { name } = this.state;
    const { handleClose } = this.props;
    const { handleChange, handleSubmit } = this;
    return (
      <Row>
        <Col xs={12} md={4}>
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <FormControl
                onChange={handleChange}
                value={name}
                placeholder="Enter workout name"
                ref={this.workoutNameRef}
              />
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
  userId: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  addToWorkouts: PropTypes.func.isRequired
};
