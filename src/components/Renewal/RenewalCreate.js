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
        url: ''
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
      // url: `${apiUrl}/items`,
      // method: 'POST',
      // headers: {
      //   'Authorization': `Bearer ${this.props.user.token}`
      // },
      // data: { item: this.state.item }
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
        if (error.response.status === 420) {
          return msgAlert({
            heading: 'You can\'t have negative values 😱',
            message: messages.updateItemFailure,
            variant: 'danger'
          })
        }
      })

    // .then(res => this.setState({ createdId: res.data.item._id }))
    // .then(() => msgAlert({
    //   heading: 'Create Item Success',
    //   message: messages.createItemSuccess,
    //   variant: 'success'
    // }))
    // .catch(console.error)
    // .catch(error => {
    //   msgAlert({
    //     heading: 'Create Item Failure' + error.message,
    //     message: messages.createItemFailure,
    //     variant: 'danger'
    //   })
    // })
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
