const axios = require('axios');

const editPost = function(item) {
    let form = new FormData();
    let name;
    let description;
    let productType;
    let productImage;

    // checks if form is empty
    if(!document.forms.editUserForm.name.value && 
        !document.forms.editUserForm.description.value &&
        !document.forms.editUserForm.productType.value &&
        !document.forms.editUserForm.newProfileImage.value)
    {
        alert("Fields cannot be empty!");
        return;
    }

    // checks if there is new data for user
    if(!document.forms.editUserForm.name.value) name = item.name;
    else name = document.forms.editUserForm.name.value;

    if(!document.forms.editUserForm.description.value) description = item.description;
    else description = document.forms.editUserForm.description.value;

    if(document.forms.editUserForm.productType.value.localeCompare("default") == 0) productType = item.productType;
    else productType = document.forms.editUserForm.productType.value;

    if(!document.forms.editUserForm.productImage.value) 
    {
        // uses current profile picture if no new pciture is uploaded
        productImage = item.productImage; // string
        form.append("imageFile", productImage);
    }
    else 
    {
        productImage = document.forms.editUserForm.productImage; // object
        form.append("imageFile", productImage.files[0]);
    }

    form.append("name", name);
    form.append("description", description);
    form.append("productType", productType);
    form.append("owner", item.owner);
    form.append("id", item.id)
    console.log(form.getAll("id"), form.getAll("name"), form.getAll("description"), form.getAll("productType"), form.getAll("imageFile"), form.getAll("owner"));

    //calls api to edit post to database
    axios.post("/api/editPost", form, { headers: { 'content-type': "multipart/form-data"}})
    .then((result) => {
        if(result.data.success){
            alert("Post Updated Successfully");
            window.location.reload();
        }else{
            alert("Post Update Failed");
        }
    })
}

export default editPost;