import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

// Imagine you have a list of languages that you'd like to autosuggest.
let suggestions = ['A'];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : suggestions.filter(suggestion =>
        suggestion.toLowerCase().slice(0, inputLength) === inputValue
    );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion}
    </div>
);

class AutoSuggestBox extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            suggestions: [],
            loading: true
        };
    }

    componentWillMount(){
        if(this.props.suggestionList){
            suggestions=this.props.suggestionsList;
        }
    }

    componentWillReceiveProps(newProps){
        if(newProps.suggestionList){
            this.setState({
                loading: false
            });
            suggestions = newProps.suggestionList;
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
            suggestions: getSuggestions(value)
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
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    onSuggestionSelected={this.onSuggestionSelected}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
            );
        }

    }
}

export default AutoSuggestBox;
