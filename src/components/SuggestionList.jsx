import React from "react";
import "./style.css";

const SuggestionList = ({
  suggestion = [],
  highlight,
  dataKey,
  onSuggestionClick,
}) => {
  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));

    return (
      <span>
        {parts.map((part, index) => {
          return part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={index}>{part}</b>
          ) : (
            part
          );
        })}
      </span>
    );
  };

  return (
    <>
      {suggestion.map((item, index) => {
        const currentSuggestion = dataKey ? item[dataKey] : suggestion;

        return (
          <li
            key={index}
            onClick={() => onSuggestionClick(item)}
            className="suggestion-item"
          >
            {getHighlightedText(currentSuggestion, highlight)}
          </li>
        );
      })}
    </>
  );
};

export default SuggestionList;
