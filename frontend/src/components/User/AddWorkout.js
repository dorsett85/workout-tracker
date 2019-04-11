import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import { addWorkout } from 'state/actions/index';


const mapDispatchToProps = dispatch => (
  { addWorkout: workout => dispatch(addWorkout(workout)) }
);

class AddWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      title: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { title } = this.state;
    this.props.addWorkout({ title, created: new Date() });
    this.props.handleClose();
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

export default connect(null, mapDispatchToProps)(AddWorkout);

AddWorkout.propTypes = {
  handleClose: PropTypes.func.isRequired,
  addWorkout: PropTypes.func.isRequired
};
