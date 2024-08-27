const axios = require('axios');
const currentUser = require('./currentUser.js');

const deleteUserFunction = function (email) {
    console.log(email);

    let pageRedirect = false;
    let searchable = {};
    searchable["searchEmail"] = email; // login searches registered user database by email

    if (document.forms.deleteUserForm.response.value.localeCompare("YES") === 0) {
        console.log("DELETE");
        axios.post("/api/deleteUser", searchable)
            .then((result) => {
                if (result.data.success) {
                    alert("Successfully Deleted");
                } else {
                    alert("Post Failure Occurred");
                }
            })

        currentUser.setUserLogout();
        // route to homepage and refresh navbar
        pageRedirect = true;
    }
    else {
        console.log("DON'T DELETE");
        alert("Profile not deleted");
        pageRedirect = false;
    }

    return pageRedirect;
}

export default deleteUserFunction;