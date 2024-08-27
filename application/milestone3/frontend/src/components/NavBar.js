import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button, InputGroup  } from 'react-bootstrap';
import { LinkContainer,  } from 'react-router-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import './css/NavBar.css';
import './css/PopUps.css';
import charity from '../images/charity.png';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';

import loginData from './backend/loginBackend.js'; // sends login form data to check against the database
import currentUser from './backend/currentUser.js'; // helper functions to set and get current logged in user

/*
**  NavBar.js
**
**  This component remains at the top of the application at all times and serves as a means to navigate the website.
*/
class NavBar extends Component {
    // These are the filtered items that will be passed should a user add keywords for the search.
    state = {
        items: [],
        fundraisers: [],
        searchTerm: ''
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        axios.get(`/api`)
            .then(res => {
                const items = res.data;
                this.setState({ items });
            }).catch(exception => {
                alert("Failed Search");
            })
    }

    // This function uses the keyword input in the searchbar to get a filtered list of items from the backend
    getKey() {
        const keySearch = document.getElementById("searchType").value;

        this.setState({ searchTerm: keySearch });
    }

    // function that checks current logged in user and rederns the appropriate buttons
    reloadButton() {
        let tempUserEmail = "noemail@email.com";

        if (tempUserEmail.localeCompare(this.props.currentUser) == 0) // checks if there is a current user, if there isn't show login button
        {
            return (
                <div>
                    <Popup contentStyle={{ width: "auto" }}
                        trigger={<button className="buttonLink"> Login/SignUp </button>}
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
                                    <br />
                                    <input
                                        className='login-button'
                                        type='button'
                                        value='Log In'
                                        onClick={() => { loginData() }}
                                    // calls function from loginBackend.js and passes login information
                                    />
                                    <br />
                                    <Link
                                        className='signup-button'
                                        type='button'
                                        to={"/register"}
                                        onClick={close}
                                    >SignUp</Link>
                                    <br />
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
                </div>
            )
        }
        else // if logged in, show logout button
        {
            return (
                <div className="accountViews">
                    <button className="buttonLink" onClick={() => {
                        currentUser.setUserLogout();
                        window.location.replace('/');
                    }}> Logout </button>

                    {/* This button takes a user to their user page if their signed in */}
                    <Link className='userLink' to={`/User/${this.props.currentUser}`/* links to product page using product name */}>
                        <AccountCircleIcon />
                    </Link>
                </div>
            )
        }
    }

    render() { return (
        <Navbar className="NavBar" collapseOnSelect expand="lg">
            <LinkContainer className='link' to={"/"}>
                <Navbar.Brand>
                    <img className="logo" 
                        src={charity}
                        alt=""
                    />
                    <div className='appTitle'>
                        <p>let'sDonate</p>
                    </div>
                </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto search">
                    {/* This is the searchbar */}
                    <Form inline>
                        <FormControl id="searchType" type="text" placeholder="Search" className="mr-sm-2" onChange={this.getKey.bind(this)}></FormControl>
                        in:
                        <Link className='link' to={{
                            pathname: `/search/${"products"}/${this.state.searchTerm}`,
                            products: this.state.items
                        }}>
                            <button className="buttonLink">Products</button>
                        </Link>
                        <div className="searchLine"/>
                        <Link className='link' to={{
                            pathname: `/search/${"fundraisers"}/${this.state.searchTerm}`,
                            fundraisers: this.state.fundraisers
                        }}>
                            <button className="buttonLink">Fundraisers</button>
                        </Link>
                    </Form>
                </Nav>
                <Nav>
                    {/* This is the button to allow users to log in/sign up through a pop up */}
                    {this.reloadButton()}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );}
}

export default NavBar;