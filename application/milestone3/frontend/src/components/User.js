import React, { Component } from 'react';
import user from '../images/user.jpg';
import './css/User.css';
import './css/PopUps.css';
import Grid from '@material-ui/core/Grid';
import FundraiserCard from './FundraiserCard';
import Card from './Card';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';
import { Form, Label, Input, FormGroup, CustomInput } from 'reactstrap';

import currentUser from './backend/currentUser.js'; // helper functions to set and get current logged in user
import editUserData from './backend/editUser.js';
import deleteUserFunction from './backend/deleteUser.js';

/*
**  User.js
**
**  This displays a users dashboard.
**  This should also contain the items and posts they have put up (if any).
*/

class User extends Component {
  state = {
    users: [], // saves entire list of users from database
    user: {},  // saves a single user which will be displayed
    items: [], // saves all products posted by user
    funds: [] // saves all fundraisers posted by user
  }

  componentDidMount() {
    // calls api to get list of all users from database
    axios.get(`/api/allUsers`)
      .then(res => {
        const users = res.data;
        this.setState({ users }); // sets the array with all database users

        let pageName = this.props.match.params.email; // gets the url parameter
        let singleUser;
        if (this.state.user !== undefined) {
          // sets the variable to the found user. User is found by comparing all user emails to the url paramter
          singleUser = this.state.users.find((userEmail) => { return userEmail.email == pageName })
        }
        this.setState({ user: singleUser }); // sets the state of the single user variable with the found user
      })

    // find products posted by user
    // similar code to searching api
    let products;
    let searchable = {};
    searchable["searchEmail"] = this.props.match.params.email; // login searches registered user database by email
    axios.post('/api/findPosts', searchable)
      .then((result) => {
        if (!result.data.success) {
          alert("Failed Search");
        }
        else {
          products = result.data.products; // returns the data from the database
          this.setState({ items: products });
        }
      })

    // find fundtaisers posted by user
    // similar code to searching api
    let fundraisers;
    axios.post('/api/findFundraisers', searchable)
      .then((result) => {
        if (!result.data.success) {
          alert("Failed Search");
        }
        else {
          fundraisers = result.data.fundraisers; // returns the data from the database
          this.setState({ funds: fundraisers });
        }
      })
  }

