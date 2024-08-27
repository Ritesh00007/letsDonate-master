import React from 'react';
import './About.css';

function About(props) {
    console.log(props.location.details);
    let name = "Undefined Name";
    let role ="Undefined Role";
    let bio = "Sorry You cannot directly view this page. Go to Index page first and click any of the user.";
    let image = require('./images/no-pic.jpg');
    if(props.location.details!=null){
        name = props.location.details.name.name;
        role = props.location.details.role.role;
        bio = props.location.details.bio.bio;
        image = props.location.details.image.image;
    }
    
    return (
        <div className="info">
            <div className="leftSide">
                <img src={image} alt="" />
            </div>
            <div className="rightSide">
                <h1>{name}</h1>
                <h3>{role}</h3>
                <h4>{bio}</h4>
            </div>
        </div>
    )
}

export default About;
