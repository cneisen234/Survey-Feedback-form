import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Input, TextField, Button, Select, MenuItem, Paper } from "@material-ui/core";

// header is a controlled component used to render the site header
class Support extends Component {
  state = {
    support: null,
  };

  handleChange = (event, fieldName) => {
    console.log(`Support.handleChange(${fieldName})`, event);
    this.setState({ [fieldName]: event.target.value });
  };

  submitInfo = (event) => {
    // validation is handled by the form "required" attribute
    event.preventDefault();
    this.props.history.push("/comments");
  };

  previous = (event) => {
    // validation is handled by the form "required" attribute
    event.preventDefault();
    this.props.history.push("/understanding");
  };

  componentWillUnmount() {
    this.props.dispatch({ type: "UPDATE_FEEDBACK_INFO", payload: this.state });
  }
  render() {
    return (
      <Paper style={{ borderRadius: "10%", height: "500px", width: "500px" }} elevation="24" className="feedbackBox">
      <div>
          <h1>How supported did you feel?</h1>
          <h2>Rate your satisfaction of the support you received</h2>
          <h3>Rate from 1 to 5</h3>
        <form onSubmit={this.submitInfo}>
          <Select
            variant="outlined"
            required
            name="Support"
            value={this.state.support}
            onChange={(event) => this.handleChange(event, "support")}
          >
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="1">1</MenuItem>
          </Select>
          <Button
            className="feedbackButton"
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit Feedback
          </Button>
        </form>
          <br /> <br /> <br /> <br />
          <Button onClick={this.previous}
            className="feedbackButton"
            variant="contained"
            color="primary"
            type="submit"
          >
            Go Back
          </Button>
      </div>
      </Paper>
    ); // end return
  } // end render
} // end class Header

const mapStateToProps = (state) => {
  return {
    feedback: state.feedback,
  };
};

export default withRouter(connect(mapStateToProps)(Support));
