import React, { useCallback, useEffect, useState } from "react";
import "./style.css";
import SuggestionList from "./SuggestionList";
import debounce from "lodash/debounce";

const AutoComplete = ({
  placeholder = "",
  staticData,
  fetchSuggestion,
  dataKey,
  customLoading = "Laoding",
  onSelect = () => {},
  onBlur = () => {},
  onFocus = () => {},
  onChange = () => {},
  customStyles = {},
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  const getSuggestions = async (query) => {
    console.log("this is runingokay ");
    setError(null);
    setLoading(true);
    try {
      // intialise the result varaible ,
      let result;
      if (staticData) {
        console.log("runnign inside the static data ");
        // if static data is avliable , then find the query word from this , data and return it
        result = staticData.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });
      } else if (fetchSuggestion) {
        console.log("runnign inside the fetch suggetsion ");

        // if the static data is not avliable make the api call and get the result from this value
        result = await fetchSuggestion(query);
      }

      setSuggestion(result);
    } catch (error) {
      setError("Failed to fetch suggestion");
      setSuggestion([]);
    } finally {
      setLoading(false);
    }
  };

  // importing the library lodash and using the debouncing from it ,
  // wrapping inside the useCllback so that this fn shiuld not call on every render
  const getSuggestionDebounce = useCallback(debounce(getSuggestions, 200), []);
  useEffect(() => {
    // if the user type more than 1 charcter the call the fn get suggestion
    if (inputValue.length > 1) {
      // the typed value is  passing in the get suggestion
      getSuggestionDebounce(inputValue);
    } else {
      setSuggestion([]);
    }
  }, [inputValue]);

  // suggestion handler
  const handleSuggestionClick = (suggestion) => {
    setInputValue(dataKey ? suggestion[dataKey] : dataKey);

    onSelect(suggestion);
    setSuggestion([]);
  };

  console.log("suggestion list is ...", suggestion);

  console.log("input value is ", inputValue);
  return (
    <>
      <div className="container">
        <input
          type="text"
          value={inputValue}
          placeholder={placeholder}
          //   style={customStyles}
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={handleInputChange}
        />

        {(suggestion.length > 0 || loading || error) && (
          <ul className="suggestions-list">
            {error && <div className="error">{error}</div>}
            {loading && <div className="loading">{customLoading}</div>}

            <SuggestionList
              dataKey={dataKey}
              highlight={inputValue}
              suggestion={suggestion}
              onSuggestionClick={handleSuggestionClick}
            />
          </ul>
        )}
      </div>
    </>
  );
};

export default AutoComplete;
