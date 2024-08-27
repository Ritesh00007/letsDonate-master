import React, {useState, useEffect} from 'react';
import "./css/Card.css"; 
import { Link } from 'react-router-dom';
import { ElasticBeanstalk } from 'aws-sdk';

/*
**  Card.js
**
**  This component is the thumbnail for each product post
*/
function Card( {id, name, description, productImage} ) {

    let image;
    
    if(productImage !== '' && productImage !== null) // checks if product has an image from the database
        image = productImage; 
    else
        image = "../images/charity.png"; // default image
    
    return (
        <Link className='link' to={`/Product/${id}`/* links to product page using product name */}>
            <div className="card">
                <img  className="cardImage border border-light" 
                    src={image}
                    onError={(e) => {
                        e.target.src = '../images/charity.png' // fallback image
                    }} 
                alt=""/>

                <h2>{name}</h2>
            </div>
        </Link>
    )
}

export default Card
