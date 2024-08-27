const bcrypt = require('bcryptjs');
const axios = require('axios');
const history = require ('history');

const formData = function() {
    // form data
    let name;
    let email;
    let zipcode;
    let password;
    let password2;
    let profileImage;
    let recovery1;
    let recovery2;

    if(!document.forms.registerForm.name.value &&
        !document.forms.registerForm.email.value &&
        !document.forms.registerForm.zipcode.value &&
        !document.forms.registerForm.password.value &&
        !document.forms.registerForm.password2.value &&
        !document.forms.registerForm.recovery1.value &&
        !document.forms.registerForm.recovery2.value)
    {
        alert("Form cannot be empty!");
        return;
    }
    else
    {
        name = document.forms.registerForm.name.value;
        email = document.forms.registerForm.email.value;
        zipcode = document.forms.registerForm.zipcode.value;
        password = document.forms.registerForm.password.value;
        password2 = document.forms.registerForm.password2.value;
        profileImage = document.forms.registerForm.profileImage;
        recovery1 = document.forms.registerForm.recovery1.value;
        recovery2 = document.forms.registerForm.recovery2.value;
    }

    if(password.length < 6 && password2.length < 6)
    {
        alert("Password should be 6 or more characters");
        return;
    }

    console.log(name, email, zipcode, password, password2, profileImage, recovery1, recovery2);

    // checks if user entered the correct password twice
    if(password.localeCompare(password2) == 0)
    {
        let searchable = {};
        
        searchable["searchEmail"] = email; // login searches registered user database by email
        axios.post('/api/loginUser', searchable)
        .then((result) => {
            if(!result.data.success)
            {
                alert("Failed Search");
            }
            else
            {                
                if(result.data.users.length < 1) // account does not exist
                {
                    let form = new FormData();

                    form.append("imageFile", profileImage.files[0]);

                    form.append("name", name);
                    form.append("email", email);
                    form.append("zipcode", zipcode);
                    form.append("recovery1", recovery1);
                    form.append("recovery2", recovery2);
                    form.append("claimedProducts", 0);
                    console.log(form.getAll("name"), form.getAll("imageFile"));

                    // generate the salt for user password hash
                    
                    // appends encrypted password to form
                    let salt = bcrypt.genSaltSync(10);
                    let hash = bcrypt.hashSync(password, salt);
                    form.append("password", hash);

                    // console.log(form.getAll("name"));
                    // console.log(form.getAll("password"));

                    // calls api to register user to database
                    axios.post("/api/registerUser", form, { headers: { 'content-type': "multipart/form-data"}})
                    .then((result) => {
                        if(result.data.success){
                            alert("Successfully created account");
                            window.location.replace('/');
                        }else{
                            alert("Account Failure Occurred");
                        }
                    })
                }
                else // account exists
                {
                    alert("Account already exists");
                    return;
                }
            }
        })
    }
    else
    {
        alert("Passwords do not match");
    }
}

export default formData;