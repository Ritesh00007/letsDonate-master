import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import './css/Chat.css';

class Chat extends Component {
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

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
        this.scrollToBottom();
    }
      
    componentDidUpdate() {
        this.scrollToBottom();
    }
  
    render() {
        const DUMMY_DATA = [
            { sender: "perborgen",
            messages: [ 
            {
              senderId: "perborgen",
              text: "who'll win?",
              user: false,
            },
            {
              senderId: "janedoe",
              text: "It's gonna be me of course.",
              user: true,
            },
            {
                senderId: "perborgen",
                text: "lorem ipsum",
                user: false,
            },
            {
                senderId: "janedoe",
                text: "dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                user: true,
            },
            {
                senderId: "perborgen",
                text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                user: false,
            },
            {
                senderId: "janedoe",
                text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                user: true,
            }
            ]},
            { sender: "n",
            messages: [
            {
                senderId: "n",
                text: "lorem ipsum",
                user: false,
            },
            {
                senderId: "janedoe",
                text: "dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                user: true,
            },
            {
                senderId: "n",
                text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                user: false,
            },
            {
                senderId: "janedoe",
                text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                user: true,
            }
            ]},
        ]

      return (
        <div>
            {/* chat */}
            <div className="chat" id="chat">
                <form className="container">
                    <Grid container>
                    <Grid item xs={12}>
                    <ul>  
                    {DUMMY_DATA.map(DUMMY_DATA => {
                        return (
                            <li key={DUMMY_DATA.id}> {/*className={`${DUMMY_DATA.user ? "right" : ""}`}>*/}
                                <div>
                                    {/* <b>{DUMMY_DATA.senderId}: </b> */}
                                    <b>{DUMMY_DATA.user ? "me" : DUMMY_DATA.senderId}: </b>
                                    {DUMMY_DATA.text}
                                </div>
                            </li>
                        )
                    })} 
                    <div style={{ float:"left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>             
                    </ul>
                    </Grid>
                    <Grid item>
                    <textarea placeholder="Type message.." name="msg" required></textarea>

                    <button type="button" className="btn">Send</button>
                    <button type="button" className="btn cancel" onClick={this.closeChat}>Close</button>
                    </Grid>
                    </Grid>
                </form>
            </div>
        </div>
      )
    }
}
export default Chat;