import React, { Component, PropTypes } from 'react'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'

import { login } from '../actions/currentUserActions'

function select(state, ownProps) {
  const isAuthenticated = (state.currentUser.currentUser && state.currentUser.currentUser.loggedIn) || false
  const redirect = ownProps.location.query.redirect || '/'
  return {
    isAuthenticated,
    redirect
  }
}

class LoginContainer extends Component {

    static propTypes = {
      login: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired
    };

    componentWillMount() {
      const { isAuthenticated, replace, redirect } = this.props
      if (isAuthenticated) {
        replace(redirect)
      }
    }

    componentWillReceiveProps(nextProps) {
      const { isAuthenticated, replace, redirect } = nextProps
      const { isAuthenticated: wasAuthenticated } = this.props

      if (!wasAuthenticated && isAuthenticated) {
        replace(redirect)
      }
    }

    onClick = (e) => {
      e.preventDefault()
      this.props.login({
        username: this.refs.username.value,
        password: this.refs.password.value,
        isAdmin: this.refs.admin.checked
      })
    };

    render() {
      return (
        <div>
          <h2>Enter your username</h2>
          <input type="text" ref="username" />
          <br/>
          <h2>Enter your password</h2>
          <input type="password" ref="password" />
          <br/>
          {'Admin?'}
          <input type="checkbox" ref="admin" />
          <br/>
          <button onClick={this.onClick}>Login</button>
        </div>
      )
    }

}

export default connect(select, { login, replace: routerActions.replace })(LoginContainer)