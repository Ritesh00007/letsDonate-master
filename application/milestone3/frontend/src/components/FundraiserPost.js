import React, { Component } from 'react';
import './css/FundraiserPost.css';
import Star from "@material-ui/icons/Star";
import axios from 'axios';
import currentUser from './backend/currentUser.js';
import Popup from 'reactjs-popup';
import Grid from '@material-ui/core/Grid';
import { Button } from "@material-ui/core";

import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import deleteFundFunction from './backend/deleteFund.js';
import editFund from './backend/editFund.js';

/*
**  FundraiserPost.js
**
**  This page is for the details of any singular fundraiser from backend
*/
class FundraiserPost extends Component {
  state = {
    items: [], // saves entire list of products from database
    item: {},  // saves a single product which will be displayed
    owner: {}, // saves the owner of the product
    random: 0, // stores random raised amount
    value: '',
    copied: false
  }

  componentDidMount() {
    // calls api to get list of all products from database
    axios.get(`/api/Fundraisers`)
      .then(res => {
        const items = res.data;
        this.setState({ items }); // sets the array with all database items


        let pageName = this.props.match.params.id; // gets the url parameter
        let singleFund;
        if (this.state.item !== undefined) {
          // sets the variable to the found product. Product is found by comparing all product names to the url paramter
          singleFund = this.state.items.find((fund) => { return fund.id == pageName })

          // add logic to find owner of product from users table
          // similar code to searching api
          let user;
          let searchable = {};
          searchable["searchEmail"] = singleFund.owner; // login searches registered user database by email
          axios.post('/api/loginUser', searchable)
            .then((result) => {
              if (!result.data.success) {
                alert("Failed Search");
              }
              else {
                user = result.data.users[0]; // returns the data from the database
                this.setState({ owner: user });
              }
            })

        }
        this.setState({ item: singleFund }); // sets the state of the single product variable with the found product

        // generates a random raised amount
        let min = 0;
        let max = this.state.item.requiredAmount;
        let rand = parseInt(min + (Math.random() * (max - min)));
        this.setState({ random: this.state.random + rand });
        //
      })
  }

  endorsePost(fundraiserItem) {
    let tempUserEmail = "noemail@email.com";

    if (tempUserEmail.localeCompare(currentUser.getUser().email) !== 0) // checks if there is a current user
    {
      return (
        <button className="postButton" onClick={() => {
          let searchable = {};
          searchable["endorsement"] = fundraiserItem.endorsement + 1; // login searches registered user database by email
          searchable["id"] = fundraiserItem.id;
          axios.post('/api/updateEndorsement', searchable)
            .then((result) => {
              if (!result.data.success) {
                alert("Failed Search");
              }
              else {
                window.location.reload();
              }
            })
        }}> Endorse </button>
      )
    }
  }

  deletePost() {
    console.log(this.props);
    let currentUserEmail = currentUser.getUser().email;
    let currentProfileEmail = this.state.owner.email;

    if ((currentUserEmail.localeCompare("admin@admin.com") === 0) || (currentUserEmail.localeCompare(currentProfileEmail) === 0)) // edit profile if current user is profile owner or an admin
    {
      return (
        <Popup
          trigger={<button className="postButton"> Delete Post </button>}
          modal
          nested
        >
          {close => (
            <div className="popup">
              <button className="close" onClick={close}>
                &times;
            </button>
              <div className="header"> <strong> Delete Post </strong></div>
              <div className="header"> <strong> This Action Cannot Be Undone </strong></div>
              <div className="content">
                <form id="deleteUserForm" method="post">
                  <label><strong>Type "YES" to Confirm Deletion </strong></label>
                  <input type="text" name="response" placeholder="YES" />
                  <br />
                </form>
              </div>
              <div className="actions">
                <button
                  className="button"
                  onClick={() => {
                    let pageRedirect = deleteFundFunction(this.props.match.params.id);

                    if (pageRedirect) {
                      console.log("HERE");
                      window.location.replace('/');
                      //history.push('/');
                    }
                  }}
                >DELETE
              </button>
              </div>

            </div>
          )}
        </Popup>
      )
    }
  }

