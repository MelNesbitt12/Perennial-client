import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
import Card from 'react-bootstrap/Card'

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
      return <Redirect to={{ pathname: '/renewals-create' }} />
    }

    // const currentDate = new Date()
    // const currDay = currentDate.getDate()
    // const currMonth = currentDate.getMonth()
    // const currYear = currentDate.getYear()
    // const todaysDate = (currMonth + '/' + currDay + '/' + currYear)
    // console.log(todaysDate)

    const date = new Date(renewal.date)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString()
    const day = date.getDate()
    const getFullDate = month + '/' + day + '/' + year

    return (
      <div className="renewal">
        <Card border="info" style={{ width: '30rem', margin: 'auto', textAlign: 'center' }}>
          <Card.Body>
            <Card.Title>{renewal.name}</Card.Title><br/>
            <p> </p>
            <p>Type: {renewal.type}</p>
            <p>Expiration: {getFullDate}</p>
            <p>Days Until Expiration: </p>
            <p>Cost to Renew: ${renewal.cost}</p>
            <p>Link to Renew: {renewal.url} </p>
            <button onClick={this.handleClick}>Update</button>
            <button onClick={this.deleteRenewal}>Delete</button><br/>
            <p></p><br/>
            <Link to='/renewals'>Back To Your Renewals List 📋</Link>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default Renewal
