import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DoughnutChart from "../DoughnutChart";
import StockList from "../StockList";
import { setStocks, setPriceHistory, setDoughnutData, clearStocksData } from "../state/user";
import { useSelector } from "react-redux";


function PortfolioMainContent() {

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function goToLogin() {
    navigate("/login");
  }

  function handleClickChart(obj) {
    console.log(obj);
  }

  function handleDelete(id) {

    const newStocks = user['stocks'].filter((stock) => {
      return stock.id !== id;
    });

    console.log(newStocks);
    if (newStocks.length) {
      const tickers = [];
      const dates = [];
      const prices = [];
      const priceHistory = [];

      newStocks[0]['history'].map((item) => {
        dates.unshift(item.date);
        priceHistory.unshift(item.price);
        return null;
      });

      newStocks.map((item) => {
        tickers.unshift(item['ticker']);
        prices.unshift(item['history'][0]['price']);
        return null;
      });

      dispatch(setPriceHistory({ ticker: tickers[0], dates: dates, prices: priceHistory }));
      dispatch(setDoughnutData({ tickers: tickers, prices: prices }));
      dispatch(setStocks(newStocks));
    } else {
      dispatch(clearStocksData());
    }
  }

  async function handleRefresh() {
    let token = localStorage.getItem("jwt");
    if (token) {
      setLoading(true);
      await fetch(`http://localhost:5000/refresh`, {
        headers: {
          token: token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).catch((error) => {
        alert(error);
        return null;
      })
      await fetch(`http://localhost:5000/myportfolio`, {
        headers: {
          token: token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then((data) => {
          setLoading(false);

          const dates = [];
          const prices = [];
          const priceHistory = [];
          const tickers = [];

          data[0]['history'].map((item) => {
            dates.unshift(item.date);
            priceHistory.unshift(item.price);
            return null;
          });

          data.map((item) => {
            tickers.unshift(item['ticker']);
            prices.unshift(item['history'][0]['price']);
            return null;
          });

          dispatch(setPriceHistory({ ticker: tickers[0], dates: dates, prices: priceHistory }));
          dispatch(setDoughnutData({ tickers: tickers, prices: prices }));
          dispatch(setStocks(data));

        });
    } else if (!token) {
      goToLogin();
    }
  }

  return <main>

    <Container style={{ height: "100vh" }} className="stock-container">

      <Row style={{ padding: 20 }}>
        {loading && <h1 className="overlay-loading">
          <span style={{ fontSize: 100 }} className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Loading
        </h1>}
        <Col xs={4}>
          <h2 className="section-headers">{user['stocks'].length && user['stocks'].length > 0 ? "Your Portfolio" : "Please add stocks to track"}</h2>
          <StockList stocks={user['stocks']} handleClickChart={handleClickChart} handleDelete={handleDelete} loading={loading} />
          {loading || !user['stocks'].length ?
            <button style={{ float: 'right' }} disabled>Refresh Data</button> :
            <button onClick={handleRefresh} style={{ float: 'right' }}>Refresh Data</button>}
        </Col>
        <Col xs={8}>
          {user['stocks'].length && user['stocks'].length > 0 ? <DoughnutChart chartData={user['doughnutData']} /> : <h6 style={{color:"black", float:"right"}}>No stocks tracked</h6>}

        </Col>
      </Row>
    </Container>
  </main>;
}

export default PortfolioMainContent;
