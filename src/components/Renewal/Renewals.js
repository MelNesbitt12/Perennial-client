import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'

import axios from 'axios'

// Renewals Index Component (show all user renewals)
class Renewals extends Component {
  constructor (props) {
    super(props)

    // setup our initial state
    this.state = {
      // we have zero renewals, until our API request has finished
      renewals: []
      // deleted: false
    }
  }

  // this is called whenever our component is created and inserted
  // into the DOM (first appears)
  componentDidMount () {
    // make a GET request for all of the user's renewals
    const { msgAlert } = this.props
    axios({
      url: (`${apiUrl}/renewals`),
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })

      .then((res) => {
        this.setState({ renewals: res.data.renewals })
        if (res.data.renewals.length === 0) {
          msgAlert({
            heading: 'Empty',
            message: messages.inventoryEmpty,
            variant: 'danger'
          })
        } else if (res) {
          msgAlert({
            heading: 'Success!',
            message: messages.indexRenewalSuccess,
            variant: 'success'
          })
        }
      })

      .catch(error => {
        msgAlert({
          heading: 'Failure' + error.message,
          message: messages.indexRenewalFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const renewals = this.state.renewals.map(renewal => {
      const date = new Date(renewal.date)
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString()
      const day = date.getDate()
      const fullDate = month + '/' + day + '/' + year
      return (
        <li key={renewal._id}>
          <Link to={`/renewals/${renewal._id}`}>
            {renewal.name}
          </Link><br/>
          <p>Expiration: {fullDate}</p>
        </li>
      )
    })

    return (
      <div className="renewals">
        <h2>Renewals</h2><br/>
        <p> </p>
        <p> </p>
        <ul>
          {renewals}
        </ul>
      </div>
    )
  }
}

export default Renewals
