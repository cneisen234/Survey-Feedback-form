import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { TextField, Button, Paper } from "@material-ui/core";
import swal from "sweetalert";

//Comments component class declaration.
class Comments extends Component {
  //local state, includes toggle for final submit button
  state = {
    comments: "",
    toggle: false,
  };
  //updates state for on input change
  handleChange = (event, fieldName) => {
    this.setState({ [fieldName]: event.target.value });
  }; //end handleChange

  //final confirmation function, POSTS all info to database
  confirmFeedback = (event) => {
    //grabs all keys in Redux state
    const { feeling, support, understanding, comments, name } = this.props.feedback;
    const submitFeedback = { ...this.props.feedback };
    //sweet alerts
    swal({
      //confirmation page exists in sweet alerts notification
      title: "Confirm your feedback",
      text: `Thank you ${name}! please confirm you're feedback below:
        How are you feeling today? ${feeling}
        How well are you understanding the content? ${understanding}
        How well are you being supported? ${support}
        Any comments you want to leave? ${comments}
        click "ok" to confirm`,
      icon: "info",
      buttons: true,
      dangerMode: true,
      //end sweet alerts
    }).then((confirm) => {//start .then
      if (confirm) {
        axios({ //start axios
          method: "POST",
          url: "/confirm",
          data: submitFeedback, //data from Redux state to POST
        }) //end axios
          .then((response) => {// start .then
    
          }) //end .then
          .catch((error) => { //start .catchError
            console.log(error);
          }); //end .catchError
          //success! Info POSTED to database
        swal("Thank you for your feedback!", {
          icon: "success",
        });
        //...else canceled
      } else {
        swal("Your feedback submission was canceled!");
      }
      this.props.history.push("/");  //returns to homepage
    });
  }; //end confirmFeedback

  submitInfo = (event) => { //function that sends comments to Redux state
    //prevents default action
     event.preventDefault();
    this.props.dispatch({ type: "UPDATE_FEEDBACK_INFO", payload: this.state }); //sends local state to Redux state
    this.setState({
      toggle: !this.state.toggle, //toggles the value of this.state.toggle
    });
  }; //end submitInfo

  //function that goes to previous page
  previous = (event) => {
    // prevents default action
    event.preventDefault();
    this.props.history.push("/support"); //goes back to previous page
  };
  render() {
    // grabs name and support from Redux state
    const { name, support } = this.props.feedback
    return (
      // materal UI Paper component
      <Paper style={{ borderRadius: "10%", height: "500px", width: "500px" }} elevation="24" className="feedbackBox">
      <div>
             {support > 3 ? (
              //if score is greater then 3 render first message
            <h1>I'm glad we were able to support you {name}!</h1>
          ) : (
            //...else render second message
              <h1>Oh no! Sorry you didn't feel supported {name}! Please let us know if we can help.</h1>
            )}
          <h2>Do you have any feedback for us?</h2>
          <h3>please fill out any feedback you have for us below</h3>
          {/*form info start */}
        <form onSubmit={this.submitInfo}>
          <TextField
            variant="outlined"
            label="feedback?"
            name="Comments"
            // value of local state as text value
            value={this.state.comments}
            type="text"
            maxLength={1000}
            //runs handleChange on input change
            onChange={(event) => this.handleChange(event, "comments")}
          /><br/>
          {/* button to submit comments */}
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
          //renders empty div if this.state.toggle === false
          <div></div>
        ) : (
          // ...else renders our final confirmation button
          <Button
          // onClick run confirmFeedback function
            onClick={this.confirmFeedback}
            id="submitForm"
            variant="contained"
            color="primary"
            type="submit"
          >
            Click to Confirm 
          </Button>
        )}
          <br /> <br />{/* line breaks for spacing between buttons */}
          {/* onClick run previous function */}
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
} //end Comments
// pull props from Redux state
const mapStateToProps = (state) => {
  return {
    feedback: state.feedback,
  };
};

export default withRouter(connect(mapStateToProps)(Comments));
