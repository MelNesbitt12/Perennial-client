import React, { Component } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

class Welcome extends Component {
  state = {
  }
  render () {
    return (
      <Jumbotron style={{ width: '75%', margin: 'auto', backgroundColor: '#fff' }}>
        <h1 style={{ textAlign: 'center' }}>Welcome to Perennial!</h1><br/>
        <div style={{ fontSize: '20px' }}>
          Have you ever signed up for a service because your first month was free, forgotten to cancel, and then gotten charged? Have you ever driven around with an expired car registration for over 9 months?
        </div><br/>
        <div style={{ fontSize: '20px' }}>Perennial is here to help you keep track of your subscriptions, services, anything you might need to renew! Getting started is easy - by signing up, you already completed step 1!</div><br/>
        <ol style={{ fontSize: '20px' }}>
          <li> Sign Up - check!</li><br/>
          <li> Click the Add a Renewal link on the main page to add your first renewal.</li><br/>
          <li> Click the See Your Renewals link on the main page for a full list of all your renewals, sorted in order from soonest expiration date.</li><br/>
        </ol><br/>
        <div style={{ fontSize: '20px' }}> Happy Renewing!</div>
        <p>
          <Button className="submit-btn" variant="outline-info" href='/'>Ready!</Button>
        </p>
      </Jumbotron>
    )
  }
}

export default Welcome
