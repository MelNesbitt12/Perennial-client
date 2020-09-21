import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import RenewalForm from './RenewalForm'

// import the api's url
import apiUrl from '../../apiConfig'
// import messages from '../AutoDismissAlert/messages'

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
        url: ''
      },
      updated: false
    }
  }

  handleChange = event => {
    event.persist()

    this.setState(prevState => {
      const updatedField = { [event.target.name]: event.target.value }

      const editedRenewal = Object.assign({}, prevState.renewal, updatedField)

      return { renewal: editedRenewal }
    })
  }

  handleSubmit = event => {
    // prevent the page from refreshing
    event.preventDefault()
    // const { msgAlert } = this.props
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
      .catch(console.error)
  }

  render () {
    const { renewal, updated } = this.state
    const { handleChange, handleSubmit } = this

    // when the user hits submit to finish editing the renewal
    if (updated) {
      // redirect to the show page (route)
      return <Redirect to={`/renewals/${this.props.match.params.id}`} />
    }

    return (
      <div>
        <RenewalForm
          renewal={renewal}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath={`/renewal/${this.props.match.params.id}`}
        />
      </div>
    )
  }
}

export default RenewalUpdate
