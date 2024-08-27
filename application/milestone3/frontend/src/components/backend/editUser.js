import currentUser from './currentUser.js';

const bcrypt = require('bcryptjs');
const axios = require('axios');

const editUserData = function() {
    let form = new FormData();
    let currentCurrentUser = currentUser.getUser(); // gets the current user data to modify later
    let newName;
    let newEmail;
    let newZipcode;
    let newProfileImage;
    let currentPassword;
    let newPassword;
    let recovery1 = currentUser.getUser().recovery1;
    let recovery2 = currentUser.getUser().recovery2;
    let claimedProducts = currentUser.getUser().claimedProducts;

    // checks if form is empty
    if((!document.forms.editUserForm.newName.value && 
        !document.forms.editUserForm.newEmail.value &&
        !document.forms.editUserForm.newZipcode.value &&
        !document.forms.editUserForm.newProfileImage.value) &&
        (!document.forms.editUserForm.currentPassword.value ||
        !document.forms.editUserForm.newPassword.value))
    {
        alert("Fields cannot be empty!");
        return;
    }

    // checks both password fields
    if(!document.forms.editUserForm.currentPassword.value || !document.forms.editUserForm.newPassword.value)
    {
        // if no new password, keep old password
        currentPassword = currentUser.getUser().password;
        form.append("password", currentPassword);
    }
    else
    {
        currentPassword = document.forms.editUserForm.currentPassword.value;
        newPassword = document.forms.editUserForm.newPassword.value;
        
        // compare current password with encrypted password
        if(bcrypt.compareSync(currentPassword, currentUser.getUser().password) == 1)
        {
            // if a match, hash the new password
            console.log("Password Match");
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(newPassword, salt);
            form.append("password", hash);
        }
        else
        {
            alert("Wrong Password");
            return;
        }
    }

    // checks if there is new data for user
    if(!document.forms.editUserForm.newName.value) newName = currentUser.getUser().name;
    else
    {
        newName = document.forms.editUserForm.newName.value;
        currentCurrentUser.name = newName;
    }

    if(!document.forms.editUserForm.newEmail.value) newEmail = currentUser.getUser().email;
    else
    {
        newEmail = document.forms.editUserForm.newEmail.value;
        currentCurrentUser.email = newEmail;
    }

    if(!document.forms.editUserForm.newZipcode.value) newZipcode = currentUser.getUser().zipcode;
    else 
    {
        newZipcode = document.forms.editUserForm.newZipcode.value;
        currentCurrentUser.zipcode = newZipcode;
    }

    if(!document.forms.editUserForm.newProfileImage.value) 
    {
        // uses current profile picture if no new pciture is uploaded
        newProfileImage = currentUser.getUser().userImage; // string
        form.append("imageFile", newProfileImage);
        console.log(newProfileImage);
    }
    else 
    {
        newProfileImage = document.forms.editUserForm.newProfileImage; // object
        form.append("imageFile", newProfileImage.files[0]);
        console.log(newProfileImage);
    }

    form.append("name", newName);
    form.append("email", newEmail);
    form.append("zipcode", newZipcode);
    form.append("recovery1", recovery1);
    form.append("recovery2", recovery2);
    form.append("claimedProducts", claimedProducts);
    form.append("currentEmail", currentUser.getUser().email);
    //console.log(form.getAll("password"));

    // calls api to edit user to database
    axios.post("/api/editUser", form, { headers: { 'content-type': "multipart/form-data"}})
    .then((result) => {
        if(result.data.success){
            alert("Profile Updated Successfully");
            currentCurrentUser.userImage = result.data.fileLocation;
            currentUser.setUser(currentCurrentUser); // sets the current user with the new data
        }else{
            alert("Profile Update Failed");
        }
    })
    .catch(exception => {
        alert("Profile Update Failed");
    })

    //window.location.reload(); // needed to refresh what is rendered on the navbar
}

export default editUserData;