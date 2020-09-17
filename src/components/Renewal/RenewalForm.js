import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const RenewalForm = ({ renewal, handleSubmit, handleChange, cancelPath }) => (

  <div className="row">
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <h2>Renewal</h2><br/>
        <p> </p>
        <Form.Label style={{ fontSize: '20px' }}>Type</Form.Label>
        <Form.Control className="input" as="select" value={renewal.type} name='type' onChange={handleChange}>
          <option>Choose from the following:</option>
          <option>Weekly</option>
          <option>Monthly</option>
          <option>Yearly</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect2">
        <Form.Label style={{ fontSize: '20px' }}>Name</Form.Label>
        <Form.Control type="text" placeholder="Name of subscription, service, etc." value={renewal.name} name='name' onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect3">
        <Form.Label style={{ fontSize: '20px' }}>Expiration Date: </Form.Label>
        <Form.Control type="date" value={renewal.date} name='date' onChange={handleChange}/>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect5">
        <Form.Label style={{ fontSize: '20px' }}>Cost</Form.Label>
        <Form.Control type="number" placeholder="Ex: 50.00" value={renewal.cost} name='cost' onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect4">
        <Form.Label style={{ fontSize: '20px' }}>Link to Renew:</Form.Label>
        <Form.Control type="url" placeholder="Add link here" value={renewal.url} name='url' onChange={handleChange}/>
      </Form.Group>
      <Button className="submit-btn" type='submit' variant="outline-info">Submit</Button>
      <Link to={cancelPath}>
        <Button className="submit-btn" variant="outline-info">Cancel</Button>
      </Link><br/>
      <p></p>
      <h6 style={{ fontSize: '20px' }}>*All Fields Required.</h6>
    </Form>
  </div>
)

export default RenewalForm
