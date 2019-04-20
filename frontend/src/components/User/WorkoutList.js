import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row, Card } from 'react-bootstrap';


const mapStateToProps = ({ workouts }) => (
  { workouts }
);

const WorkoutList = (props) => {
  const { workouts } = props;

  return (
    <>
      <p>
        <span>Here are your workouts:</span>
      </p>
      {!workouts.length
        ? (
          <h4>
            {'You haven\'t saved any workouts yet!'}
          </h4>
        )
        : (
          <Row>
            {workouts.map(({ id, name, createdDate, lastCompleted }) => (
              <Col key={id} xs={12} md={4} className="mb-2">
                <Card border="dark">
                  <Card.Header>{name}</Card.Header>
                  <Card.Body>
                    <Row>
                      <Col xl={6}>
                        <p>
                          <b>Created</b>
                          <br />
                          {createdDate.toDateString()}
                        </p>
                      </Col>
                      <Col xl={6}>
                        <p>
                          <b>Last completed</b>
                          <br />
                          {lastCompleted || 'Not completed yet!'}
                        </p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )
      }
    </>
  );
};

export default connect(mapStateToProps)(WorkoutList);

WorkoutList.propTypes = {
  workouts: PropTypes.array.isRequired
};