import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Input, TextField, Button, Select, MenuItem, Paper } from "@material-ui/core";

// header is a controlled component used to render the site header
class Feeling extends Component {
  state = {
    feeling: null,
  };

  handleChange = (event, fieldName) => {
    console.log(`Feeling.handleChange(${fieldName})`, event);
    this.setState({ [fieldName]: event.target.value });
  };

  submitInfo = (event) => {
    // validation is handled by the form "required" attribute
    event.preventDefault();
    this.props.history.push("/understanding");
  };
  previous = (event) => {
    // validation is handled by the form "required" attribute
    event.preventDefault();
    this.props.history.push("/name");
  };

  componentWillUnmount() {
    this.props.dispatch({ type: "UPDATE_FEEDBACK_INFO", payload: this.state });
  }
  render() {
    const {name} = this.props.feedback
    return (
      <Paper
        style={{ borderRadius: "10%", height: "500px", width: "500px" }}
        elevation="24"
        className="feedbackBox"
      >
        <div>
          <h1>Hello {name}!</h1>
          <h2>Overall how are you feeling today?</h2>
          <h3>Rate from 1 to 5</h3>
          <form onSubmit={this.submitInfo}>
            <Select
              variant="outlined"
              required
              name="Feeling"
              value={this.state.feeling}
              onChange={(event) => this.handleChange(event, "feeling")}
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
          <Button
            onClick={this.previous}
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
}

const mapStateToProps = (state) => {
  return {
    feedback: state.feedback,
  };
};

export default withRouter(connect(mapStateToProps)(Feeling));
