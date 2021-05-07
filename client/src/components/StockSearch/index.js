import React, { useState } from "react";
import styles from "./styles.module.css"
import { Label } from "semantic-ui-react"
import SearchBar from "../SearchBar"

import ApiHandler from "../../api";

const StockSearch = (props) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  async function onChange(query) {
    const route = `stock/search?keyword=${query}`;
    try {
      setLoading(true);
      const res = await ApiHandler.get("data", route);
      setResults(generateSearchBarResults(res.data));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  function generateSearchBarResults(results) {
    return results.map((result, i) => {
      return {
        id: i,
        name: result.name,
        symbol: result.symbol,
      };
    });
  }

  function renderSearchResult(result) {
    return <Label key={result.id} content={`${result.name} - ${result.symbol}`} />;
  }

  return (
    <div id={styles.wrapper}>
      <SearchBar
        loading={loading}
        results={results}
        renderResult={renderSearchResult}
        onChange={onChange}
        onSelect={props.onSelect}
      />
    </div>
  );
};

export default StockSearch