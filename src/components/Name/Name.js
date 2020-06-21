import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { TextField, Button, Paper,} from "@material-ui/core";


// class declaration for Name component
class Name extends Component {
  //local state
  state = {
    name: "",
  };
  //sets value of input to local state
  handleChange = (event, fieldName) => {
    this.setState({ [fieldName]: event.target.value }); //sets to value of targeted event
  }; //end handleChange
  //submits name to Redux state from local state and goes to next page
  submitInfo = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: "UPDATE_FEEDBACK_INFO", payload: this.state }); //sends to Redux state from local state
     this.props.history.push("/feeling"); //path to next page
  }; //end submit info
  render() {
    return (
      //materal UI Paper component
      <Paper
        style={{ borderRadius: "10%", height: "500px", width: "500px" }}
        elevation="24"
        className="feedbackBox"
      >
        <div>
          <h1>Hi there!</h1>
          <h2>To start off, what is your name?</h2>
          {/* onSubmit run submitInfo function */}
          <form onSubmit={this.submitInfo}>
            <TextField
              variant="outlined"
              required
              label="Name"
              name="name"
              // sets value of input to local state
              value={this.state.name}
              type="text"
              maxLength={1000}
              onChange={(event) => this.handleChange(event, "name")} //onChange of input values set local state
            />
            <br />
            {/* onClick tied to form element, runs submitInfo on click */}
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
} // end Name
// pull props from Redux state
const mapStateToProps = (state) => {
  return {
    feedback: state.feedback,
  };
};

export default withRouter(connect(mapStateToProps)(Name));
