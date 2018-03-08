import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Search projects" name="srch-term" id="srch-term"/>
            <div class="input-group-btn">
                <button class="btn btn-default" type="submit"><i class="fas fa-search"></i></button>
            </div>
        </div>
    );
  }
}

export default SearchBar;
