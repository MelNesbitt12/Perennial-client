import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import axios from 'axios'

class Renewal extends Component {
  constructor (props) {
    // this makes sure that `this.props` is set in the constructor
    super(props)

    this.state = {
      // Initially, our renewal state will be null, until the API request finishes
      renewal: null,
      // initially this renewal has not been deleted yet
      deleted: false,
      redirect: false
    }
  }
  // Axios calls to show renewal based on resource Id
  // If successful, set renewal state and return success message
  // If unsuccessful, send error message
  componentDidMount () {
    const { msgAlert } = this.props
    axios({
      url: `${apiUrl}/renewals/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
      data: { renewal: this.state.renewal }
    })
      .then(res => this.setState({ renewal: res.data.renewal }))
      .then(() => msgAlert({
        heading: 'Success!',
        message: messages.showRenewalSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failure' + error.message,
          message: messages.showRenewalFailure,
          variant: 'danger'
        })
      })
      .catch(console.error)
  }

  handleClick = () => {
    this.setState({ redirected: true })
  }

  deleteRenewal = () => {
    const { msgAlert } = this.props
    axios({
      url: `${apiUrl}/renewals/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      // update the `deleted` state to be `true`
      .then(() => this.setState({ deleted: true }))
      .then(() => msgAlert({
        heading: 'Deleted Renewal Successfully',
        message: messages.deleteRenewalSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed' + error.message,
          message: messages.deleteRenewalFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { renewal, deleted, redirected } = this.state

    if (!renewal) {
      return <p>Loading...</p>
    }

    // if the deleted state is true
    if (deleted) {
      // redirect to the home page
      return <Redirect to={{
        // Redirect to the home page ('/')
        pathname: '/renewals',
        // Pass along a message, in state, that we can show
        state: { msgAlert: 'Deleted renewal successfully' }
      }} />
    }

    if (redirected) {
      return <Redirect to={{ pathname: `/renewals/${this.props.match.params.id}/update` }} />
    }

    // formatting expiration date
    const date = new Date(renewal.date)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString()
    const day = date.getDate()
    const getFullDate = month + '/' + day + '/' + year

    return (
      <div className="renewal">
        <Card className="show" style={{ width: '30rem', margin: 'auto', textAlign: 'center' }}>
          <img className="card-img-top" src="images.png" style={{ width: '10rem' }}></img>
          <Card.Body>
            <Card.Title style={{ textAlign: 'center', fontSize: '25px', fontWeight: 'bold', textShadow: '1px 1px' }}>{renewal.name}</Card.Title><br/>
            <p style={{ fontSize: '20px' }}>Type: {renewal.type}</p>
            <p style={{ fontSize: '20px' }}>Expiration: {getFullDate}</p>
            <p style={{ fontSize: '20px' }}>Days Until Expiration: {renewal.needsRenew}</p>
            <p style={{ fontSize: '20px' }}>Cost to Renew: ${renewal.cost}</p>
            <p style={{ fontSize: '20px' }}> AutoRenew Enabled? <input name="autoRenew" type="checkbox" label="autoRenew" defaultChecked={renewal.autoRenew} /></p>
            <a href={renewal.url} rel="noopener noreferrer" target="_blank" style={{ fontSize: '20px' }}> Link to Renew </a>
            <p></p>
            <p style={{ fontSize: '20px' }}>Instructions: {renewal.instructions}</p>
            <Button className="submit-btn" variant="outline-info" onClick={this.handleClick}>Update</Button>
            <Button className="submit-btn" variant="outline-info" onClick={this.deleteRenewal}>Delete</Button><br/>
            <p></p><br/>
            <Link to='/renewals' style={{ fontSize: '20px' }}>Back To Your Renewals List 🌻</Link>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default Renewal
