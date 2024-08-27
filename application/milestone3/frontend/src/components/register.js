import React from 'react';
import './css/register.css';
import Popup from 'reactjs-popup';
import terms from './terms';

// contains function needed to send form information to database
import formData from './backend/registerBackend.js';

function register() {

    // very basic user registration form
    // gets information needed to get sent to the database
    // buttons calls function from registerBackend.js

    return (
        <div>
            <div className='formHeader'>
                <h1>Sign Up to Let's Donate</h1>
                <hr />
            </div>
            <div className='formBody'>
                <form id="registerForm" method="post">
                    <label for="name"><b>Name</b></label><br />
                    <input type="text" name="name" placeholder="John Smith" required /><br />

                    <label for="email"><b>Email</b></label><br />
                    <input type="email" name="email" placeholder="Enter Email" required /><br />

                    <label for="zipcode"><b>Zip Code</b></label><br />
                    <input type="number" name="zipcode" placeholder="Enter Zip Code" required /><br />

                    <label for="password"><b>Password</b></label><br />
                    <input type="password" name="password" placeholder="Enter Password" required /><br />

                    <label for="password2"><b>Confirm Password</b></label><br />
                    <input type="password" name="password2" placeholder="Comfirm Password" required /><br />

                    <label><b>Profile Image:</b></label><br />
                    <input type="file" id="profileImage" accept="image/jpg,image/jpeg,image/png" required />

                    <br />
                    <h2>Recovery Questions</h2>
                    <hr /><br />

                    <label for="recovery1"><b>What is your mother's maiden name?</b></label><br />
                    <input type="text" name="recovery1" placeholder="Smith" required /><br />

                    <label for="recovery2"><b>What is the name of your childhood pet?</b></label><br />
                    <input type="recovery2" name="recovery2" placeholder="Fido" required /><br />

                    <div className="signupButton">
                        <button type="button" onClick={() => { formData() }}>Sign Up</button>
                        <div>
                            <Popup
                                trigger={<button className="postButton"> Terms and Conditions </button>}
                                modal
                                nested
                            >
                                {close => (
                                    <div className="popup">
                                        <button className="close" onClick={close}>&times;</button>
                                        <ul className="content">
                                            {terms()}
                                        </ul>
                                    </div>
                                )}
                            </Popup>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default register
