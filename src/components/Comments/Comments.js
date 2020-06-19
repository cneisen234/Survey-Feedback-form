import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Input, TextField, Button, Select, MenuItem } from "@material-ui/core";
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
    this.props.history.push("/");
    const { feeling, supported, understanding, comments } = this.props.feedback;
    swal({
      title: "Are you sure?",
      text: `You're feedback:
        How are you feeling today? ${feeling}
        How well are you understanding the content? ${understanding}
        How well are you being supported? ${supported}
        Any comments you want to leave? ${comments}
        click "ok" to confirm`,
      icon: "confirm",
      buttons: true,
      dangerMode: true,
    }).then((confirm) => {
      if (confirm) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  submitInfo = (event) => {
     event.preventDefault();
    this.props.dispatch({ type: "UPDATE_FEEDBACK_INFO", payload: this.state });
    this.setState({
      toggle: !this.state.toggle,
    });
  };
  render() {
    return (
      <div className="App-header">
        <h1 className="App-title">Comments</h1>
        <form onSubmit={this.submitInfo}>
          <TextField
            variant="outlined"
            label="Comments?"
            name="Comments"
            value={this.state.comments}
            placeholder="Do you have any feedback for us?"
            type="text"
            maxLength={1000}
            onChange={(event) => this.handleChange(event, "comments")}
          />
          <Button
            id="comments"
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit Feedback
          </Button>
        </form>
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
      </div>
    ); // end return
  } // end render
}

const mapStateToProps = (state) => {
  return {
    feedback: state.feedback,
  };
};

export default withRouter(connect(mapStateToProps)(Comments));
