import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./css/Card.css"; 
import currentUser from './backend/currentUser.js';

/*
**  UserCard.js
**
**  This component is the thumbnail for each user post
*/
function UserCard( {id, name, zipcode, email, userImage} ) {

    let image;
    
    if(userImage !== '' && userImage !== null)
    {
        image = userImage;
    }  
    else
    {
        image = "../images/nopic.png"; // default image
    }
    
    return (
        ///chat?name=${currentUser.getUser().name}&room=${name}
        <Link className='link' to={`/chatSpace?name=${currentUser.getUser().name}&room=${name}`}>
            <div className="card"> 
                <img  className="cardImage border border-light" 
                    src={image}
                    onError={(e) => {
                        e.target.src = '../images/nopic.png' // fallback image
                    }} 
                alt=""/>

                <h3>{name}</h3>
                <h4>Location: {zipcode}</h4>
            </div>
        </Link>
    )
}

export default UserCard
