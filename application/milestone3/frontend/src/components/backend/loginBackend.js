const bcrypt = require('bcryptjs');
const axios = require('axios');

const currentUser = require('./currentUser.js');

const loginData = function() {
    let email;
    let password;

    if(!document.forms.loginForm.email.value || !document.forms.loginForm.password.value) // if text boxes are empty
    {
        alert("Text fields are empty!");
        return;
    }
    else
    {
       email = document.forms.loginForm.email.value;
       password = document.forms.loginForm.password.value;
    }

    console.log(email, password);

    // similar code to searching api
    let user;
    let searchable = {};
    
    searchable["searchEmail"] = email; // login searches registered user database by email
    axios.post('/api/loginUser', searchable)
    .then((result) => {
        if(!result.data.success){
            alert("Failed Search");
        }else{
            user = result.data.users; // returns the data from the database

            // compare login password with encrypted password from database
            bcrypt.compare(password, user[0].password, function(err, isMatch){
                if(err) throw err;
                if(isMatch)
                {
                    console.log("Password Match");
                    currentUser.setUser(user[0]); // sets the current user
                    console.log(currentUser.getUser());
                    window.location.reload(); // reloads page to render proper buttons on navbar
                }
                else
                {
                    alert("Wrong Password");
                }
            });

        }
    })
    .catch(exception => {
        alert("Failed Search");
    })
}

export default loginData;