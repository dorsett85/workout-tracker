import React, { memo, useState, useReducer } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Table } from 'react-bootstrap';
import workoutEditorReducer from './reducer';
import { setInitialData } from './actions';
import { useInitialData } from './hooks';
import styles from './workoutEditor.scss';
import LoadingSpinner from '../../../UI/LoadingSpinner';
import TableHeader from './Table/TableHeader';
import TableBody from './Table/TableBody';


const mapStateToProps = ({ workouts: { editingWorkoutId: id } }) => (
  { id }
);

const WorkoutEditor = (props) => {
  const { id } = props;
  const [loading, setLoading] = useState(true);
  const [workoutData, dispatch] = useReducer(workoutEditorReducer, []);

  // Initial call to fetch workout data
  useInitialData(id, (data) => {
    setLoading(false);
    dispatch(setInitialData(data));
  });

  return loading
    ? <LoadingSpinner />
    : (
      <Row>
        <Col>
          <div className={styles.tableContainer}>
            <Table variant="dark" size="sm" striped bordered hover>
              <TableHeader id={id} workoutData={workoutData} dispatch={dispatch} />
              <TableBody id={id} workoutData={workoutData} dispatch={dispatch} />
            </Table>
          </div>
        </Col>
      </Row>
    );
};

export default connect(mapStateToProps)(memo(WorkoutEditor));

WorkoutEditor.propTypes = {
  id: PropTypes.number.isRequired
};
