import React, { Component } from "react";

// Header is a controlled component that renders the header of the site
class Header extends Component {
  // React render function
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Feedback!</h1>
          <h4>
            <i>Don't forget it!</i>
          </h4>
        </header>
        <br />
      </div>
    );
  }
}

export default Header;
