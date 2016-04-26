// modules/Repo.js

import React from 'react'

export default React.createClass({
	render(){
		return(
			<div>
				<h2>{this.props.params.reponame}</h2>
			</div>
		)
	}
})