import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";
import FlagIcon from "@material-ui/icons/Flag";
import EmojiFlagsIcon from "@material-ui/icons/EmojiFlags";
import swal from "sweetalert";
import {
  Input,
  TextField,
  Button,
  Select,
  MenuItem,
  Paper,
} from "@material-ui/core";


class Adminitem extends Component {
  componentDidMount() {
    this.refreshFeedback();
  }
   
  deleteReview = (event) => {
    //sweet alerts!
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this review!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        //if confirmed, delete
        if (willDelete) {
            axios({
              method: "DELETE",
              url: `/confirm/${this.props.admin.id}`,
            }).then(function (response) {
              
            });
            swal("Poof! Your review has been deleted!", {
                icon: "success",
            });
        } else {
            swal("Your review is safe!");
            return;
        }
        this.refreshFeedback();
    });
}

  flagForReview = (event) => {
      event.preventDefault();
 console.log("this.props.admin.id", this.props.admin.id)
  console.log("this.props.admin.flagged", this.props.admin.flagged);
    
    
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
          url: `/confirm/${this.props.admin.id}`,
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
        this.refreshFeedback();
    });
  };

  //GETs list of orders from database and puts them in the Redux state
  refreshFeedback = () => {
    const { dispatch } = this.props;
    axios
      .get("/confirm")
      .then((response) => {
        // response.data will be the array of orders
        dispatch({ type: "SET_ALL_FEEDBACK", payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }; //end refreshOrders
    render() {
      const {admin} = this.props
        return (
          <tr>
            <td>{admin.feeling}</td>
            <td s>{admin.understanding}</td>
            <td>{admin.support}</td>
            <td>{admin.comments}</td>
            <td onClick={this.flagForReview}>
              {admin.flagged === false ? <EmojiFlagsIcon /> : <FlagIcon />}
            </td>{" "}
            {console.log("admin.flagged", admin.flagged)}
            <td>{moment(admin.date).format("MMMM Do YYYY")}</td>
            <td>
              {
                <Button
                  onClick={this.deleteReview}
                  className="feedbackButton"
                  variant="contained"
                  color="secondary"
                  type="delete"
                >
                  Delete
                </Button>
              }
            </td>
          </tr>
        ); // end return
    } // end render
} // end class Footer
// pull props from Redux state
const mapStateToProps = (state) => {
    return {
        feedbackGetter: state.feedbackGetter,
    };
};

export default connect(mapStateToProps)(Adminitem);