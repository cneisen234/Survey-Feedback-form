import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button, Select, MenuItem, Paper } from "@material-ui/core";

// class decaration for Support
class Support extends Component {
  //local state
  state = {
    support: null,
  };
  //sets state to target value
  handleChange = (event, fieldName) => {
    this.setState({ [fieldName]: event.target.value });
  };
  //goes to next page
  submitInfo = (event) => {
     //prevents default action
    event.preventDefault();
    this.props.history.push("/comments"); //path to next page
  };
  //goes to previous page
  previous = (event) => {
     //prevents default action
    event.preventDefault();
    this.props.history.push("/understanding"); //path to previous page
  };
 //sends local state to Redux state when user leaves that page
  componentWillUnmount() {
    this.props.dispatch({ type: "UPDATE_FEEDBACK_INFO", payload: this.state }); //sends to Redux state
  }
  render() {
     //grabs name and understanding out of Redux state
    const { name, understanding } = this.props.feedback
    return (
      //materal UI Paper component
      <Paper style={{ borderRadius: "10%", height: "500px", width: "500px" }} elevation="24" className="feedbackBox">
      <div>
          {understanding > 3 ? (
             //if score is greater then 3 render first message
            <h1>I'm glad to hear you understand {name}!</h1>
          ) : (
             //...else render second message
              <h1>Shoot! I'm sorry the content wasn't clear {name}!</h1>
            )}
          <h2>Rate your satisfaction of the support you received</h2>
          <h3>Rate from 1 to 5</h3>
          {/* onClick go to next page, also sends to Redux state via componentWillUnmount */}
        <form onSubmit={this.submitInfo}>
          <Select
            variant="outlined"
            required
            name="Support"
             //sets value of input to value of local state
            value={this.state.support}
              onChange={(event) => this.handleChange(event, "support")} //sends input values to local state
          >
              {/* select items 1 - 5 */}
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="1">1</MenuItem>
          </Select>
            {/* button tied to form, onClick gets passed here */}
          <Button
            className="feedbackButton"
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit Feedback
          </Button>
        </form>
          <br /> <br /> <br /> <br /> {/* line breaks for spacing*/}
          {/* onClick run previous */}
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
} // end class Supported
// pull props from Redux state
const mapStateToProps = (state) => {
  return {
    feedback: state.feedback,
  };
};

export default withRouter(connect(mapStateToProps)(Support));
