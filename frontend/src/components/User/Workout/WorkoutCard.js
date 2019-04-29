import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row, Card, ButtonToolbar, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { removeWorkouts, setEditingWorkoutId } from 'state/actions';
import { deleteFetch } from 'api';
import styles from 'assets/css/app.scss';


const mapStateToProps = ({ user: { id: userId }, workouts: { workouts } }, { id }) => {
  const thisWorkout = workouts.find(workout => workout.id === id);
  return { userId, ...thisWorkout };
};

const mapDispatchToProps = dispatch => (
  {
    setEditingId: id => dispatch(setEditingWorkoutId(id)),
    removeFromWorkouts: workouts => dispatch(removeWorkouts(workouts))
  }
);

const WorkoutCard = (props) => {
  const {
    userId,
    id,
    name,
    created,
    lastCompleted,
    setEditingId,
    removeFromWorkouts
  } = props;

  const handleEditClick = () => setEditingId(id);

  const handleConfirmDelete = () => {
    if (userId) {
      deleteFetch({
        url: '/api/workout',
        body: { id },
        success: (workout) => {
          removeFromWorkouts(workout.id);
        }
      });
    } else {
      removeFromWorkouts(id);
    }
  };

  return (
    <Card border="dark" className={styles.fadeIn}>
      <Card.Header bg="primary"><b>{name}</b></Card.Header>
      <Card.Body>
        <Row>
          <Col xl={6}>
            <div>
              <b>Created</b>
              <br />
              {created.toDateString()}
            </div>
          </Col>
          <Col xl={6}>
            <div>
              <b>Last completed</b>
              <br />
              {(lastCompleted && lastCompleted.toDateString()) || 'Not completed yet!'}
            </div>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <ButtonToolbar className="justify-content-end">
          <Button
            variant="outline-primary"
            onClick={handleEditClick}
          >
            {'Edit'}
          </Button>
          <DropdownButton
            className={`${styles.noCaretDropdown} ml-2`}
            variant="outline-danger"
            title="Delete"
            drop="up"
          >
            <Dropdown.Header>Are you sure?</Dropdown.Header>
            <Dropdown.Item
              eventKey={1}
              onClick={handleConfirmDelete}
            >
              {'Yes'}
            </Dropdown.Item>
          </DropdownButton>
        </ButtonToolbar>
      </Card.Footer>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(WorkoutCard));

WorkoutCard.propTypes = {
  userId: PropTypes.number,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  lastCompleted: PropTypes.instanceOf(Date),
  setEditingId: PropTypes.func.isRequired,
  removeFromWorkouts: PropTypes.func.isRequired
};

WorkoutCard.defaultProps = {
  userId: undefined,
  lastCompleted: undefined
};
