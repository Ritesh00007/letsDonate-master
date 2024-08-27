const bcrypt = require('bcryptjs');
const axios = require('axios');

const recoveryData = function() {
    let email;
    let password;
    let password2;
    let recovery1;
    let recovery2;

    if(!document.forms.recoveryForm.email.value &&
        !document.forms.recoveryForm.password.value &&
        !document.forms.recoveryForm.password2.value &&
        !document.forms.recoveryForm.recovery1.value &&
        !document.forms.recoveryForm.recovery2.value)
    {
        alert("Form cannot be empty!");
        return;
    }
    else
    {
        email = document.forms.recoveryForm.email.value;
        password = document.forms.recoveryForm.password.value;
        password2 = document.forms.recoveryForm.password2.value;
        recovery1 = document.forms.recoveryForm.recovery1.value;
        recovery2 = document.forms.recoveryForm.recovery2.value;
    }

    if(password.length < 6 && password2.length < 6)
    {
        alert("Password should be 6 or more characters");
        return;
    }

    console.log(email, password, password2, recovery1, recovery2);

    let user;
    let searchable = {};

    searchable["searchEmail"] = email; // login searches registered user database by email
    axios.post('/api/loginUser', searchable)
    .then((result) => {
        if(!result.data.success) alert("Error search database");
        else
        {
            user = result.data.users; // returns the data from the database
            if(user.length < 1)
            {
                alert("Cannot find user");
                return;
            }

            if(user[0].recovery1.localeCompare(recovery1) !== 0)
            {
                alert("Security question 1 does not match");
                return;
            }
            if(user[0].recovery2.localeCompare(recovery2) !== 0)
            {
                alert("Security question 2 does not match");
                return;
            }
            
            if(password.localeCompare(password2) !== 0)
            {
                alert("Passwords do not match");
                return;
            }
            else
            {
                // keeps the same data for everything else, but will update the password
                let form = new FormData();
                form.append("name", user[0].name);
                form.append("email", user[0].email);
                form.append("zipcode", user[0].zipcode);
                form.append("recovery1", user[0].recovery1);
                form.append("recovery2", user[0].recovery2);
                form.append("imageFile", user[0].userImage);
                form.append("currentEmail", user[0].email);

                // encrypt new password
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(password, salt);
                form.append("password", hash);

                // calls api to edit user to database
                axios.post("/api/editUser", form, { headers: { 'content-type': "multipart/form-data"}})
                .then((result) => {
                    if(result.data.success){
                        alert("New Password Updated Successfully");
                    }else{
                        alert("New Password Failed");
                    }
                })
                .catch(exception => {
                    alert("New Password Failed");
                })
            }
        }
    })
}

export default recoveryData;