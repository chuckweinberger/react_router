// modules/Repo.js

import React from 'react'

export default React.createClass({
	render(){ 
    const { params } = this.props;
    
    console.log(params)
		return(
			<div>
				<h2>{params.reponame}</h2>
			</div>
		)
	}
})