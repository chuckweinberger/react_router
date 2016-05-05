import Footer from "../components/Footer";
import React from "react";
import Nav from "../components/Nav";


export default React.createClass({
  
                
	render() {
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
