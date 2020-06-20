import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Input, TextField, Button, Select, MenuItem, Paper } from "@material-ui/core";
import swal from "sweetalert";

// header is a controlled component used to render the site header
class Comments extends Component {
  state = {
    comments: "",
    toggle: false,
  };
  handleChange = (event, fieldName) => {
    console.log(`Comments.handleChange(${fieldName})`, event);
    this.setState({ [fieldName]: event.target.value });
  };

  confirmFeedback = (event) => {
    const { feeling, support, understanding, comments } = this.props.feedback;
    const submitFeedback = { ...this.props.feedback };
    console.log("submitFeedback", submitFeedback)
    swal({
      title: "Confirm your feedback",
      text: `You're feedback:
        How are you feeling today? ${feeling}
        How well are you understanding the content? ${understanding}
        How well are you being supported? ${support}
        Any comments you want to leave? ${comments}
        click "ok" to confirm`,
      icon: "info",
      buttons: true,
      dangerMode: true,
    }).then((confirm) => {
      if (confirm) {
        axios({
          method: "POST",
          url: "/confirm",
          data: submitFeedback,
        }) //end axios
          .then((response) => {
            // reset the current order data
            // this.props.dispatch({ type: "RESET_ORDER" });
            // go back to the starting order page
          }) //end .thenresponse
          .catch((error) => {
            console.log(error);
          }); //end .catchError
        swal("Thank you for your feedback!", {
          icon: "success",
        });
      } else {
        swal("Your feedback submission was canceled!");
      }
      this.props.history.push("/");
    });
  };

  submitInfo = (event) => {
     event.preventDefault();
    this.props.dispatch({ type: "UPDATE_FEEDBACK_INFO", payload: this.state });
    this.setState({
      toggle: !this.state.toggle,
    });
  };

  previous = (event) => {
    // validation is handled by the form "required" attribute
    event.preventDefault();
    this.props.history.push("/support");
  };
  render() {
    return (
      <Paper style={{ borderRadius: "10%", height: "500px", width: "500px" }} elevation="24" className="feedbackBox">
      <div>
          <h1>Do you have any feedback for us?</h1>
          <h2>We'd love to hear from you</h2>
          <h3>please fill out any feedback you have for us below</h3>
        <form onSubmit={this.submitInfo}>
          <TextField
            variant="outlined"
            label="feedback?"
            name="Comments"
            value={this.state.comments}
            type="text"
            maxLength={1000}
            onChange={(event) => this.handleChange(event, "comments")}
          /><br/>
          <Button
            className="feedbackButton"
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit Feedback
          </Button>
        </form>
        <br/>
        {this.state.toggle === false ? (
          <div></div>
        ) : (
          <Button
            onClick={this.confirmFeedback}
            id="submitForm"
            variant="contained"
            color="primary"
            type="submit"
          >
            Click to Confirm 
          </Button>
        )}
          <br /> <br />
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

export default withRouter(connect(mapStateToProps)(Comments));
