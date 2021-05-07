import React, { useState } from "react";
import { Search } from "semantic-ui-react";
import _ from "lodash";



const SearchBar = (props) => {
  const [value, setValue] = useState("");

  const handleSearchChange = (e, { value }) => {
    setTimeout(() => {
      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = (result) => re.test(result.company);
    }, 300);
  };

  const onSearchChange = (e, { value }) => {
    setValue(value);
    props.onChange(value);
  }

  const onSelectResult = (e, { result }) => props.onSelect(value)

  const renderResults = (result) => {
    return (
      <div key={result.key}>
        <div>{result.value}</div>
      </div>
    );
  };

  return (
    <Search
      fluid
      icon="search"
      placeholder={props.placeholder || "Search..."}
      loading={props.loading}
      onResultSelect={onSelectResult}
      onSearchChange={onSearchChange}
      results={props.results}
      value={value}
      resultRenderer={renderResults}
    />
  );
};

export default SearchBar;