  deleteUserProfile() {
    let currentUserEmail = currentUser.getUser().email;
    let currentProfileEmail = this.state.user.email;

    if ((currentUserEmail.localeCompare("admin@admin.com") === 0) || (currentUserEmail.localeCompare(currentProfileEmail) === 0)) // edit profile if current user is profile owner or an admin
    {
      return (
        <Popup
          contentStyle={{width: "auto"}}
          trigger={<button className="postButton"> Delete Profile </button>}
          modal
          nested
        >
          {close => (
            <div className="popup">
              <button className="close" onClick={close}>
                &times;
            </button>
              <div className="header"> <strong> Delete Profile </strong></div>
              <div className="header"> <strong> This Action Cannot Be Undone </strong></div>
              <div className="content">
                <form id="deleteUserForm" method="post">
                  <label><strong>Type "YES" to Confirm Deletion</strong></label>
                  <input type="text" name="response" placeholder="YES" />
                  <br />
                </form>
              </div>
              <div className="actions">
                <button
                  className="button"
                  onClick={() => {
                    let pageRedirect = deleteUserFunction(this.props.match.params.email);

                    if (pageRedirect) {
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

  editUserProfile() {
    let currentUserEmail = currentUser.getUser().email;
    let currentProfileEmail = this.state.user.email;

    if ((currentUserEmail.localeCompare("admin@admin.com") === 0) || (currentUserEmail.localeCompare(currentProfileEmail) === 0)) // edit profile if current user is profile owner or an admin
    {
      return (
        <Popup 
          contentStyle={{width: "auto"}}
          trigger={<button className="postButton"> Edit Profile </button>}
          modal
          nested
        >
          {close => (
            <div className="popup">
              <button className="close" onClick={close}>
                &times;
              </button>
              <div className="header"> <strong> Edit Profile </strong></div>
                <div className="content">
                  <form id="editUserForm" method="post">
                    <label><strong>Name: </strong></label>
                    <input type="text" name="newName" placeholder={this.state.user.name} />

                    <br />
                    <label><strong>Email: </strong></label>
                    <input type="text" name="newEmail" placeholder={this.state.user.email} />

                    <br />
                    <label><strong>Zipcode: </strong></label>
                    <input type="number" name="newZipcode" placeholder={this.state.user.zipcode} />

                    <br />
                    <label><strong>Current Password: </strong></label>
                    <input type="password" name="currentPassword" placeholder="password" />

                    <br />
                    <label><strong>New Password: </strong></label>
                    <input type="password" name="newPassword" placeholder="password" />

                    <br />
                    <label><strong>New Profile Image: </strong></label>
                    <input type="file" id="newProfileImage" accept="image/jpg,image/jpeg,image/png" />
                  </form>
                </div>
              <div className="actions">

                {/* This posts the input data into the backend */}
                <button
                  className="button"
                  onClick={() => { editUserData() }}
                >SUBMIT
              </button>
              </div>

            </div>
          )}
        </Popup>
      )
    }
  }

  createPost() {
    var productName;
    var description;
    var type;
    let currentUserEmail = currentUser.getUser().email;
    let currentProfileEmail = this.state.user.email;

    if ((currentUserEmail.localeCompare("admin@admin.com") === 0) || (currentUserEmail.localeCompare(currentProfileEmail) === 0)) // edit profile if current user is profile owner or an admin
    {
      return (
        <Popup
          contentStyle={{width: "auto"}}
          trigger={<button className="postButton"> Create a new Post </button>}
          modal
          nested
        >
          {close => (
            <div className="popup">
              <button className="close" onClick={close}>
                &times;
                  </button>
              <div className="header"> <strong>CREATE A POST </strong></div>
              <div className="content">
                <Form id="newPostForm">
                  <FormGroup>
                    <Label><strong>Name of Product: </strong></Label>
                    <Input value={productName}
                      onChange={(word) => {
                        productName = (word.target.value);
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <br />
                    <Label><strong>Description of Product: </strong></Label>
                    <Input className="descriptionText" value={description}
                      onChange={(des) => {
                        description = (des.target.value);
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <br />
                    <Label><strong>Type (Example: Furniture, Cloth): </strong></Label>
                    <select name="productType" id="productType">
                      <option value="1" selected disabled>Please select a type</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Clothes">Clothes</option>
                      <option value="Food">Food</option>
                      <option value="Other">Other</option>
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <br />
                    <CustomInput type="file" id="productImage" accept="image/jpg,image/jpeg,image/png" />
                  </FormGroup>
                </Form>
              </div>
              <div className="actions">

                {/* This posts the input data into the backend */}
                <button
                  className="button"
                  onClick={() => {
                    if (productName.length > 0 && description.length > 0) {
                      var productImage = document.getElementById("productImage");
                      var form = new FormData();
                      form.append("imageFile", productImage.files[0]);
                      form.append("name", productName);
                      form.append("description", description);
                      form.append("productType", document.getElementById("productType").value);
                      form.append("owner", currentProfileEmail);
                      console.log(form.getAll("name"), form.getAll("imageFile"));
                      axios.post("/api/postProduct", form, { headers: { 'content-type': "multipart/form-data" } })
                        .then((result) => {
                          if (result.data.success) {
                            alert("Successfully Posted");
                            window.location.reload(); // reloads page to render proper buttons on navbar
                          } else {
                            alert("Post Failure Occurred");
                          }
                        })
                    }
                  }}
                >
                  SUBMIT
                    </button>
              </div>
              <button className="button"
                onClick={() => {

                }}
              >
                Trouble Posting?
                    </button>
            </div>
          )}
        </Popup>
      )
    }
  }

  render() {
    console.log(this.state);
    let userImage;

    if (this.state.user.userImage != null) {
      if (this.state.user.userImage.localeCompare("undefined") == 0) userImage = user;
      else userImage = this.state.user.userImage;
    }
    else {
      userImage = user;
    }

    return (
      // <div className="profile">
      //   <div className="topSection">
      //     <div className="topLeft">

      //       {/* Users profile picture */}
      //       <div className="userImage">
      //         <img src={userImage} alt="" />
      //       </div>

      //       {/* User's username and rating */}
            // <div className="userName">
            //   <h1>{this.state.user.name}</h1>
            //   <h2>{this.state.user.email}</h2>
            //   <h2>Location: {this.state.user.zipcode}</h2>
            // </div>

      //       {/* Report button */}
      //       {/* <Report /> */}
      //     </div>
      //     <div className="topRight">

      //     </div>
      //   </div>
      //   <div className="bottomSection">
          // {/* Edit user profile */}
          // {this.editUserProfile()}
          // {/* This is a pop up for creating a new post */}
          // {this.createPost()}

          // {/* These are lists of the items and fundraisers a user has posted */}
          // <h2>ITEMS POSTED</h2>
          // <div className="scrollmenu">
          //   {this.state.items.sort().reverse().map(item => <Card id={item.id} name={item.name} description={item.description} productImage={item.productImage} />)}
          // </div>
          // <h2>FUNDRAISERS POSTED</h2>
          // <div className="scrollmenu">
          // {this.state.funds.sort().reverse().map(item =>
          //   <FundraiserCard id={item.id} title={item.title} description={item.description} image={item.image} endorsement={item.endorsement} requiredAmount={item.requiredAmount} />
          // )}
          // </div>
      //   </div>
      //   {/* This is a pop up for deleting the profile */}
      //   {this.deleteUserProfile()}
      // </div>

      <div className="h-75 x-1">
        <Grid container spacing={3}>
          {/* top banner */}
          <Grid container spacing={3} md={12} className="pfBanner">
            {/* image */}
            <Grid item xs={12} sm={3}>
              <img className="w-100" src={userImage} alt="" />
            </Grid>
            {/* name and info */}
            <Grid item xs={12} sm={9}>
              <div className="userName">
                <h2>{this.state.user.name}</h2> 
                {/* Edit user profile */}
                {this.editUserProfile()}
                {/* This is a pop up for deleting the profile */}
                {this.deleteUserProfile()}
                <h3>{this.state.user.email}</h3>
                <h3>Location: {this.state.user.zipcode}</h3>
              </div>
            </Grid>
          </Grid>
            {/* everything else (posts) */}
            <Grid item xs={12} p={3}>
              {/* This is a pop up for creating a new post */}
              {this.createPost()}

              {/* These are lists of the items and fundraisers a user has posted */}
              <h2>ITEMS POSTED</h2>
              <div className="scrollmenu">
                {this.state.items.sort().reverse().map(item => <Card id={item.id} name={item.name} description={item.description} productImage={item.productImage} />)}
              </div>
              <h2>FUNDRAISERS POSTED</h2>
              <div className="scrollmenu">
                {this.state.funds.sort().reverse().map(item =>
                  <FundraiserCard id={item.id} title={item.title} description={item.description} image={item.image} endorsement={item.endorsement} requiredAmount={item.requiredAmount} />
                )}
              </div>
            </Grid>
        </Grid>
      </div>
    )
  }
}
export default User;