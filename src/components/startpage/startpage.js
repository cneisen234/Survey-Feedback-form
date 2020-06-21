import React, { Component } from "react";
import { Button, Paper } from "@material-ui/core";
import { withRouter } from "react-router";
import { connect } from "react-redux";

//class decaration StartPage for component
class StartPage extends Component {
    //resets Redux state and goes to next page
    startFeedback = (event) => {
        //prevents default action
        event.preventDefault();
        this.props.dispatch({ type: "RESET_FEEDBACK" }); //resets Redux state
        this.props.history.push("/name"); //path to next page
    };
    render() {
        return (
            //material UI Paper component
            <Paper style={{ borderRadius: "10%", height: "500px", width: "500px" }} className="feedbackBox">
            <div className="App">
                <h1>Welcome to the survey!</h1>
                <h2>Click the button below to begin</h2>
                {/* onClick run startFeedback */}
                <Button onClick={this.startFeedback}
                     className="feedbackButton"
                    variant="contained"
                    color="primary"
                    type="submit">Start</Button>
            </div>
            </Paper>
        ); //end return
    } //end render
} //end StartPage

export default withRouter(connect()(StartPage));