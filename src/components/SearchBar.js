import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
        <div className="input-group">
            <input type="text" className="form-control" placeholder="Search projects" name="srch-term" id="srch-term"/>
            <div className="input-group-btn">
                <button className="btn btn-default" type="submit">
                    <i className="fas fa-search"></i>
                </button>
            </div>
        </div>
    );
  }
}

export default SearchBar;
