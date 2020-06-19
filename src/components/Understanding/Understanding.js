import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Input, TextField, Button, Select, MenuItem } from "@material-ui/core";

// header is a controlled component used to render the site header
class Understanding extends Component {
  state = {
    understanding: 5,
  };

  handleChange = (event, fieldName) => {
    console.log(`Understanding.handleChange(${fieldName})`, event);
    this.setState({ [fieldName]: event.target.value });
  };

  submitInfo = (event) => {
    // validation is handled by the form "required" attribute
    event.preventDefault();
    this.props.history.push("/supported");
  };

  componentWillUnmount() {
    this.props.dispatch({ type: "UPDATE_FEEDBACK_INFO", payload: this.state });
  }

  render() {
    return (
      <div className="App-header">
        <h1 className="App-title">Understanding</h1>
        <form onSubmit={this.submitInfo}>
          <Select
            variant="outlined"
            required
            name="understanding"
            value={this.state.understanding}
            onChange={(event) => this.handleChange(event, "understanding")}
          >
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="1">1</MenuItem>
          </Select>
          <Button
            id="understanding"
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit Feedback
          </Button>
        </form>
      </div>
    ); // end return
  } // end render
}

const mapStateToProps = (state) => {
  return {
    feedback: state.feedback,
  };
};

export default withRouter(connect(mapStateToProps)(Understanding));
