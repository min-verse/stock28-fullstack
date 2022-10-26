import React, { useState } from "react";
import Card from 'react-bootstrap/Card';


function StockListing({ id, ticker, name, history, description, refreshLoading, handleClickChart, handleDelete }) {

  const [loading, setLoading] = useState(false);

  function handleClick() {
    const dates = [];
    const prices = [];
    history.map((item) => {
      dates.unshift(item.date);
      prices.unshift(item.price);
      return null;
    });
    handleClickChart({ ticker, dates, prices });
  }

  async function deleteStock() {
    const isConfirmed = window.confirm("Are you sure you want to stop tracking this stock in your portfolio?");
    if (isConfirmed) {
      setLoading(true);
      let token = localStorage.getItem("jwt");
      if (token) {
        await fetch(`http://localhost:5000/user_stocks/${id}`, {
          method: "DELETE",
          headers: {
            token: token,
            'Content-Type': 'application/json'
          }
        });
        setLoading(false);
        handleDelete(id);
      } else {
        alert('User is not logged in or session has expired. Please log in.');
      }
    }
  }

  return (
    <div onClick={handleClick} className="card">
      <p>{ticker} <span style={{ marginRight: 0 }}>{history[0]['price']}</span></p>
      {loading || refreshLoading ?
        <button
          disabled>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Updating...</button>
        :
        <button
          onClick={deleteStock}>
          Remove Tracking
        </button>}
    </div>
  );
}

export default StockListing;
