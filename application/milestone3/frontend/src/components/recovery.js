import React from 'react';
import './css/register.css';

// contains function needed to send form information to database
import recoveryData from './backend/recoveryBackend.js';

function recovery() {

    // very basic user registration form
    // gets information needed to get sent to the database
    // buttons calls function from registerBackend.js

    return (
        <div>
            <div className='formHeader'>
                <h1>Password Reset</h1>
                <hr />
            </div>
            <div className='formBody'>
                <form id="recoveryForm" method="post">
                    <label for="email"><b>Email</b></label><br />
                    <input type="email" name="email" placeholder="Enter Email" required/><br />

                    <label for="recovery1"><b>What is your mother's maiden name?</b></label><br />
                    <input type="text" name="recovery1" placeholder="Smith" required/><br />

                    <label for="recovery2"><b>What is the name of your childhood pet?</b></label><br />
                    <input type="recovery2" name="recovery2" placeholder="Fido" required/><br />

                    <hr />

                    <label for="password"><b>New Password</b></label><br />
                    <input type="password" name="password" placeholder="Password" required/><br />

                    <label for="password2"><b>Confirm New Password</b></label><br />
                    <input type="password" name="password2" placeholder="Password" required/><br />

                    <div className="signupButton">
                        <button type="button" onClick={() => { recoveryData() }}>Reset Password</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default recovery
