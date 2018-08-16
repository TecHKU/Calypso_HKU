import React, { Component } from 'react';
/**
 * @author utkarsh867
 * The search bar in the projects component
 */
class SearchBar extends Component {

    onChangeInSearch = (event) => {
        const {onSearch} = this.props;
        onSearch(event.target.value);
    };

    render() {
        return (
            <div className="input-group searchbar">
                <input type="search" className="form-control" placeholder={this.props.text} name="srch-term" id="srch-term" onChange={this.onChangeInSearch}/>
            </div>
        );
    }
}

export default SearchBar;
