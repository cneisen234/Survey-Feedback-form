import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";
import FlagIcon from "@material-ui/icons/Flag";
import EmojiFlagsIcon from "@material-ui/icons/EmojiFlags";
import swal from "sweetalert";
import { withRouter } from "react-router";
import { Button } from "@material-ui/core";


class Adminitem extends Component {
  //refreshes database info on load
  componentDidMount() {
    this.props.refreshFeedback();
  }
   //deletes selected review
  deleteReview = (event) => {
    //sweet alerts!
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this review!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        //end sweet alerts
    }).then((willDelete) => {// start .then
        //if confirmed, delete
        if (willDelete) {
            axios({
              method: "DELETE",
              url: `/confirm/${this.props.admin.id}`, 
              //grabs id of component that are interacting with
            }).then(function (response) {
               
              
            });
            //success! review deleted
            swal("Poof! Your review has been deleted!", {
                icon: "success",
            });
        } else {
          //...else cancel action
            swal("Your review is safe!");
        }
        //reloads page after 1.5 seconds of deletion to reflect update on admin page
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      
    });
} //end deleteReview

  //flags the current review with a PUT request
  flagForReview = (event) => {
    //prevents default action
      event.preventDefault();
      //sweet alerts    
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
          url: `/confirm/${this.props.admin.id}`,
        }) //end axios
          .then((response) => {//start .then
          }) //end .then
          .catch((error) => {//start .catchError
            console.log(error);
          }); //end .catchError
          //success! Review flagged
        swal("This review has been flagged!", {
          icon: "success",
        });
      } else {
        //...else cancel
        swal("Flag request has been canceled!");
      }
      //reloads page showing current info from database with newly flagged item
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  };

    render() {
      // grabs admin parem from map of parent
      const {admin} = this.props
        return (
          <tr>
            {/* table data for each mapped item */}
            <td>{admin.name}</td>
            <td>{admin.feeling}</td>
            <td s>{admin.understanding}</td>
            <td>{admin.support}</td>
            <td>{admin.comments}</td>
            {/* clickable event, runs flagForReview function */}
            <td className="flag" onClick={this.flagForReview}>
              {/* onClick also toggles "toggle" key in state and renders based on it's value, 
              changing the flag icon thats displayed */}
              {admin.flagged === false ? <EmojiFlagsIcon /> : <FlagIcon />}
            </td>
            {/* formats timestamp with moment */}
            <td>{moment(admin.date).format("MMMM Do YYYY")}</td>
            <td>
              {
                //delete button, runs deleteReview function on click
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
export default withRouter(connect(mapStateToProps)(Adminitem));