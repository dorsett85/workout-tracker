import React from 'react';
import PropTypes from 'prop-types';
import TableHeaderCellFirst from './TableHeaderCellFirst';
import TableHeaderCellExercise from './TableHeaderCellExercise';


const TableHeader = (props) => {
  const { id, workoutData, dispatch } = props;
  return (
    <thead>
      <tr>
        {workoutData[0]
          ? Object.keys(workoutData[0]).map(key => (key === 'date'
            ? (
              <TableHeaderCellFirst
                key={key}
                id={id}
                title={key}
                dispatch={dispatch}
              />
            )
            : (
              <TableHeaderCellExercise
                key={key}
                id={id}
                title={workoutData[0][key].name}
                exNotes={workoutData[0][key].exNotes}
                dispatch={dispatch}
                {...workoutData[0][key]}
              />
            )
          ))
          : (
            <TableHeaderCellFirst
              id={id}
              title="No Data!"
              dispatch={dispatch}
            />
          )
        }
      </tr>
    </thead>
  );
};

export default TableHeader;

TableHeader.propTypes = {
  id: PropTypes.number.isRequired,
  workoutData: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired
};
