import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Card, ButtonGroup, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import styles from 'assets/css/app.scss';


const WorkoutCard = (props) => {
  const { id, name, createdDate, lastCompleted, handleEditClick, handleDeleteClick } = props;
  
  // Set up a ref for the delete confirmation overlay
  const deleteRef = React.createRef();
  const handleHideDelete = () => (
    deleteRef.current.hide()
  );

  const handleConfirmDelete = (e) => {
    deleteRef.current.hide();
    handleDeleteClick(e);
  };

  const deletePopover = (
    <Popover title="Are you sure?">
      <ButtonGroup>
        <Button onClick={handleHideDelete}>Cancel</Button>
        <Button
          variant="danger"
          onClick={handleConfirmDelete}
          value={id}
        >
          {'DELETE'}
        </Button>
      </ButtonGroup>
    </Popover>
  );

  return (
    <Card border="dark" className={styles.fadeIn}>
      <Card.Header bg="primary"><b>{name}</b></Card.Header>
      <Card.Body>
        <Row>
          <Col xl={6}>
            <div>
              <b>Created</b>
              <br />
              {createdDate.toDateString()}
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
              value={id}
            >
              {'Edit'}
            </Button>
            <OverlayTrigger
              ref={deleteRef}
              trigger="click"
              overlay={deletePopover}
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

export default memo(WorkoutCard);

WorkoutCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  createdDate: PropTypes.instanceOf(Date).isRequired,
  lastCompleted: PropTypes.instanceOf(Date),
  handleEditClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired
};

WorkoutCard.defaultProps = {
  lastCompleted: undefined
};
