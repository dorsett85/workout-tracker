import React, { memo, useState, useReducer } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Tabs, Tab, Table } from 'react-bootstrap';
import workoutEditorReducer from './reducer';
import { setInitialData } from './actions';
import { useInitialData } from './hooks';
import styles from './workoutEditor.scss';
import LoadingSpinner from '../../../UI/LoadingSpinner';
import TableHeader from './Table/TableHeader';
import TableBody from './Table/TableBody';
import WorkoutEditorChart from './WorkoutEditorChart';


const mapStateToProps = ({ workouts: { editingWorkoutId: id } }) => (
  { id }
);

const WorkoutEditor = (props) => {
  const { id } = props;
  const [loading, setLoading] = useState(true);
  const [workoutData, dispatch] = useReducer(workoutEditorReducer, []);

  // Initial call to fetch workout data
  useInitialData(id, (data) => {
    dispatch(setInitialData(data));
    setLoading(false);
  });

  return loading
    ? <LoadingSpinner />
    : (
      <Tabs mountOnEnter unmountOnExit>
        <Tab eventKey="table" title="Table">
          <Row className="mt-3">
            <Col>
              <div className={`${styles.tableContainer} rounded`}>
                <Table variant="dark" size="sm" striped bordered hover>
                  <TableHeader id={id} workoutData={workoutData} dispatch={dispatch} />
                  <TableBody id={id} workoutData={workoutData} dispatch={dispatch} />
                </Table>
              </div>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="chart" title="Chart">
          <Row className="mt-3">
            <Col>
              <WorkoutEditorChart workoutData={workoutData} />
            </Col>
          </Row>
        </Tab>
      </Tabs>
    );
};

export default connect(mapStateToProps)(memo(WorkoutEditor));

WorkoutEditor.propTypes = {
  id: PropTypes.number.isRequired
};
