import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

// Profile component takes in User props and sets state
class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: this.props.user
    }
  }

  render () {
    // Setting and formatting Account created date
    const { user } = this.state
    const date = new Date(user.createdAt)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString()
    const day = date.getDate()
    const getFullDate = month + '/' + day + '/' + year

    return (
      <div className="profile">
        <Card border="info" style={{ width: '30rem', margin: 'auto', textAlign: 'center' }}>
          <img className="card-img-top" src="images.png" style={{ width: '10rem' }}></img>
          <Card.Body>
            <Card.Title style={{ textAlign: 'center', fontSize: '25px' }}>{user.username}</Card.Title>
            <p>Email: {user.email}</p>
            <p>Location: {user.location}</p>
            <p>Account Created: {getFullDate}</p>
            <Link to='/' style={{ fontSize: '20px' }}>Back To Home 🌻</Link>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default Profile
