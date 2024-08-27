import React from 'react';
import './Developer.css';
import { Link } from 'react-router-dom';

function Developer({name, role, bio, image}) {
    return (
        <Link to={{
            pathname:'/about',
            details :{
                name: {name},
                role: {role},
                bio : {bio},
                image : {image}
            }
        }}>
            <div className="holder" style={{width:400}}> 
                <div className="developer">
                    <div className="developerImage">
                        <img src={image} alt="" />
                    </div>
                    <div className="developerInfo">
                        <h2>{name}</h2>
                        <h3>{role}</h3>
                    </div>
                </div>  
            </div>
        </Link>
    )
}

export default Developer;
