import React, { Component } from 'react'
import axios from 'axios';
import queryString from 'query-string';
import currentUser from './backend/currentUser.js';
import DisplayMessage from './DisplayMessage';
import './css/ChatSpace.css';
export class ChatSpace extends Component {
   
    state = {
        items: [{message:"", room:""}],
        name: '',
        room: '',
        message: '',
        filled: false
      }

      componentDidMount() {
        
        const { name, room } = queryString.parse(this.props.location.search);
        this.setState({name});
        this.setState({room});
        let searchable = {};
        searchable["roomName"] = room;
        console.log("Room is " ,searchable);
        axios.post(`/api/getMessages`, searchable)
          .then(res => {
            const items = res.data.messages;
            if(res.data.success){
                console.log("ressss fatatatta", res.data);
                this.setState({ items });
                this.setState({filled: true});
                console.log("The messages are", this.state.items);
            }
        })

        
    }

    sendMessage(event){
        event.preventDefault();
        const messageContent = document.getElementById("message").value;
        let data = {};
        if(messageContent!='' && messageContent!=undefined){
            let fullMessage = currentUser.getUser().name.concat(": ").concat(messageContent);
            data["room"] = this.state.room;
            data["message"] = fullMessage;
            axios.post(`/api/addMessage`, data)
            .then(res => {
                console.log(res);
            });
            console.log("Clicked");
            window.location.reload('/');
        }
    }

    render() {
        let occurrences = { };
        for(let i = 0, j = this.state.items.length; i < j; i++) 
        {
            occurrences[this.state.items[i].message] = (occurrences[this.state.items[i].message] || 0) + 1;
        }
            return (
                <div>
                    {console.log(this.state.items)}
                    <h2 className="welcome">Welcome to {this.state.room}'s chat room</h2>
                    <div className="items">
                        {console.log("Itemsssssss", this.state.items)}
                        
                        
                        {console.log("object", Object.keys(occurrences))};
                        <ul>
                        <li>{Object.keys(occurrences).map(item => 
                            <div className="message">
                                {item}
                            </div>
                        )}
                        </li>
                        </ul>
                       
                    
                </div>
                
                    <input type='text' id="message"/>
                
                    <button
                    className="button"
                    onClick={(event) => this.sendMessage(event)}
                    >SEND
                </button>
                </div>
            )
       
    }
}

export default ChatSpace
