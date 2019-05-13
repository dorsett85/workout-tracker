import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import styles from 'assets/css/app.scss';
import EditExerciseDropdownMenu from './EditExerciseDropdownMenu';


const TableHeaderCellExercise = (props) => {
  const { id, exId, title, exNotes, dispatch } = props;

  return (
    <th>
      <div className="d-flex justify-content-between align-items-center">
        <span className="text-nowrap">{title}</span>
        <Dropdown
          className={styles.noCaretDropdown}
          drop="left"
        >
          <Dropdown.Toggle
            size="sm"
            variant="link"
          >
            {'⋮'}
          </Dropdown.Toggle>
          <Dropdown.Menu
            as={EditExerciseDropdownMenu}
            id={id}
            exId={exId}
            title={title}
            exNotes={exNotes}
            dispatch={dispatch}
          />
        </Dropdown>
      </div>
    </th>
  );
};

export default memo(TableHeaderCellExercise);

TableHeaderCellExercise.propTypes = {
  id: PropTypes.number.isRequired,
  exId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  exNotes: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

TableHeaderCellExercise.defaultProps = {
  exNotes: undefined
};
