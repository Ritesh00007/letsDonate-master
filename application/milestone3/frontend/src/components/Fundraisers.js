import React, { Component } from 'react';
import FundraiserCard from './FundraiserCard';
import { Link } from 'react-router-dom';
import '../App.css';
import './css/Fundraisers.css';
import axios from 'axios';
import { Form, Label, Input, FormGroup, CustomInput } from 'reactstrap';
import Popup from 'reactjs-popup';
import Grid from '@material-ui/core/Grid';

import currentUser from './backend/currentUser.js';
import loginData from './backend/loginBackend.js';

/*
**  Fundraiser.js
**
**  This displays a list of all the available fundraiser from the database
**  and should allow the user to filter and sort the list.
*/
class Fundraisers extends Component {

  state = {
    items: []
  }

  componentDidMount() {
    axios.get(`/api/Fundraisers`)
      .then(res => {
        const items = res.data;
        this.setState({ items });
      })
  }

  createPost() {
    var title;
    var description;
    var amountRequired;
    var owner = this.props.currentUser;

    // edit profile if current user is profile owner or an admin

    let tempUserEmail = "noemail@email.com";

    if (tempUserEmail.localeCompare(owner) !== 0) // checks if there is a current user, if there isn't show login button
    {
      return (
        <Popup
          contentStyle={{width: "auto"}}
          trigger={<button className="postButton"> Create a new Fundraiser </button>}
          modal
          nested
        >
          {close => (
            <div className="popup">
              <button className="close" onClick={close}>
                &times;
                  </button>
              <div className="header"> <strong>CREATE NEW FUNDRAISER </strong></div>
              <div className="content">
                <Form id='newFundraiserForm'>
                  <FormGroup>
                    <Label><strong>Title: </strong></Label>
                    <Input value={title}
                      onChange={(word) => {
                        title = (word.target.value);
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <br />
                    <Label><strong>Description: </strong></Label>
                    <Input className="descriptionText" value={description}
                      onChange={(des) => {
                        description = (des.target.value);
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <br />
                    <Label><strong>Type: </strong></Label>
                    <select name="productType" id="productType">
                      <option value="1" selected disabled>Please select a type</option>
                      <option value="Medical">Medical</option>
                      <option value="Education">Education</option>
                      <option value="Community">Community</option>
                      <option value="Other">Other</option>
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <br />
                    <Label><strong>Amount Required in USD: </strong></Label>
                    <Input value={amountRequired}
                      onChange={(amountNeeded) => {
                        amountRequired = (amountNeeded.target.value);
                      }}
                    />
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
                    if (title.length > 0 && description.length > 0) {
                      var productImage = document.getElementById("productImage");
                      var form = new FormData();
                      form.append("imageFile", productImage.files[0]);
                      form.append("title", title);
                      form.append("description", description);
                      form.append("requiredAmount", amountRequired);
                      form.append("endorsement", 0);
                      form.append("fundType", document.getElementById("productType").value);
                      form.append("owner", owner);
                      axios.post("/api/postFundraiser", form, { headers: { 'content-type': "multipart/form-data" } })
                        .then((result) => {
                          if (result.data.success) {
                            alert("Successfully Posted");
                            window.location.reload();
                          } else {
                            alert("Post Failure Occurred");
                          }
                        })
                        .catch(exception => {
                          alert("Post Failure Occurred");
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
    else // popup to login
    {
      return (
        <div>
        <Popup contentStyle={{width: "auto"}}
            trigger={<button className="postButton"> Create a new Fundraiser </button>}
            modal
            nested
        
        >
            {close => (
                <div>
                <form id="loginForm" className='login-form'>
                    <h1>Login to Let's Donate</h1>
                        <input
                            className='email'
                            type='email'
                            name='email'
                            placeholder="Email"
                        />
                        <input
                            className='password'
                            type='password'
                            name='password'
                            placeholder="Password"
                        />
                        <br/>
                        <input
                            className='login-button'
                            type='button'
                            value='Log In'
                            onClick={() => {loginData()}}
                            // calls function from loginBackend.js and passes login information
                        />
                        <br/>
                        <Link 
                            className='signup-button' 
                            type='button'
                            to={"/register"}
                            onClick={close}
                        >SignUp</Link>
                        <br/>
                        <Link
                            className='reset-password-button'
                            type='button'
                            to={"/recovery"}
                            onClick={close}
                        >Reset Password</Link>
                </form>
                </div>
            )}
        </Popup>
        {/* This button takes a user to their user page if their signed in */}
        { /* <Link className='userLink' to={"/User"}><AccountCircleIcon /></Link> */}
    </div>
    )
    }

  }

  allProducts() {
    axios.get(`/api/Fundraisers`)
      .then(res => {
        const items = res.data;
        this.setState({ items });
      })
}

  setCategory(filterCategory)
    {      
        // change state based on checked box
        let checkBox = document.getElementById(filterCategory);
        if(checkBox.checked == true)
        {
            // filters to searched category
            let countCategory = this.state.items.filter((obj) => {return obj.fundType === filterCategory});
            const items = countCategory; 
            this.setState({items});
            //console.log("State:", this.state);
            //console.log("Filtered", countCategory);
        }
        else this.allProducts();
    }

    getCategories()
    {
        // gets the list of categories and the count in each
        let occurrences = { };
        for(let i = 0, j = this.state.items.length; i < j; i++) 
        {
            occurrences[this.state.items[i].fundType] = (occurrences[this.state.items[i].fundType] || 0) + 1;
        }
        //console.log(occurrences);

        // returns a map of the categories and their count
        return (
            Object.keys(occurrences).sort().map(item => 
            <div className="checkbox"><label><input type="checkbox" id={item} onClick={() => {this.setCategory(item)}}/>{item} ({occurrences[item]})</label></div>
            )
        );
    }

  render() {
    return (
      <div className="h-75 x-1 grid">
      <Grid container spacing={3}>
        {/* filters */}
        <Grid item sm={12} md={2} className="filters border-right border-dark">
          <h1>Filters</h1>
          {this.getCategories()}
        </Grid>
        {/* products */}
        <Grid item sm={12} md={10}>
          <div className="makePost">{this.createPost()}</div>
          <div className="items">
            {this.state.items.sort().reverse().map(item =>
              <FundraiserCard id={item.id} title={item.title} description={item.description} image={item.image} endorsement={item.endorsement} requiredAmount={item.requiredAmount} />
            )}
          </div>
        </Grid>
      </Grid>
    </div>
    );
  }
}
export default Fundraisers;