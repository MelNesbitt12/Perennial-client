import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import RenewalForm from './RenewalForm'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import messages from '../AutoDismissAlert/messages'

class RenewalCreate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      renewal: {
        name: '',
        type: '',
        date: '',
        cost: '',
        url: '',
        instructions: ''
      },
      createdId: null,
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

  handleSubmit = (event) => {
    event.preventDefault()
    const { msgAlert } = this.props
    axios({
      url: `${apiUrl}/renewals`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(res => {
        const renewal = res.data.renewals.find((renewal) => {
          return renewal.name === this.state.renewal.name
        })
        if (renewal) {
          return axios({
            url: `${apiUrl}/renewals/${renewal._id}/update`,
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${this.props.user.token}`
            },
            data: { renewal: this.state.renewal }
          })
        } else {
          return axios({
            url: `${apiUrl}/renewals`,
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${this.props.user.token}`
            },
            data: { renewal: this.state.renewal }
          })
        }
      })
      .then((res) => {
        if (res.status === 201) {
          this.setState({ createdId: res.data.renewal._id })
        } else if (res.status === 204) {
          this.setState({ updated: true })
        }
      })
      .catch((error) => {
        if (error.response.status === 422) {
          return msgAlert({
            heading: 'All Fields Required!',
            message: messages.updateRenewalFailure,
            variant: 'danger'
          })
        }
      })
  }

  render () {
    const { renewal, createdId, updated } = this.state
    const { handleChange, handleSubmit } = this

    if (createdId) {
      return <Redirect to={`/renewals/${createdId}`} />
    } else if (updated) {
      return <Redirect to={'/renewals'} />
    }

    return (
      <div>
        <RenewalForm
          renewal={renewal}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath='/'
        />
      </div>
    )
  }
}

export default RenewalCreate
