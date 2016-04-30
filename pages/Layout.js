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
      
        <div class="container" style={containerStyle}>
          <div class="row">
            <div class="col-lg-12">

              {this.props.children}

            </div>
          </div>
          <Footer/>
        </div>

    	</div>
  	)
	}
})
