import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row, Card, ButtonGroup, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { removeWorkouts, setCurrentWorkout } from 'state/actions';
import { deleteFetch } from 'api';
import styles from 'assets/css/app.scss';


const mapStateToProps = ({ user: { id: userId }, workouts: { workouts } }, { id }) => {
  const thisWorkout = workouts.find(workout => workout.id === id);
  return { userId, ...thisWorkout };
};

const mapDispatchToProps = dispatch => (
  {
    setCurrent: id => dispatch(setCurrentWorkout(id)),
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
    setCurrent,
    removeFromWorkouts
  } = props;

  // Set up a ref for the delete confirmation overlay
  const deleteRef = React.createRef();
  const handleHideDelete = () => (
    deleteRef.current.hide()
  );

  const handleEditClick = () => setCurrent(id);

  const handleConfirmDelete = () => {
    deleteRef.current.hide();

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
        <div className="d-flex flex-column">
          <ButtonGroup>
            <Button
              variant="outline-primary"
              onClick={handleEditClick}
            >
              {'Edit'}
            </Button>
            <OverlayTrigger
              ref={deleteRef}
              trigger="click"
              overlay={(
                <Popover title="Are you sure?">
                  <ButtonGroup>
                    <Button onClick={handleHideDelete}>Cancel</Button>
                    <Button
                      variant="danger"
                      onClick={handleConfirmDelete}
                    >
                      {'DELETE'}
                    </Button>
                  </ButtonGroup>
                </Popover>
              )}
            >
              <Button variant="outline-danger">
                {'Delete'}
              </Button>
            </OverlayTrigger>
          </ButtonGroup>
        </div>
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
  setCurrent: PropTypes.func.isRequired,
  removeFromWorkouts: PropTypes.func.isRequired
};

WorkoutCard.defaultProps = {
  userId: undefined,
  lastCompleted: undefined
};
