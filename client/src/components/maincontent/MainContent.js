import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StockList from "../StockList";
import { useDispatch, useSelector } from "react-redux";
import NewsFeature from "../NewsFeature";
import NewsList from "../NewsList";
import StockPriceChart from "../StockPriceChart";
import { setStocks, setPriceHistory, setDoughnutData, clearStocksData } from "../state/user";

function MainContent() {

  const [articles, setArticles] = useState([]);
  const [featured, setFeatured] = useState({});
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function goToLogin() {
    navigate('/login');
  }

  useEffect(() => {
    fetch(`http://localhost:5000/news`)
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        setArticles(data);
        console.log(data[0]);
        setFeatured(data[0]);
      });
  }, []);

  function handleClickFeatured(obj) {
    setFeatured(obj);
  }

  function handleClickChart(obj) {
    dispatch(setPriceHistory(obj));
  }

  function handleDelete(id) {

    const newStocks = user['stocks'].filter((stock) => {
      return stock.id !== id;
    });

    if (newStocks.length) {
      const dates = [];
      const prices = [];
      const priceHistory = [];
      const tickers = [];

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

  return (<main>
    <Container className="stock-container">
      <Row style={{ padding: 20 }}>
        {loading && <h1 className="overlay-loading">
          <span style={{ fontSize: 100 }} className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Loading
        </h1>}
        <Col xs={4}>
          <h2 className="section-headers">{user['stocks'].length && user['stocks'].length > 0 ? "Your Tracked Stocks" : "Please add stocks to track into your portfolio"}</h2>
          <StockList stocks={user['stocks']} handleClickChart={handleClickChart} handleDelete={handleDelete} loading={loading} />
        </Col>
        <Col xs={8}>
          {user['stocks'].length && user['stocks'].length > 0 ? <StockPriceChart chartData={user['priceHistory']} /> : <h6 style={{color:"black"}}>No stocks tracked</h6>}
          {loading || !user['stocks'].length ?
            <button style={{ float: 'right' }} disabled>Refresh Data</button> :
            <button onClick={handleRefresh} style={{ float: 'right' }}>Refresh Data</button>}
        </Col>
      </Row>
    </Container>
    <Container className="news-container">
      <Row style={{ padding: 20 }}>
        <Col xs={8} >
          <h2 className="section-headers">Top Daily News</h2>
          <NewsFeature
            featured={featured}
          />
        </Col>
        <Col xs={4} style={{ overflow: 'hidden' }}>
          <NewsList
            articles={articles}
            handleClickFeatured={handleClickFeatured}
          />
        </Col>
      </Row>
    </Container>
  </main>);
}

export default MainContent;
