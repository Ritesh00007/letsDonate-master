import React, { Component } from 'react';
import Card from './Card.js';
import FundraiserCard from './FundraiserCard.js';
import './css/searchResult.css';
import axios from 'axios';

/*
**  searchResult.js
**
**  This page is a temporary fill in for the browsing pages in order to get items with the same name as the
**  input keywords
*/
export class searchResult extends Component {
    state = {
        items: [],
        fundraisers: [],
        searchTable: ''
    }

    componentDidMount() {
        let keySearch = this.props.match.params.term;

        if (keySearch) {
            let searchable = {};
            console.log(keySearch)
            searchable["searchItem"] = keySearch;
            axios.post("/api/makeSearch", searchable)
                .then((result) => {
                    if (!result.data.success) {
                        alert("Failed Search");
                    } else {
                        const items = result.data.products;
                        console.log(items);
                        this.setState({ items: items });
                        this.setState({ searchTable: this.props.match.params.table });
                    }
                })
                .catch(exception => {
                    alert("Failed Search");
                })
            axios.post("/api/makeFundSearch", searchable)
                .then((result) => {
                    if (!result.data.success) {
                        alert("Failed Search");
                    } else {
                        const fundraisers = result.data.fundraisers;
                        console.log(fundraisers);
                        this.setState({ fundraisers: fundraisers });
                        this.setState({ searchTable: this.props.match.params.table });
                    }
                })
                .catch(exception => {
                    alert("Failed Search");
                })
        }
    }

    render() {
        console.log(this.state);

        let searchTable = this.state.searchTable;

        if (searchTable.localeCompare("products") === 0) {
            return (
                <div>
                    <div>
                        <h1> SEARCH RESULTS</h1>
                    </div>
                    <div className="items">
                        {this.state.items.sort().reverse().map(item =>
                            <Card id={item.id} name={item.name} description={item.description} productImage={item.productImage} />
                        )}
                    </div>
                </div>
            )
        }

        else if (searchTable.localeCompare("fundraisers") === 0) {
            return (
                <div>
                    <div>
                        <h1> SEARCH RESULTS</h1>
                    </div>
                    <div className="items">
                        {this.state.fundraisers.sort().reverse().map(item =>
                            <FundraiserCard id={item.id} title={item.title} description={item.description} image={item.image} endorsement={item.endorsement} requiredAmount={item.requiredAmount} />
                        )}
                    </div>
                </div>
            )
        }

        else {
            return (
                <div>
                    <div>
                        <h1> SEARCH RESULTS</h1>
                        <h1>WRONG SEARCH PARAMETER</h1>
                    </div>
                </div>
            )
        }
    }
}

export default searchResult
