import React, { Component } from 'react';

/**
 * @author utkarsh867
 * The search bar in the projects component
 */
class SearchBar extends Component {
    filterSearch = () =>{
        const {showFilters} = this.props;
        showFilters(true);
    };
  render() {
    return (
        <div className="input-group searchbar">
            <input type="search" className="form-control" placeholder={this.props.text} name="srch-term" id="srch-term" onChange={event => this.props.onSearch(event.target.value)}/>
            <div className="input-group-btn">
                <button className="btn btn-default" onClick={this.filterSearch}>
                    <i className="fas fa-filter"></i>
                </button>
            </div>
        </div>
    );
  }
}

export default SearchBar;
