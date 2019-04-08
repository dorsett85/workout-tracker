import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row, Card, Button } from 'react-bootstrap';
import AddWorkout from './AddWorkout';


const mapStateToProps = state => (
  { workouts: state.workouts }
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
    const { user, workouts } = this.props;
    const { handleToggleNewWorkout } = this;
    return (
      <Col xs={12} md={8}>
        <h2>Welcome {user}</h2>
        <p>
          <span>Here are your saved workouts</span>
        </p>
        <Row>
          {workouts && workouts.map(({ title, created }) => (
            <Col key={created} xs={12} md={4}>
              <Card>
                <Card.Header>{title}</Card.Header>
                <Card.Body>
                  {created.toDateString()}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <hr />
        <div>
          {!addingWorkout
            ? <Button variant="outline-primary" onClick={handleToggleNewWorkout}>Add Workout</Button>
            : <AddWorkout handleClose={handleToggleNewWorkout} />
          }
        </div>
      </Col>
    );
  }
}

export default connect(mapStateToProps)(User);

User.propTypes = {
  user: PropTypes.object.isRequired,
  workouts: PropTypes.array.isRequired
};
