import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Table } from 'react-bootstrap';
import workoutEditorReducer from './reducer';
import { setInitialData } from './actions';
import { useInitialData } from './hooks';
import styles from './workoutEditor.scss';
import LoadingSpinner from '../../../UI/LoadingSpinner';
import TableCellDate from './TableCellDate';
import TableCellExercise from './TableCellExercise';


const mapStateToProps = ({ workouts: { editingWorkoutId: id } }) => (
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
      <Row>
        <Col>
          <div className={styles.tableContainer}>
            <Table variant="dark" size="sm" striped bordered hover>
              <thead>
                <tr>
                  {Object.keys(workoutData[0]).map(key => (
                    <th key={key}>{key !== 'date' ? workoutData[0][key].name : key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {workoutData.map(row => (
                  <tr key={row.date.wdId}>
                    {Object.keys(row).map(key => (key === 'date'
                      ? <TableCellDate key={key} {...row[key]} dispatch={dispatch} />
                      : <TableCellExercise key={key} {...row[key]} dispatch={dispatch} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    );
};

export default connect(mapStateToProps)(WorkoutEditor);

WorkoutEditor.propTypes = {
  id: PropTypes.number.isRequired
};
