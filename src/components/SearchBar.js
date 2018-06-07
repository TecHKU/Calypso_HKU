import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

/**
 * @author utkarsh867
 * The search bar in the projects component
 */
class SearchBar extends Component {

    filterSearch = () => {
        const {showFilters} = this.props;
        showFilters(true);
    };

    filterButton = () => {
        return (
            <Button variant={"flat"} component={"span"} onClick={this.filterSearch}>FILTER</Button>
            /*
            <button className="btn btn-default" onClick={this.filterSearch}>
                <p>FILTER</p>
            </button>
            */
        );
    };

    onChangeInSearch = (event) => {
        const {onSearch} = this.props;
        onSearch(event.target.value);
    };

    render() {
        return (
            <div className="input-group searchbar">
                <input type="search" className="form-control" placeholder={this.props.text} name="srch-term" id="srch-term" onChange={this.onChangeInSearch}/>
                <div className="input-group-btn">
                    { this.props.filterButton ? this.filterButton() : null }
                </div>
            </div>
        );
    }
}

export default SearchBar;
