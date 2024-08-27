import React, { Component } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { Form, Label, Input, FormGroup, CustomInput } from 'reactstrap';


class CreatePost extends Component {
    state = {
        user: {},
    }
    render() {
        var productName;
        var description;
        let currentProfileEmail = this.props.currentUser;
        return (
            <Popup
              trigger={<button className="postButton"> Create a new Post </button>}
              modal
              nested
            >
              {close => (
                <div className="popup">
                  <button className="close" onClick={close}>
                    &times;
                      </button>
                  <div className="header"> <strong>CREATE A POST </strong></div>
                  <div className="content">
                    <Form>
                      <FormGroup>
                        <Label><strong>Name of Product: </strong></Label>
                        <Input value={productName}
                          onChange={(word) => {
                            productName = (word.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <br />
                        <Label><strong>Description of Product: </strong></Label>
                        <Input className="descriptionText" value={description}
                          onChange={(des) => {
                            description = (des.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <br />
                        <Label><strong>Type (Example: Furniture, Cloth): </strong></Label>
                        <select name="productType" id="productType">
                          <option value="1" selected disabled>Please select a type</option>
                          <option value="Furniture">Furniture</option>
                          <option value="Clothes">Clothes</option>
                          <option value="Food">Food</option>
                          <option value="Other">Other</option>
                        </select>
                      </FormGroup>
                      <FormGroup>
                        <br />
                        <CustomInput type="file" id="productImage" accept="image/jpg,image/jpeg,image/png" />
                      </FormGroup>
                    </Form>
                  </div>
                  <div className="actions">
    
                    {/* This posts the input data into the backend */}
                    <button
                      className="button"
                      onClick={() => {
                        if (productName.length > 0 && description.length > 0) {
                          var productImage = document.getElementById("productImage");
                          var form = new FormData();
                          form.append("imageFile", productImage.files[0]);
                          form.append("name", productName);
                          form.append("description", description);
                          form.append("productType", document.getElementById("productType").value);
                          form.append("owner", currentProfileEmail);
                          console.log(form.getAll("name"), form.getAll("imageFile"));
                          axios.post("/api/postProduct", form, { headers: { 'content-type': "multipart/form-data" } })
                            .then((result) => {
                              if (result.data.success) {
                                alert("Successfully Posted");
                                window.location.reload(); // reloads page to render proper buttons on navbar
                              } else {
                                alert("Post Failure Occurred");
                              }
                            })
                        }
                      }}
                    >
                      SUBMIT
                        </button>
                  </div>
                  <button className="button"
                    onClick={() => {
    
                    }}
                  >
                    Trouble Posting?
                        </button>
                </div>
              )}
            </Popup>
          )
    }
}
export default CreatePost