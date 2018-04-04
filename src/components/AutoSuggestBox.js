import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

/**
 * The auto suggestion box that can provide suggestions based on the props
 * Pass the following props to it:
 *  id - Unique id of the element
 *  enterHandler - The handler that will get the final value selected
 *  placeholder - The placeholder when nothing is typed
 *  suggestionList - The list of suggestions for the input field
 */
class AutoSuggestBox extends Component {
    state = {
        value: '',
        suggestions: [],
        suggestionList: [],
        loading: true
    };


    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0 ? [] : this.state.suggestionList.filter(suggestion =>
            suggestion.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
    getSuggestionValue = suggestion => suggestion;

// Use your imagination to render suggestions.
    renderSuggestion = suggestion => (
        <div>
            {suggestion}
        </div>
    );

    componentWillMount(){
        if(this.props.suggestionList){
            this.setState({
                suggestionList: this.props.suggestionList
            });
        }
    }

    componentWillReceiveProps(newProps){
        if(newProps.suggestionList){
            this.setState({
                loading: false,
                suggestionList: newProps.suggestionList
            });
        }
    }

    onChange = (event, { newValue, method}) => {
        this.setState({
            value: newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value, reason}) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };


    onKeyDown = (e) =>{
        let c = e.keyCode;
        if (c===13){
            let {enterHandler} = this.props;
            enterHandler(e.target.value);
            e.target.value = "";
            this.setState({
                value: ""
            })
        }
    };

    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: this.props.placeholder,
            value,
            onChange: this.onChange,
            onKeyDown: this.onKeyDown
        };
        if(this.state.loading){
            return(
                <div>
                    <p>Loading</p>
                </div>
            );
        }
        else{
            return (
                <Autosuggest
                    id={this.props.id}
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    onSuggestionSelected={this.onSuggestionSelected}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                />
            );
        }

    }
}

export default AutoSuggestBox;
