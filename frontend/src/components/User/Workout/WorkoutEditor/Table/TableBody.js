import React from 'react';
import PropTypes from 'prop-types';
import TableCellDate from './TableCellDate';
import TableCellResult from './TableCellResult';
import TableCellAddDate from './TableCellAddDate';


const TableHeader = (props) => {
  const { id, workoutData, dispatch } = props;
  return (
    <tbody>
      {workoutData.map(row => (
        <tr key={row.date.wdId}>
          {Object.keys(row).map(key => (key === 'date'
            ? <TableCellDate key={key} dispatch={dispatch} {...row[key]} />
            : <TableCellResult key={key} dispatch={dispatch} {...row[key]} />
          ))}
        </tr>
      ))}
      <tr>
        <TableCellAddDate
          id={id}
          dispatch={dispatch}
          colSpan={workoutData.length ? Object.keys(workoutData[0]).length : 1}
        />
      </tr>
    </tbody>
  );
};

export default TableHeader;

TableHeader.propTypes = {
  id: PropTypes.number.isRequired,
  workoutData: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired
};
