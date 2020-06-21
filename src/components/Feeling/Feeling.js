import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button, Select, MenuItem, Paper } from "@material-ui/core";

// class Componet decaration for Feeling
class Feeling extends Component {
  //local state
  state = {
    feeling: null,
  };
  //sets state to target value
  handleChange = (event, fieldName) => {
    this.setState({ [fieldName]: event.target.value });
  };
  //goes to next page
  submitInfo = (event) => {
    //prevents default action
    event.preventDefault();
    this.props.history.push("/understanding"); //path to next page
  };
  //goes to previous page
  previous = (event) => {
    //prevents default action
    event.preventDefault();
    this.props.history.push("/name"); //path to previous page
  };
  //sends local state to Redux state when user leaves that page
  componentWillUnmount() {
    this.props.dispatch({ type: "UPDATE_FEEDBACK_INFO", payload: this.state }); //sends to Redux state
  }
  render() {
    //grabs name out of Redux state
    const {name} = this.props.feedback
    return (
      //materal UI Paper component
      <Paper
        style={{ borderRadius: "10%", height: "500px", width: "500px" }}
        elevation="24"
        className="feedbackBox"
      >
        <div>
          <h1>Hello {name}!</h1>
          <h2>Overall how are you feeling today?</h2>
          <h3>Rate from 1 to 5</h3>
          {/* onClick go to next page, also sends to Redux state via componentWillUnmount */}
          <form onSubmit={this.submitInfo}>
            <Select
              variant="outlined"
              required
              name="Feeling"
              //sets value of input to value of local state
              value={this.state.feeling}
              onChange={(event) => this.handleChange(event, "feeling")} //sends input values to local state
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
          <Button
          //onClick run previous
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
} //end Feeling
// pull props from Redux state
const mapStateToProps = (state) => {
  return {
    feedback: state.feedback,
  };
};

export default withRouter(connect(mapStateToProps)(Feeling));
