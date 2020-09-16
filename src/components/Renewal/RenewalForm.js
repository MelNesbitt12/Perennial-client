import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'

const RenewalForm = ({ renewal, handleSubmit, handleChange, cancelPath }) => (

  <div className="updates">
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <h2>Renewal</h2><br/>
        <p> </p>
        <Form.Label>Type</Form.Label>
        <Form.Control as="select" value={renewal.type} name='type' onChange={handleChange}>
          <option>Choose from the following:</option>
          <option>Weekly</option>
          <option>Monthly</option>
          <option>Bi-Annually</option>
          <option>Yearly</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect2">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="name of subscription, service, etc." value={renewal.name} name='name' onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect3">
        <Form.Label>Expiration Date: </Form.Label>
        <Form.Control type="date" value={renewal.date} name='date' onChange={handleChange}/>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect5">
        <Form.Label>Cost</Form.Label>
        <Form.Control type="number" placeholder="ex: 50.00" value={renewal.cost} name='cost' onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect4">
        <Form.Label>Link to Renew:</Form.Label>
        <Form.Control type="url" placeholder="Add link here" value={renewal.url} name='url' onChange={handleChange}/>
      </Form.Group>
      <button type='submit'>Submit</button>
      <Link to={cancelPath}>
        <button>Cancel</button>
      </Link><br/>
      <h6>*All Fields Required.</h6>
    </Form>
  </div>
)
export default RenewalForm
