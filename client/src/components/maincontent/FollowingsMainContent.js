import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DoughnutChart from "../DoughnutChart";
import StockList from "../StockList";
import FollowedList from "../FollowedList";
import { setStocks, setPriceHistory, setDoughnutData, clearStocksData } from "../state/user";
import { useSelector } from "react-redux";


function FollowingsMainContent() {

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(false);
  console.log(user.following)
  const navigate = useNavigate();
  console.log(user);
  useEffect(()=>{
    if(user['following'].length && user['following'].length > 0 && user['following'][0]['stocks'].length && user['following'][0]['stocks'].length > 0){
      const tickers = [];
      const prices = [];
      user['following'][0]['stocks'].map((item)=>{
        tickers.unshift(item['ticker']);
        prices.unshift(item['history'][0]['price']);
        return null;
      });
      setChartData({tickers: tickers, prices: prices});
    }
  },[user]);

  function handleClick(obj) {
    setChartData(obj);
  }

  return <main>

    <Container style={{ height: "100vh" }} className="stock-container">

      <Row style={{ padding: 20 }}>
        {loading && <h1 className="overlay-loading">
          <span style={{ fontSize: 100 }} className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Loading
        </h1>}
        <Col xs={4}>
          <h2 className="section-headers">{user['following'].length && user['following'].length > 0 ? "Your Followed Users" : "Please add Stock28 users to follow"}</h2>
          <FollowedList following={user['following']} handleClick={handleClick} loading={loading} />
        </Col>
        <Col xs={8}>
          {user['following'].length && user['following'].length > 0 && chartData ? <DoughnutChart chartData={chartData} /> : <h6 style={{color:"black", float:"right"}}>No portfolio to display</h6>}
        </Col>
      </Row>
    </Container>
  </main>;
}

export default FollowingsMainContent;
