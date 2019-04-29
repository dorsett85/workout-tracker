import React from 'react';
import PropTypes from 'prop-types';

const TableCellExercise = (props) => {
  const { value } = props;
  return (
    <td>{value}</td>
  );
};

export default TableCellExercise;

TableCellExercise.propTypes = {
  value: PropTypes.string.isRequired
};
