import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import UpdateForm from './UpdateForm'

// import the api's url
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'

// Import axios so we can make HTTP requests
import axios from 'axios'

class RenewalUpdate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      renewal: {
        name: '',
        type: '',
        date: '',
        cost: '',
        autoRenew: false,
        url: '',
        instructions: ''
      },
      updated: false
    }
  }
  componentDidMount () {
    axios({
      url: `${apiUrl}/renewals/${this.props.match.params.id}`,
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ renewal: res.data.renewal }))
      .catch(console.error)
  }

  handleChange = event => {
    event.persist()

    this.setState(prevState => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedRenewal = Object.assign({}, prevState.renewal, updatedField)
      return { renewal: editedRenewal }
    })
  }

  handleCheck = event => {
    event.persist()
    this.setState(prevState => {
      const updatedField = { autoRenew: !prevState.renewal.autoRenew }
      const editedRenewal = Object.assign({}, prevState.renewal, updatedField)
      return { renewal: editedRenewal }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { msgAlert } = this.props
    axios({
      url: `${apiUrl}/renewals/${this.props.match.params.id}/update`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
      data: { renewal: this.state.renewal }
    })
      // if we succesfully updated the renewal, set the `updated` state to `true` to cause a redirect
      .then(res => this.setState({ updated: true }))
      .then(() => msgAlert({
        heading: 'Success!',
        message: messages.updateRenewalSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Your Renewal Was Not Updated ' + error.message,
          message: messages.updateRenewalFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { renewal, updated } = this.state
    const { handleChange, handleSubmit, handleCheck } = this

    // when the user hits submit to finish editing the renewal
    if (updated) {
      // redirect to the show page (route)
      return <Redirect to={`/renewals/${this.props.match.params.id}`} />
    }

    return (
      <div>
        <UpdateForm
          renewal={renewal}
          handleChange={handleChange}
          handleCheck={handleCheck}
          handleSubmit={handleSubmit}
          cancelPath={`/renewal/${this.props.match.params.id}`}
        />
      </div>
    )
  }
}

export default RenewalUpdate
