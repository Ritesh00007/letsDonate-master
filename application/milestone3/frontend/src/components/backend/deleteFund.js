const axios = require('axios');
const currentUser = require('./currentUser.js');

const deleteFundFunction = function (id) {
    console.log(id);

    let pageRedirect = false;
    let searchable = {};
    searchable["id"] = id; // login searches registered user database by email

    if (document.forms.deleteUserForm.response.value.localeCompare("YES") === 0) {
        console.log("DELETE");
        axios.post("/api/deleteFundraiser", searchable)
            .then((result) => {
                if (result.data.success) {
                    alert("Successfully Deleted");
                } else {
                    alert("Post Failure Occurred");
                }
            })

        // route to homepage and refresh navbar
        pageRedirect = true;
    }
    else {
        console.log("DON'T DELETE");
        alert("Post not deleted");
        pageRedirect = false;
    }

    return pageRedirect;
}

export default deleteFundFunction;