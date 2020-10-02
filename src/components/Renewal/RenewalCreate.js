import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import RenewalForm from './RenewalForm'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import messages from '../AutoDismissAlert/messages'

// RenewalCreate component takes in User props and sets state to create new renewal
class RenewalCreate extends Component {
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

  handleCheck = event => {
    event.persist()
    this.setState(prevState => {
      const updatedField = { autoRenew: !prevState.renewal.autoRenew }
      const editedRenewal = Object.assign({}, prevState.renewal, updatedField)
      return { renewal: editedRenewal }
    //   if (this.state.renewal.autoRenew === false) {
    //     this.setState({ autoRenew: true }
    //     )
    //   } else {
    //     return this.setState({ autoRenew: false })
    //   }
    // })
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
        const renewal = res.data.renewals.find((element) => {
          return element.name === this.state.renewal.name
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
    // axios({
    //   url: `${apiUrl}/renewals`,
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${this.props.user.token}`
    //   },
    //   data: { renewal: this.state.renewal }
    // })
    // }
      // })
      // })
      // .then((res) => {
      //   this.setState({ createdId: res.data.renewal._id })
      // })
      .then((res) => {
        if (res.status === 201) {
          this.setState({ createdId: res.data.renewal._id })
        } else if (res.status === 204) {
          this.setState({ updated: true })
        }
      })
      .then((res) => {
        if (this.state.updated === true) {
          msgAlert({
            heading: 'Success!',
            message: messages.updateRenewalSuccess,
            variant: 'success'
          })
        } else {
          msgAlert({
            heading: 'Success!',
            message: messages.createRenewalSuccess,
            variant: 'success'
          })
        }
      })
      .catch(error => {
        msgAlert({
          heading: 'Created Renewal Failed ' + error.message,
          message: messages.createRenewalFailure,
          variant: 'danger'
        })
      }
      )
  }

  render () {
    const { createdId, updated, renewal } = this.state
    const { handleChange, handleSubmit, handleCheck } = this

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
          handleCheck={handleCheck}
          handleSubmit={handleSubmit}
          cancelPath='/renewals'
        />
      </div>
    )
  }
}

export default RenewalCreate
