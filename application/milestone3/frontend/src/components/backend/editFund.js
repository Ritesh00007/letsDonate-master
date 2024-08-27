const axios = require('axios');

const editFund= function(item) {
    let form = new FormData();
    let title;
    let description;
    let fundType;
    let requiredAmount;
    let image;

    // checks if form is empty
    if(!document.forms.editUserForm.name.value && 
        !document.forms.editUserForm.description.value &&
        !document.forms.editUserForm.productType.value &&
        !document.forms.editUserForm.requiredAmount.value &&
        !document.forms.editUserForm.newProfileImage.value)
    {
        alert("Fields cannot be empty!");
        return;
    }

    // checks if there is new data for user
    if(!document.forms.editUserForm.name.value) title = item.title;
    else title = document.forms.editUserForm.name.value;

    if(!document.forms.editUserForm.description.value) description = item.description;
    else description = document.forms.editUserForm.description.value;

    if(document.forms.editUserForm.productType.value.localeCompare("default") == 0) fundType = item.fundType;
    else fundType = document.forms.editUserForm.productType.value;

    if(!document.forms.editUserForm.requiredAmount.value) requiredAmount = item.requiredAmount;
    else requiredAmount = document.forms.editUserForm.requiredAmount.value;

    if(!document.forms.editUserForm.productImage.value) 
    {
        // uses current profile picture if no new pciture is uploaded
        image = item.image; // string
        form.append("imageFile", image);
    }
    else 
    {
        image = document.forms.editUserForm.productImage; // object
        form.append("imageFile", image.files[0]);
    }

    form.append("title", title);
    form.append("description", description);
    form.append("fundType", fundType);
    form.append("owner", item.owner);
    form.append("id", item.id)
    form.append("requiredAmount", requiredAmount);
    form.append("endorsement", item.endorsement);
    console.log(form.getAll("id"), form.getAll("title"), form.getAll("description"), form.getAll("fundType"), form.getAll("requiredAmount"), form.getAll("imageFile"), form.getAll("endorsement"), form.getAll("owner"));

    // calls api to edit post to database
    axios.post("/api/editFundraiser", form, { headers: { 'content-type': "multipart/form-data"}})
    .then((result) => {
        if(result.data.success){
            alert("Post Updated Successfully");
            window.location.reload();
        }else{
            alert("Post Update Failed");
        }
    })
}

export default editFund;