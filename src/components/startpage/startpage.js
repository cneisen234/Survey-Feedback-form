import React, { Component } from "react";
import { Input, TextField, Button, Select, MenuItem, Paper } from "@material-ui/core";
import { withRouter } from "react-router";
import { connect } from "react-redux";

class StartPage extends Component {
    startFeedback = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: "RESET_FEEDBACK" });
        this.props.history.push("/name");
    };
    render() {
        return (
            <Paper style={{ borderRadius: "10%", height: "500px", width: "500px" }} className="feedbackBox">
            <div className="App">
                <h1>Welcome to the survey!</h1>
                <h2>Click the button below to begin</h2>
                <Button onClick={this.startFeedback}
                     className="feedbackButton"
                    variant="contained"
                    color="primary"
                    type="submit">Start</Button>
            </div>
            </Paper>
        );
    }
}

export default withRouter(connect()(StartPage));