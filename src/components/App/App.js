//imported libraries and misc.
import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { connect } from "react-redux";
import { HashRouter as Router, Switch, Route, NavLink, } from "react-router-dom";

//Our component imports in order
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import StartPage from "../startpage/startpage";
import Name from "../Name/Name";
import Comments from "../Comments/Comments";
import Feeling from "../Feeling/Feeling";
import Support from "../Supported/Supported";
import Understanding from "../Understanding/Understanding";
import Admin from "../Admin/Admin";
// import Footer from "../Footer/Footer";

//NavLinks being used as a temp solution, will tie to next button later

// App is our app container component
class App extends Component {
  // componentDidMount() {
  //   // react Component method
  //   this.refreshPizzas();
  // }

	// // refreshPizzas gets the pizzas from the database and adds them to the Redux state
  // refreshPizzas = () => {
	// 	// grab the dispatch function from props
	// 	const { dispatch } = this.props;
		
	// 	// axios server request
  //   axios.get("/api/pizza")
  //     .then((response) => {
  //       dispatch({ type: "GET_PIZZAS", payload: response.data });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }; // end refreshPizzas

	// React render function
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/admin">
              <Admin />
            </Route>
            <Route exact path="/">
              <StartPage />
            </Route>
            <Route exact path="/name">
              <Name />
            </Route>
            <Route exact path="/feeling">
              <Feeling />
            </Route>
            <Route exact path="/understanding">
              <Understanding />
            </Route>
            <Route exact path="/support">
              <Support />
            </Route>
            <Route exact path="/comments">
              <Comments />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    ); // end return
  } // end render
} // end App

export default connect()(App);

