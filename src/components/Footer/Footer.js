import React, { Component } from "react";

// Footer is a controlled component that renders the footer of the site
class Footer extends Component {
    // React render function
    render() {
        //grabs new Date
        let thisDate = new Date();
        //..sets it to full year format
        let thisYear = thisDate.getFullYear();
        //copyright logo saved to varable
        const copyright = "\u00A9";
        return (
            <footer className="App-footer">
                <p>
                    {/* copyright tag in footer */}
                    {copyright}  Christopher Neisen  {thisYear}
                </p>
            </footer>
        ); // end return
    } // end render
} // end class Footer

export default Footer;