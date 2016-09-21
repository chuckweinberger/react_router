import Footer from "../components/Footer";
import React, { propType } from 'react';
import Nav from "../components/Nav";


export default React.createClass({
  
  propTypes: {
    children: React.PropTypes.element.isRequired,
    location: React.PropTypes.object.isRequired
  },
                
	render: function() {
    const { location } = this.props;
    const containerStyle = {
      marginTop: "60px"
    };
    
    return (
    	<div>

        <Nav location={location} />
      
        <div class="container-fluid" style={containerStyle}>
          <div class="row">

              {this.props.children}

          </div>
          <Footer/>
        </div>

    	</div>
  	)
	}
})
