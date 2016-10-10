
import { IndexLink, Link } from 'react-router'
import React from "react"
import { logout, login } from '../actions/currentUserActions'
import { connect } from 'react-redux'

const mapStateToProps = (store) => {
  return{
    currentUser: store.currentUser
  }
}
  
@connect(mapStateToProps, { logout, login })

export default class Nav extends React.Component {
  

  constructor() {
    super()
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }
  
  loginClick = (e) => {
    e.preventDefault()
    this.props.login({
      username: this.refs.username.value,
      password: this.refs.password.value
    })
  }

  render() {
    const { currentUser, location, logout } = this.props;
    const { collapsed } = this.state
    const dashClass = location.pathname === "/" ? "active" : ""
    const usersClass = location.pathname.match(/^\/user/) ? "active" : ""
    const storiesClass = location.pathname.match(/^\/stories/) ? "active" : ""
    const groupsClass = location.pathname.match(/^\/groups/) ? "active" : ""
    const navClass = collapsed ? "collapse" : ""    

    return (
      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
      
              <li class={dashClass}>
                <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Dash</IndexLink>
              </li>
              <li class={storiesClass}>
                <Link to="stories" onClick={this.toggleCollapse.bind(this)}>Stories</Link>
              </li>
              <li class={usersClass}>
                <Link to="users" onClick={this.toggleCollapse.bind(this)}>Users</Link>
              </li>
              <li class={groupsClass}>
                <Link to="groups" onClick={this.toggleCollapse.bind(this)}>Groups</Link>
              </li>
            </ul>
      
            <form className={(currentUser.currentUser && currentUser.currentUser.loggedIn) ? 'hidden' : 'navbar-form navbar-right'}>
              <div class="form-group">
                <input type="text" placeholder="Username" class="form-control" ref="username"/>
                <input type="password" placeholder="Password" class="form-control" ref="password"/>
                <input type="submit" value="Login" class="btn btn-default" onClick={this.loginClick}/>
                <Link to="create_account">New Account</Link>
              </div>
            </form>
            <span>
              <button className={(currentUser.currentUser && currentUser.currentUser.loggedIn) ? 'navbar-form navbar-right' : 'hidden'} onClick={() => logout(currentUser)}>Logout</button>
            </span>
          </div>
        </div>
      </nav>
    );
  }
}
