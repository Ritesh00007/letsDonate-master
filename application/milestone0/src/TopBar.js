import React from 'react';
import './TopBar.css';

function TopBar() {
    return (
        <div className="topbar">
            <img className="logo" 
                    src={require('./images/charity.png')}
                    alt=""
            />
            
            <div className="tagLine">
                <h1>LETS DONATE WHOLEHEARTEDLY</h1>
            </div>
        </div>
    )
}

export default TopBar;
