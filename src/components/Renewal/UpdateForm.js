import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const UpdateForm = ({ renewal, handleSubmit, handleChange, cancelPath, handleCheck }) => (

  <div className="row">
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <h2 style={{ fontWeight: 'bold', margin: 'auto', textShadow: '1px 1px' }}>Renewal</h2><br/>
        <p> </p>
        <Form.Label style={{ fontSize: '20px' }}>Type</Form.Label>
        <Form.Control className="form-control z-depth-1 input" as="select" value={renewal.type} name='type' onChange={handleChange}>
          <option>Choose from the following:</option>
          <option>Weekly</option>
          <option>Monthly</option>
          <option>Yearly</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect2">
        <Form.Label style={{ fontSize: '20px' }}>Name</Form.Label>
        <Form.Control className="form-control z-depth-1" type="text" placeholder="Name of subscription, service, etc." value={renewal.name} name='name' onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect3">
        <Form.Label style={{ fontSize: '20px' }}>Expiration Date: </Form.Label>
        <Form.Control className="form-control z-depth-1" type="date" value={renewal.date} name='date' onChange={handleChange}/>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect5">
        <Form.Label style={{ fontSize: '20px' }}>Cost</Form.Label>
        <Form.Control className="form-control z-depth-1" type="number" placeholder="Ex: 50.00" value={renewal.cost} name='cost' onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect4">
        <Form.Label style={{ fontSize: '20px' }}>Link to Renew:</Form.Label>
        <Form.Control className="form-control z-depth-1" type="text" placeholder="Add link here" value={renewal.url} name='url' onChange={handleChange}/>
      </Form.Group>
      <Form.Group controlId="formGridCheckbox">
        <Form.Check name="autoRenew" type="checkbox" label="Auto-Renew Enabled?" style={{ fontSize: '20px' }} defaultChecked={renewal.autoRenew} onChange={handleCheck} />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect6">
        <Form.Label style={{ fontSize: '20px' }}> Special Instructions:</Form.Label>
        <textarea className="form-control z-depth-1" rows="3" placeholder="For auto-renewal, write 'None'." value={renewal.instructions} name='instructions' onChange={handleChange}></textarea>
      </Form.Group>
      <Button className="submit-btn" type='submit' variant="outline-info">Submit</Button>
      <Link to={cancelPath}>
        <Button className="submit-btn" variant="outline-info">Cancel</Button>
      </Link><br/>
      <p></p>
    </Form>
  </div>
)

export default UpdateForm
