import React, { Component } from 'react';
import axios from 'axios';
import UserCard from './UserCard.js';


export class AvailableChatUsers extends Component {
    state = {
        items: []
      }

      componentDidMount() {
        axios.get(`/api/allUsers`)
          .then(res => {
            const items = res.data;
            this.setState({ items });
          })
      }

    render() {
        return (
            <div className="items">
                {this.state.items.map(item => 
                    <UserCard id={item.id} name={item.name} zipcode={item.zipcode} email={item.email} userImage={item.userImage}/>
                )}
            </div>
        )
    }
}

export default AvailableChatUsers

