import React from 'react';
import { Form } from 'react-bootstrap';


const FormInput = ({ id, label, errFeedback, ...props }) => (
  <Form.Group controlId={id}>
    <Form.Label>{label}</Form.Label>
    <Form.Control {...props} />
    <Form.Control.Feedback type="invalid">
      {errFeedback}
    </Form.Control.Feedback>
  </Form.Group>
);

export default FormInput;
