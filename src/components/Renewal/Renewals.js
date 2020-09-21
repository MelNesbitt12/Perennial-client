import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CardDeck from 'react-bootstrap/CardDeck'
import Card from 'react-bootstrap/Card'

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
      const getFullDate = month + '/' + day + '/' + year

      return (
        <div key={renewal._id}>
          <Card className="card" style={{ width: '18rem', margin: 'auto', textAlign: 'center', fontSize: '20px' }} >
            <Card.Body>
              <Link to={`/renewals/${renewal._id}`}>
                {renewal.name}
              </Link><br/>
              Expiration: {getFullDate}
            </Card.Body>
          </Card>
        </div>
      )
    })

    return (
      <div className="renewals">
        <CardDeck className="scroll" style={{ width: '30rem', margin: 'auto' }}>
          <Card style={{ width: '30rem', margin: 'auto', borderRadius: '35px', padding: '10px', borderColor: '#459342' }}>
            <Card.Body>
              <Card.Title style={{ textAlign: 'center' }}>Renewals</Card.Title><br/>
              {renewals}
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Perennial Renewal Tracker</small>
            </Card.Footer>
          </Card>
        </CardDeck>
      </div>
    )
  }
}

export default Renewals
