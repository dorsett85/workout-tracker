import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { getFetch } from 'api/';


const mapStateToProps = ({ workouts: { currentWorkout } }) => (
  { currentWorkout }
);

const WorkoutEditor = (props) => {
  const { currentWorkout: { id, created } } = props;
  const [results, setResults] = useState([]);

  useEffect(() => {
    getFetch({
      url: `/api/workout/${id}`,
      success: (data) => {
        console.log(data);
      }
    });
  }, [id]);

  return (
    <Table variant="dark" size="sm" striped bordered hover responsive>
      <caption>{'' && created.toDateString()}</caption>
      <thead>
        <tr>
          <th>Exercise 1</th>
          <th>Exercise 1</th>
          <th>Exercise 1</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>1</td>
          <td>1</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default connect(mapStateToProps)(WorkoutEditor);

WorkoutEditor.propTypes = {
  currentWorkout: PropTypes.shape({
    id: PropTypes.number,
    created: PropTypes.instanceOf(Date)
  }).isRequired
};
