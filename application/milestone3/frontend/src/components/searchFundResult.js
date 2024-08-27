import React, { Component } from 'react';
import FundraiserCard from './FundraiserCard.js';
import './css/searchResult.css';

/*
**  searchFundResult.js
**
**  This page is a temporary fill in for the browsing pages in order to get items with the same name as the
**  input keywords
*/
export class searchFundResult extends Component {
    render() {

        const items = this.props.location.fundraisers;

        return (
            <div>
                <div>
                    <h1> SEARCH RESULTS</h1>
                </div>
                <div className="items">
                    {items.map(item =>
                        <FundraiserCard id={item.id} title={item.title} description={item.description} image={item.image} endorsement={item.endorsement} requiredAmount={item.requiredAmount} />
                    )}
                </div>
            </div>
        )
    }
}

export default searchFundResult
