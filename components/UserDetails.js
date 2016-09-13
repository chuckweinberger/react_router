// components/UserDetails

import React from 'react';

    
    const UserDetails = ({ showingUserId }) => (
			<div className={showingUserId ? 'page-header' : 'hidden'}>
				<h2>Here are the details for user id {showingUserId}.</h2>
        <div class="row placeholders">
            <div class="col-xs-6 col-sm-3 placeholder">
              <h4>Label</h4>
              <span class="text-muted">Something else</span>
            </div>
            <div class="col-xs-6 col-sm-3 placeholder">
              <h4>Label</h4>
              <span class="text-muted">Something else</span>
            </div>
            <div class="col-xs-6 col-sm-3 placeholder">
              <h4>Label</h4>
              <span class="text-muted">Something else</span>
            </div>
            <div class="col-xs-6 col-sm-3 placeholder">
              <h4>Label</h4>
              <span class="text-muted">Something else</span>
            </div>
          </div>
			</div>
		)

  
  export default UserDetails