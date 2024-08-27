import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Card from './Card.js';
import './css/Products.css';

/*
**  Products.js
**
**  This displays a map of all the available products from the database
**  and should allow the user to filter and sort the map.
*/
class Products extends Component {
    // The items that will appear in the map.
    state = {
        items: []
      }

    //gets the whole list of items from the backend.
    componentDidMount() {
        axios.get(`/api`)
          .then(res => {
            const items = res.data;
            this.setState({ items });
        })
      }

    allProducts() {
        axios.get(`/api`)
          .then(res => {
            const items = res.data;
            this.setState({ items });
          })
    }

    setCategory(filterCategory)
    {      
        // change state based on checked box
        let checkBox = document.getElementById(filterCategory);
        if(checkBox.checked == true)
        {
            // filters to searched category
            let countCategory = this.state.items.filter((obj) => {return obj.productType === filterCategory});
            const items = countCategory; 
            this.setState({items});
            //console.log("State:", this.state);
            //console.log("Filtered", countCategory);
        }
        else this.allProducts();
    }

    getCategories()
    {
        // gets the list of categories and the count in each
        let occurrences = { };
        for(let i = 0, j = this.state.items.length; i < j; i++) 
        {
            occurrences[this.state.items[i].productType] = (occurrences[this.state.items[i].productType] || 0) + 1;
        }
        //console.log(occurrences);

        // returns a map of the categories and their count
        return (
            Object.keys(occurrences).sort().map(item => 
            <div><label><input type="checkbox" id={item} onClick={() => {this.setCategory(item)}}/>{item} ({occurrences[item]})</label></div>
            )
        );
    }

  render() {
    return (
        <div className="h-75 x-1 grid">
          <Grid container spacing={3}>
            {/* filters */}
            <Grid item sm={12} md={2} className="filters border-right border-dark">
              <h1>Filters</h1>
              {this.getCategories()}
            </Grid>
            {/* products */}
            <Grid item sm={12} md={10}>
              <div className="items">
                {this.state.items.sort().reverse().map(item => 
                  <Card id={item.id} name={item.name} description={item.description} productImage={item.productImage}/>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
    );
  }
}
export default Products;