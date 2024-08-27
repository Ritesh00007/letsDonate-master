import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from './Card.js';
import './css/Home.css';
import FundraiserCard from './FundraiserCard';

/*
**  Home.js
**
**  This is the landing page, the first page users will see when they reach the website.
*/
class Home extends Component {
  // These are to be the products that appear on the featured lists within the page.
  state = {
    items: [],
    funds: []
  }

  constructor(props) {
    super(props);
  }

  // This gets all the items from the backend.
  componentDidMount() {
    axios.get(`/api`)
      .then(res => {
        const items = res.data;
        this.setState({ items });
        console.log("See Below");
      })

    axios.get(`/api/Fundraisers`)
      .then(res => {
        const funds = res.data;
        this.setState({ funds });
      })
  }

  render() {
    console.log(this.state);
    return (
      <div className="Home">

        {/* This is the landing banner and is supposed to be what draws users in and explains what the website is about. */}
        <div className="LandingBanner-bg"><div className="LandingBanner">
          <h1>Let's Donate</h1>
          <p className="statement">
            Let's Donate is the inbetween <br />
            for people that want to give  <br />
            donations directly to those that <br />
            need it and people that seek <br />
            out help in their time of need. <br />
          </p>
        </div></div>
        <hr className="separator"></hr>
        <div>
          <h2 className="featured">Featured</h2>
        </div>
        <hr />

        {/* 
          This is the featured list of products available with a button to the products page
          and each of the cards links to their post.
         */}
        <Link className='buttonLink' to={"/Products"}>View All Products</Link>
        <div className="scrollmenu">
          {this.state.items.sort().reverse().map(item => <Card id={item.id} name={item.name} description={item.description} productImage={item.productImage} />)}
        </div>
        <hr />

        {/* 
          This is the featured list of fundraisers available with a button to the fundraisers page
          and each of the cards links to their post.
         */}
        <Link className='buttonLink' to={"/Fundraisers"}>View All Fundraisers</Link>
        <div className="scrollmenu">
        {this.state.funds.sort().reverse().map(item =>
            <FundraiserCard id={item.id} title={item.title} description={item.description} image={item.image} endorsement={item.endorsement} requiredAmount={item.requiredAmount} />
          )}
        </div>
        <hr />
      </div>
    );
  }
}
export default Home;