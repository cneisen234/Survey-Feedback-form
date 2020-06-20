import React, { Component } from "react";
import "./Admin.css";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";
import FlagIcon from "@material-ui/icons/Flag";
import EmojiFlagsIcon from "@material-ui/icons/EmojiFlags";

// Admin represents a hidden view for the establishment owner so they can see 
// and manage current orders
class Admin extends Component {
  componentDidMount() {
    this.refreshFeedback();
  }

//   confirmFeedback = (event) => {
//     const { flagged } = this.props.feedback;
//     const submitFeedback = { ...this.props.feedback };
//     console.log("submitFeedback", submitFeedback);
//     swal({
//       title: "Confirm your feedback",
//       text: `You're feedback:
//         How are you feeling today? ${feeling}
//         How well are you understanding the content? ${understanding}
//         How well are you being supported? ${support}
//         Any comments you want to leave? ${comments}
//         click "ok" to confirm`,
//       icon: "confirm",
//       buttons: true,
//       dangerMode: true,
//     }).then((confirm) => {
//       if (confirm) {
//         axios({
//           method: "POST",
//           url: "/confirm",
//           data: submitFeedback,
//         }) //end axios
//           .then((response) => {
//             // reset the current order data
//             // this.props.dispatch({ type: "RESET_ORDER" });
//             // go back to the starting order page
//           }) //end .thenresponse
//           .catch((error) => {
//             console.log(error);
//           }); //end .catchError
//         swal("Thank you for your feedback!", {
//           icon: "success",
//         });
//       } else {
//         swal("Your feedback submission was canceled!");
//       }
//       this.props.history.push("/");
//     });
//   };

  //GETs list of orders from database and puts them in the Redux state
  refreshFeedback = () => {
    const { dispatch } = this.props;
    axios
      .get("/confirm")
      .then((response) => {
        console.log(this.props.feedbackGetter.flagged);
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
          </tr>
        </thead>
        <tbody>
          {feedbackGetter.map((admin, index) => {
            return (
              <tr key={`Admin-${index}`}>
                <td>{admin.feeling}</td>
                <td>{admin.understanding}</td>
                <td>{admin.support}</td>
                <td>{admin.comments}</td>
                <td>
                  <EmojiFlagsIcon />
                </td>{" "}
                {console.log("admin.flagged", admin.flagged)}
                <td>{moment(admin.date).format("MMMM Do YYYY")}</td>
              </tr>
            );
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