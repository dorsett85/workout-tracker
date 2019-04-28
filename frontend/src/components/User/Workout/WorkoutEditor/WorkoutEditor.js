import React, { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import workoutEditorReducer from './reducer';
import { setInitialData } from './actions';
import { useInitialData } from './hooks';
import LoadingSpinner from '../../../UI/LoadingSpinner';


const mapStateToProps = ({ workouts: { currentWorkout: { id } } }) => (
  { id }
);

const WorkoutEditor = (props) => {
  const { id } = props;
  const [workoutData, dispatch] = useReducer(workoutEditorReducer, []);

  // Initial call to fetch workout data
  useInitialData(id, data => dispatch(setInitialData(data)));

  return !workoutData.length
    ? <LoadingSpinner />
    : (
      <Table variant="dark" size="sm" striped bordered hover responsive>
        <caption>{new Date().toLocaleString()}</caption>
        <thead>
          <tr>
            {Object.keys(workoutData[0]).map(key => (
              <th key={key}>{key !== 'date' ? workoutData[0][key].exName : key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {workoutData.map(row => (
            <tr key={row.date.wdId}>
              {Object.keys(row).map(key => (
                <td key={key}>{key !== 'date' ? row[key].wrValue : row[key].wdDate.toLocaleString()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
};

export default connect(mapStateToProps)(WorkoutEditor);

WorkoutEditor.propTypes = {
  id: PropTypes.number.isRequired
};
