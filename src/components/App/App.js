import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'

import Renewal from '../Renewal/Renewal'
import Renewals from '../Renewal/Renewals'
import RenewalCreate from '../Renewal/RenewalCreate'
import RenewalUpdate from '../Renewal/RenewalUpdate'
import GettingStarted from '../Renewal/GettingStarted'
import Profile from '../Renewal/Profile'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          {/* Authentication Routes */}
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />

          {/* Renewal Routes */}
          <AuthenticatedRoute user={user} exact path='/profile' render={() => (
            <Profile user={user} />
          )} />
          {/* <AuthenticatedRoute user={user} exact path='/how-to' render={() => (
            <GettingStarted user={user} />
          )} /> */}
          <AuthenticatedRoute user={user} exact path='/' render={() => (
            <GettingStarted user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/renewals' render={() => (
            <Renewals msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/renewals/:id' render={({ match }) => (
            <Renewal msgAlert={this.msgAlert} user={user} match={match} />
          )} />
          <AuthenticatedRoute user={user} path='/renewals-create' render={({ match }) => (
            <RenewalCreate user={user} match={match} msgAlert={this.msgAlert}/>
          )} />
          <AuthenticatedRoute user={user} path='/renewals/:id/update' render={({ match }) => (
            <RenewalUpdate user={user} match={match} msgAlert={this.alert}/>
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
