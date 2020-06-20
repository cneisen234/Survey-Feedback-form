import React, { Component } from "react";
import "./Admin.css";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";
import FlagIcon from "@material-ui/icons/Flag";
import EmojiFlagsIcon from "@material-ui/icons/EmojiFlags";
import swal from "sweetalert";
import Adminitem from "../adminitem/adminitem";

// Admin represents a hidden view for the establishment owner so they can see 
// and manage current orders
class Admin extends Component {
  componentDidMount() {
    this.refreshFeedback();
  }

  flagForReview = (event) => {
      event.preventDefault();
    const { id } = this.props.feedbackGetter;
    const flagged = { ...this.props.feedbackGetter };
    console.log("flagged", flagged)
    // for (let flag of flagged) {
    //     console.log("flag", flag);
    // }
    
    
    swal({
      title: "Flag this review?",
      text: `Did you want to report this review?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((confirm) => {
      if (confirm) {
        axios({
          method: "PUT",
          url: `/confirm/${id}`
        }) //end axios
          .then((response) => {
            // reset the current order data
            // this.props.dispatch({ type: "RESET_ORDER" });
            // go back to the starting order page
          }) //end .thenresponse
          .catch((error) => {
            console.log(error);
          }); //end .catchError
        swal("This review has been flagged!", {
          icon: "success",
        });
      } else {
        swal("Flag request has been canceled!");
      }
    });
  };

  //GETs list of orders from database and puts them in the Redux state
  refreshFeedback = () => {
    const { dispatch } = this.props;
    axios
      .get("/confirm")
      .then((response) => {
        console.log("this.props.feedbackGetter.flagged", this.props.feedbackGetter.flagged);
        // response.data will be the array of orders
        dispatch({ type: "SET_ALL_FEEDBACK", payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }; //end refreshOrders

  // React render function
  render() {
    const { feedbackGetter } = this.props;
    return (
      <table id="adminTable">
        <thead>
          <tr>
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
          {feedbackGetter.map((admin, index) => {
            return <Adminitem key={index} admin={admin} />;
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