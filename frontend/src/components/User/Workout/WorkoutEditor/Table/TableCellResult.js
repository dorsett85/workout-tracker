import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { updateFetch } from 'api/';
import { updateResultValue } from '../actions';

const TableCellResult = (props) => {
  const { wrId, value, dispatch } = props;
  const [cellValue, setCellValue] = useState(value);
  const [editingValue, setEditingValue] = useState(value);
  const [editing, setEditing] = useState(false);

  const updateValue = () => {
    updateFetch({
      url: '/api/workout/results',
      body: { wrId, wrValue: editingValue },
      success: (data) => {
        setCellValue(data.wrValue);
        setEditing(false);
        dispatch(updateResultValue(data));
      }
    });
  };

  const handleOpenEdit = show => (e) => {
    const { nodeName, type } = e.target;
    e.stopPropagation();

    // Cancel the toggle if it's a submit click, this will happen in the update function
    // Otherwise toggle editing mode
    if (nodeName === 'BUTTON' && type === 'submit') { return; }
    if (show !== editing) { setEditing(show); }
  };

  const handleChange = e => setEditingValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateValue();
  };

  return (
    <td onClick={handleOpenEdit(true)} role="presentation">
      {!editing
        ? cellValue
        : (
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Form.Control
                autoFocus
                size="sm"
                value={editingValue}
                onChange={handleChange}
              />
              <InputGroup.Append>
                <Button
                  type="submit"
                  variant="success"
                  size="sm"
                >
                  {'✓'}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleOpenEdit(false)}
                >
                  {'X'}
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        )
      }
    </td>
  );
};

export default memo(TableCellResult);

TableCellResult.propTypes = {
  wrId: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};
