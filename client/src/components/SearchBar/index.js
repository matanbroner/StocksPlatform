import React, { useState } from "react";
import { Search } from "semantic-ui-react";
import styles from "./styles.module.css"
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

  const onSelectResult = (e, { result }) => {
    props.onSelect(result)
    setValue("")
  }

  return (
    <Search
      fluid
      icon="search"
      placeholder={props.placeholder || "Search..."}
      loading={props.loading}
      resultRenderer={props.renderResult}
      results={props.results}
      onResultSelect={onSelectResult}
      onSearchChange={onSearchChange}
      value={value}
      className={styles.searchBar}
      id={styles.search}
    />
  );
};

export default SearchBar;
