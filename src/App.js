import React, { useState, useEffect } from "react";
import "./styles.css";
import Item from "./Item";

export default () => {
  const [minComments, setMinComments] = useState(0);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);
  const [refInterval, setRefInterval] = useState(null);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://www.reddit.com/r/reactjs.json?limit=100"
    );
    const data = await response.json();
    setItems(data.data.children);
    setIsLoading(false);
  };

  const sortedItems = items
    .filter(item => item.data.num_comments >= minComments)
    .sort((a, b) => b.data.num_comments - a.data.num_comments);

  const autoRefresh = () => {
    if (!isRefresh) {
      setIsRefresh(true);
      setRefInterval(setInterval(getItems, 3000));
    } else {
      setIsRefresh(false);
      clearInterval(refInterval);
    }
  };

  //sortedItems[0].data.num_comments

  return (
    <div className="App">
      {isLoading ? (
        <div className="preloader">Loading...</div>
      ) : (
        <>
          <h2>Min comments: {minComments}</h2>
          <input
            className="range"
            type="range"
            value={minComments}
            min={0}
            max={500}
            onChange={e => setMinComments(e.target.value)}
            width={"30%"}
          />
          <button style={{ marginBottom: "10px" }} onClick={autoRefresh}>
            {isRefresh ? "Stop" : "Start"} auto-refresh
          </button>

          {sortedItems.length > 0 ? (
            sortedItems.map(({ data }) => (
              <Item
                key={data.id}
                title={data.title}
                num_comments={data.num_comments}
                image={data.thumbnail}
              />
            ))
          ) : (
            <div>No results found matching your criteria</div>
          )}
        </>
      )}
    </div>
  );
};
