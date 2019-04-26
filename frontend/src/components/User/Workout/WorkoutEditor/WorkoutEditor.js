import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { useInitialData } from './hooks';
import LoadingSpinner from '../../../UI/LoadingSpinner';


const mapStateToProps = ({ user: { id: userId }, workouts: { currentWorkout } }) => (
  { userId, currentWorkout }
);

const WorkoutEditor = (props) => {
  const { userId, currentWorkout: { id, created } } = props;
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  // Initial call to fetch workout data
  useInitialData(userId, id, (data) => {
    console.log(data);
    // setResults(data);
    setLoading(false);
  });

  return loading
    ? <LoadingSpinner />
    : (
      <Table variant="dark" size="sm" striped bordered hover responsive>
        <caption>{results}</caption>
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
  userId: PropTypes.number,
  currentWorkout: PropTypes.shape({
    id: PropTypes.number,
    created: PropTypes.instanceOf(Date)
  }).isRequired
};

WorkoutEditor.defaultProps = {
  userId: undefined
};
