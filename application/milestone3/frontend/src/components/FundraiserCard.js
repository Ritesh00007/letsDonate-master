import React, { Component } from 'react'
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Star from "@material-ui/icons/Star";
import './css/FundraiserCard.css';
import { Link } from 'react-router-dom';

/*
**  FundraiserCard.js
**
**  This component is the thumbnail for each fundraiser post
*/

function FundraiserCard( {id, title, description, image, endorsement, requiredAmount} ) {

    let cardImage;
    
    if(image !== '' && image !== null) // checks if product has an image from the database
    {
        cardImage = image;
    }  
    else
    {
        cardImage = "../images/charity.png"; // default image
    }
    
    return (
        <Link className='link' to={`/Fundraiser/${id}`/* links to product page using product name */}>
            <div className="fundCard">
                    <img src={cardImage} alt="" />
                    <FavoriteBorderIcon className="heart" />
                    <div className="rightData">
                        <div className="rightDataTop">
                            <h2>{title}</h2>
                            <p>____</p>
                            <p>{description}</p>
                        </div>

                        <div className="rightDataBottom">
                            <div className="starRating">
                                <Star className="star" />
                                    <p>
                                        <strong>{endorsement}</strong>
                                    </p>
                            </div>
                            <div className="amountRequired">
                                <h2>Goal ${requiredAmount}</h2>
                            </div>
                        </div>
                    </div>
                </div>
        </Link>
    )
}

export default FundraiserCard
