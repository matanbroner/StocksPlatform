import React, { useState } from "react";
import { Search } from "semantic-ui-react";
import _ from "lodash";
import styles from "./styles.module.css";



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

  const onSelectResult = (e, { result }) => props.onSelect(result)

  return (
    <Search
      id={styles.search}
      fluid
      icon="search"
      placeholder={props.placeholder || "Search a Stock..."}
      loading={props.loading}
      resultRenderer={props.renderResult}
      results={props.results}
      onResultSelect={onSelectResult}
      onSearchChange={onSearchChange}
      value={value}
    />
  );
};

export default SearchBar;
