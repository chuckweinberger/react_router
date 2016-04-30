
import { IndexLink, Link } from 'react-router'
import NavLink from '../components/NavLink'
import React from "react";

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

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const dashClass = location.pathname === "/" ? "active" : "";
    const usersClass = location.pathname.match(/^\/user/) ? "active" : "";
    const storiesClass = location.pathname.match(/^\/stories/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";
    

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
      
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}