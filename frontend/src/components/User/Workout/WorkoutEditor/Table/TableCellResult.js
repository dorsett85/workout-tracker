import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { updateFetch } from 'api/';
import { updateResultValue } from '../actions';

const TableCellResult = (props) => {
  const { wrId, value, dispatch } = props;
  const [wrValue, setWrValue] = useState(value);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setWrValue(value);
  }, [value]);

  const updateValue = () => {
    updateFetch({
      url: '/api/workout/results',
      body: { wrId, wrValue },
      success: (data) => {
        setWrValue('');
        dispatch(updateResultValue(data));
      }
    });
  };

  const handleOpenEdit = () => setEditing(true);

  const handleBlur = (e) => {
    if (e.relatedTarget.id === `${wrId}-UpdateButton`) { updateValue(); }
    setEditing(false);
  };

  const handleChange = e => setWrValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateValue();
    setEditing(false);
  };

  return (
    <td onClick={handleOpenEdit} role="presentation">
      {!editing
        ? value
        : (
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Form.Control
                autoFocus
                size="sm"
                value={wrValue}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <InputGroup.Append>
                <Button
                  id={`${wrId}-UpdateButton`}
                  type="submit"
                  variant="success"
                  size="sm"
                >
                  {'✓'}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
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
