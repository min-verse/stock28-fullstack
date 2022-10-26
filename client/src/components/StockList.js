import React from "react";
import StockListing from "./StockListing";

function StockList({stocks, handleClickChart, handleDelete, loading}) {
  return (
    <>
    <ul>
      {stocks.map((item) => {
        return (<StockListing
        key={item.id}
        id={item.id}
        ticker={item.ticker}
        name={item.name}
        history={item.history}
        description={item.description}
        handleClickChart={handleClickChart}
        handleDelete={handleDelete}
        refreshLoading={loading}
        />);
      })}
      </ul>
    </>
  );
}

export default StockList;
