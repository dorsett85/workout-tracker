import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import { addWorkout } from 'state/actions/index';
import { postFetch } from 'api/';


const mapStateToProps = ({ user: { id } }) => (
  { id }
);

const mapDispatchToProps = dispatch => (
  { createWorkout: workout => dispatch(addWorkout(workout)) }
);

class AddWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
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
      title: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { title } = this.state;
    const { id, createWorkout, handleClose } = this.props;
    const { createdDate } = new Date().toISOString();

    // Add workout to database if a user is logged in
    if (id) {
      postFetch({
        url: '/api/workout/create',
        body: { title, createdDate },
        success: (data) => {
          console.log(data);
          createWorkout({ title, created: new Date() });
          handleClose();
        },
        error: err => console.log(err)
      });
    } else {
      createWorkout({ title, created: new Date() });
      handleClose();
    }
  }

  render() {
    const { title } = this.state;
    const { handleClose } = this.props;
    const { handleChange, handleSubmit } = this;
    return (
      <Row>
        <Col xs={12} md={4}>
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <FormControl
                onChange={handleChange}
                value={title}
                placeholder="Enter workout name"
                ref={this.workoutNameRef}
              />
              <InputGroup.Append>
                {title && (
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
  id: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  createWorkout: PropTypes.func.isRequired
};