  editPost() {
    let currentUserEmail = currentUser.getUser().email;
    let currentProfileEmail = this.state.owner.email;

    if ((currentUserEmail.localeCompare("admin@admin.com") === 0) || (currentUserEmail.localeCompare(currentProfileEmail) === 0)) // edit profile if current user is profile owner or an admin
    {
      return (
        <Popup
          trigger={<button className="postButton"> Edit Post </button>}
          modal
          nested
        >
          {close => (
            <div className="popup">
              <button className="close" onClick={close}>
                &times;
            </button>
              <div className="header"> <strong> Edit Post </strong></div>
              <div className="content">
                <form id="editUserForm" method="post">
                  <label><strong>Title: </strong></label>
                  <input type="text" name="name" placeholder={this.state.item.title} />

                  <br />
                  <label><strong>Description: </strong></label>
                  <input type="text" name="description" placeholder={this.state.item.description} />

                  <br />
                  <label><strong>Type: </strong></label>
                  <select name="productType" id="productType">
                    <option value="default" selected disabled>Please select a type</option>
                    <option value="Medical">Medical</option>
                    <option value="Education">Education</option>
                    <option value="Community">Community</option>
                    <option value="Other">Other</option>
                  </select>

                  <br />
                  <label><strong>Amount Required in USD: </strong></label>
                  <input type="number" name="requiredAmount" placeholder={this.state.item.requiredAmount} />

                  <br />
                  <label><strong>New Post Image: </strong></label>
                  <input type="file" id="productImage" accept="image/jpg,image/jpeg,image/png" />
                </form>
              </div>
              <div className="actions">

                {/* This posts the input data into the backend */}
                <button
                  className="button"
                  onClick={() => { editFund(this.state.item) }}
                >SUBMIT
              </button>
              </div>

            </div>
          )}
        </Popup>
      )
    }
  }

  copyText() {
    return (
      <div>
        <CopyToClipboard text={this.state.owner.email}
          onCopy={() => this.setState({ copied: true })}>
          <button className="postButton">Copy Email</button>
        </CopyToClipboard>

        {this.state.copied ? <span style={{ color: 'red' }}> Copied Email to Clipboard</span> : null}
      </div>
    )
  }

  donateButton() {
    return (
      <Popup
        trigger={<button className="postButton"> Donate Now </button>}
        modal
        nested
      >
        {close => (
          <div className="popup">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header"> <strong> Choose a service </strong></div>
            <div className="content">
              {this.copyText()}
              <div>
                <a href="https://www.paypal.com/us/home">
                  <img alt="PayPal" src="https://miro.medium.com/max/4000/1*SaXNDepA2B9V5pFiof1Q3A.png" width="60%" height="60%"></img>
                </a>
              </div>
              <div>
                <a href="https://venmo.com/">
                  <img alt="Venmo" src="https://www.breakwaterfinancial.com/sites/default/files/users/aberinger/Venmo.png" width="60%" height="60%"></img>
                </a>
              </div>
            </div>

          </div>
        )}
      </Popup>
    )
  }

  render() {
    let fundraiserItem = this.state.item;
    let productOwner = this.state.owner;

    let receviedDonations = this.state.random; // random value

    // code to update progress bar
    if (document.getElementById("myBar") !== null) {
      let elem = document.getElementById("myBar");
      let width = parseInt((receviedDonations / fundraiserItem.requiredAmount) * 100); // percentage
      elem.style.width = width + "%";
      elem.innerHTML = width + "%";
    }
    //

    return (
      <div className="h-75 x-1 body">
        <Grid container spacing={3}>
          {/* image column */}
          <Grid item xs={12} sm={5}>
            <img className="w-100 border border-light" src={fundraiserItem.image} onError={(e) => {
              e.target.src = '../images/charity.png' // fallback image
            }} alt="" />
          </Grid>
          {/* Description column */}
          <Grid item xs={12} sm={7} container spacing={3} className="px-5">
            <Grid xs={12} sm={12} container spacing={3}>
              <Grid xs={12} sm={6}>
                <div className="rating">
                  <p>
                    <Star className="star" />
                    <strong>{fundraiserItem.endorsement}</strong>
                    {this.endorsePost(fundraiserItem)}
                  </p>
                  <div className="amountRequired">
                    <h3>${receviedDonations} out of ${fundraiserItem.requiredAmount} raised.</h3>
                    <div id="myProgress">
                      <div id="myBar"></div>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid xs={12} sm={6}>
                {this.deletePost()}
                {this.editPost()}
              </Grid>
            </Grid>
            <div className="productTitle">
              <h4>{productOwner.name}</h4>
              <h4>Location: {productOwner.zipcode}</h4>
              <h4>Contact: {productOwner.email}</h4>
              <h4>Category: {fundraiserItem.fundType}</h4>
              <h5>{fundraiserItem.description}</h5>
              <div className="donateButton">
                {this.donateButton()}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}
export default FundraiserPost;