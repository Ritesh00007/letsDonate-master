import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Chat from './Chat.js';
import './css/Chat.css';
import { Link } from 'react-router-dom';

import Popup from 'reactjs-popup';
import currentUser from './backend/currentUser.js';
import loginData from './backend/loginBackend.js';

class MessageList extends Component {
    openList() {
        document.getElementById("userList").style.display = "block";
    }

    closeList() {
        document.getElementById("userList").style.display = "none";
    }

    openChat() {
        document.getElementById("chat").style.display = "block";
    }

    closeChat() {
        document.getElementById("chat").style.display = "none";
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    setChat(user) {

    }
    renderChat() {
        if (this.otherUser !== undefined)
            return <Chat user="this.otherUser" />
    }

    redirectClick() {
        let tempUserEmail = "noemail@email.com";

        if (tempUserEmail.localeCompare(currentUser.getUser().email) !== 0) // checks if there is a current user, if there isn't show login
        {
            return (
                <Link className="link" to={`/users`}>
                    {/*onClick={this.openList*/}
                    <button className="open-button">Messages</button>
                </Link>
            )
        }
        else // popup to login
        {
            return (
                <div>
                    <Popup contentStyle={{ width: "auto" }}
                        trigger={<Link className="link">
                        {/*onClick={this.openList*/}
                        <button className="open-button">Messages</button>
                    </Link>}
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
                    {/* This button takes a user to their user page if their signed in */}
                    { /* <Link className='userLink' to={"/User"}><AccountCircleIcon /></Link> */}
                </div>
            )
        }
    }

    render() {
        const DUMMY_USERS = [
            "perborgen",
            "n"
        ]
        let tempUserEmail = "noemail@email.com";

        return (
            <div>
                {tempUserEmail.localeCompare(currentUser.getUser().email) !== 0 && // checks if there is a current user, if there isn't show login
                    this.redirectClick()
                }
                {/* list of users that have a chat history */}
                <div className="userList" id="userList">
                    <div className="container">
                        <Grid container>
                            <Grid item xs={12}>
                                <ul>
                                    {DUMMY_USERS.map(DUMMY_USER => {
                                        return (
                                            <li className="user" key={DUMMY_USER.id}>
                                                <div onClick={this.openChat}>
                                                    <b>{DUMMY_USER}</b>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </Grid>
                            <Grid item>
                                <button type="button" className="btn cancel" onClick={this.closeList}>Close</button>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <Chat id="chat" />
                {/* {this.renderChat} */}
            </div>
        )
    }
}
export default MessageList;