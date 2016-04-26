//pages/About.js
import React from 'react';
import NavLink from '../components/NavLink';

export default React.createClass({
	render() {
		return (
			<div>
				<h3>Repos</h3>
				<ul>
					<li><NavLink to="/repos/reactjs/react-router">React Router</NavLink></li>
					<li><NavLink to="/repos/facebppl/react">Facebook React</NavLink></li>
				</ul>

				{this.props.children}
			</div>
		)
	}
})