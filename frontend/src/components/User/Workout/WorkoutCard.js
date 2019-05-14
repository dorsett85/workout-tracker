import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row, Card, Button, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { setEditingWorkoutId } from 'state/actions';
import styles from 'assets/css/app.scss';
import WorkoutCardDropdownMenu from './WorkoutCardDropdownMenu';


const mapStateToProps = ({ workouts: { workouts } }, { id }) => {
  const thisWorkout = workouts.find(workout => workout.id === id);
  return { ...thisWorkout };
};

const mapDispatchToProps = dispatch => (
  { setEditingId: id => dispatch(setEditingWorkoutId(id)) }
);

const WorkoutCard = (props) => {
  const {
    id,
    name,
    created,
    lastCompleted,
    notes,
    setEditingId
  } = props;

  const handleEditClick = () => setEditingId(id);

  return (
    <Card border="dark" className={styles.fadeIn}>
      <Card.Header bg="primary">
        <div className="d-flex justify-content-between align-items-center">
          <span>
            <b>{name}</b>
            {notes && (
              <span>
                &nbsp;
                <OverlayTrigger
                  overlay={(
                    <Tooltip>
                      {notes}
                    </Tooltip>
                  )}
                >
                  <sup className={styles.cursorPointer}>ⓘ</sup>
                </OverlayTrigger>
              </span>
            )}
          </span>
          <Dropdown
            className={styles.noCaretDropdown}
            drop="left"
          >
            <Dropdown.Toggle
              size="sm"
              variant="outline-dark"
            >
              {'⋮'}
            </Dropdown.Toggle>
            <Dropdown.Menu
              as={WorkoutCardDropdownMenu}
              id={id}
            />
          </Dropdown>
        </div>
      </Card.Header>
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
        <Button
          variant="primary"
          onClick={handleEditClick}
          block
        >
          {'Edit'}
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(WorkoutCard));

WorkoutCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  lastCompleted: PropTypes.instanceOf(Date),
  notes: PropTypes.string,
  setEditingId: PropTypes.func.isRequired
};

WorkoutCard.defaultProps = {
  lastCompleted: undefined,
  notes: undefined
};
