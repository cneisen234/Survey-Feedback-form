import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Input, TextField, Button, Select, MenuItem, Paper } from "@material-ui/core";

// header is a controlled component used to render the site header
class Understanding extends Component {
  state = {
    understanding: null,
  };

  handleChange = (event, fieldName) => {
    console.log(`Understanding.handleChange(${fieldName})`, event);
    this.setState({ [fieldName]: event.target.value });
  };

  submitInfo = (event) => {
    // validation is handled by the form "required" attribute
    event.preventDefault();
    this.props.history.push("/support");
  };

  previous = (event) => {
    // validation is handled by the form "required" attribute
    event.preventDefault();
    this.props.history.push("/feeling");
  };

  componentWillUnmount() {
    this.props.dispatch({ type: "UPDATE_FEEDBACK_INFO", payload: this.state });
  }

  render() {
    return (
      <Paper style={{ borderRadius: "10%", height: "500px", width: "500px"}} elevation="24" className="feedbackBox">
      <div>
        <h1>How well did you understand?</h1>
        <h2>Rate your understanding of this week's content</h2>
        <h3>Rate from 1 to 5</h3>
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
}

const mapStateToProps = (state) => {
  return {
    feedback: state.feedback,
  };
};

export default withRouter(connect(mapStateToProps)(Understanding));
