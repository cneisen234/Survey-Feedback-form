import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  Input,
  TextField,
  Button,
  Select,
  MenuItem,
  Paper,
} from "@material-ui/core";
import swal from "sweetalert";

// header is a controlled component used to render the site header
class Name extends Component {
  state = {
    name: "",
  };
  handleChange = (event, fieldName) => {
    console.log(`name.handleChange(${fieldName})`, event);
    this.setState({ [fieldName]: event.target.value });
  };

  submitInfo = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: "UPDATE_FEEDBACK_INFO", payload: this.state });
     this.props.history.push("/feeling");
  };
  render() {
    return (
      <Paper
        style={{ borderRadius: "10%", height: "500px", width: "500px" }}
        elevation="24"
        className="feedbackBox"
      >
        <div>
          <h1>Hi there!</h1>
          <h2>To start off, what is your name?</h2>
          <form onSubmit={this.submitInfo}>
            <TextField
              variant="outlined"
              required
              label="Name"
              name="name"
              value={this.state.name}
              type="text"
              maxLength={1000}
              onChange={(event) => this.handleChange(event, "name")}
            />
            <br />
            <Button
              className="feedbackButton"
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit Name
            </Button>
          </form>
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

export default withRouter(connect(mapStateToProps)(Name));
