import React, { Component } from "react";
import "./Admin.css";
import { connect } from "react-redux";
import axios from "axios";
import swal from "sweetalert";
import Adminitem from "../adminitem/adminitem";

// Admin represents a hidden view for the establishment owner so they can see 
// and manage current orders
class Admin extends Component {
  //loads database info on page load
  componentDidMount() {
    this.refreshFeedback();
  }

  flagForReview = (event) => {
    //prevents default action
      event.preventDefault();
    const { id } = this.props.feedbackGetter;
    //start sweet alerts
    swal({
      title: "Flag this review?",
      text: `Did you want to report this review?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
      //end sweet alerts
    }).then((confirm) => {
      if (confirm) {
        axios({//start axios
          method: "PUT",
          url: `/confirm/${id}`
        }) //end axios
          .then((response) => {//start .then
            
          }) //end .then
          .catch((error) => {//start .catchError
            console.log(error);
          }); //end .catchError
          //sweet alert for success
        swal("This review has been flagged!", {
          icon: "success",
        });
      } else {
        //...else cancel
        swal("Flag request has been canceled!");
      }
    });
  };//end flagForReview

  //GETs list of reviews from database and places them in the Redux state
  refreshFeedback = () => {
    //grabs dispatch
    const { dispatch } = this.props;
    axios
      .get("/confirm")//axios start
      .then((response) => {//.start .then
        // response.data will be the array of reviews
        dispatch({ type: "SET_ALL_FEEDBACK", payload: response.data }); 
        //grabs info from database and sends it to Redux state
      }) // end .then
      .catch((error) => {// start catchError
        console.log(error);
      });// end catchError
  }; //end refreshFeedback

  // React render function
  render() {
    const { feedbackGetter } = this.props;
    return (
      <table id="adminTable">
        <thead>
          <tr>
            {/* table headers for admin display */}
            <th>Name</th>
            <th>Feeling</th>
            <th>Understanding</th>
            <th>Supported</th>
            <th>Comments</th>
            <th>Flag</th>
            <th>Date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* maps through Redux state and returns into Adminitem component */}
          {feedbackGetter.map((admin, index) => {
            // sets admin to props and gives Adminitem access to everything in admin
            return <Adminitem key={index} admin={admin} refreshFeedback={this.refreshFeedback} />;
          })}
        </tbody>
      </table>
    );
  }
}

// pull props from Redux state
const mapStateToProps = (state) => {
    return {
        feedbackGetter: state.feedbackGetter,
    };
};

export default connect(mapStateToProps)(Admin);