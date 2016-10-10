import React, { Component, PropTypes } from 'react'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'

import { createNewAccount } from '../actions/currentUserActions'

function mapStateToProps(state, ownProps) {
  const isAuthenticated = (state.currentUser.currentUser && state.currentUser.currentUser.loggedIn) || false
  const redirect = ownProps.location.query.redirect || '/'
  return {
    isAuthenticated,
    redirect
  }
}

class CreateAccountContainer extends Component {

    static propTypes = {
      createNewAccount: PropTypes.func.isRequired,
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
      this.props.createNewAccount({
        username: this.refs.username.value,
        email: this.refs.email.value,
        password: this.refs.password.value,
        firstname: this.refs.firstname.value,
        lastname: this.refs.lastname.value
      })
    };

    render() {
      return (
        <div>
          <form>
            <div class="form-group">
              <input ref="firstname" type="text" placeholder="First Name" class="form-control"/>
              <input ref="lastname" type="text" placeholder="Last Name" class="form-control"/>
            </div>
            <div class="form-group">
              <input ref="username" type="text" placeholder="Username" class="form-control"/>
            </div>
            <div class="form-group">
              <input ref="email" type="email" placeholder="email address" class="form-control"/>
            </div>
            <div class="form-group">
              <input ref="password" type="password" placeholder="Password" class="form-control"/>
            </div>
            <div class="form-group">
              <input name="confirm_password" type="password" placeholder="Confirm Password" class="form-control"/>
            </div>
            <button onClick={this.onClick}>Create Account</button>
          </form>
        </div>
      )
    }

}

export default connect(mapStateToProps, { createNewAccount, replace: routerActions.replace })(CreateAccountContainer)