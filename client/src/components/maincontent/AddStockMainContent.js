import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector, useDispatch } from "react-redux";
import { setStocks, setPriceHistory, setDoughnutData, clearUser } from "../state/user";
import StockPriceChart from "../StockPriceChart";


function AddStockMainContent() {
  const [reachedMaximum, setReachedMaximum] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [canAdd, setCanAdd] = useState(true);
  const [chartData, setChartData] = useState({});

  const user = useSelector((state) => state.user)

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("jwt");
    if (token) {
      fetch(`http://localhost:5000/myportfolio`, {
        headers: {
          token: token,
          'Content-Type': 'application/json'
        },
      })
        .then(res => res.json())
        .then((data) => {
          if (data.length && data.length >= 5) {
            setReachedMaximum(true);
          }
        });
    } else if (!token) {
      dispatch(clearUser());
      navigate("/login");
    }
  }, []);

  function handleChange(e) {
    const newSearch = e.target.value;
    console.log(newSearch);
    setSearch(newSearch);
  }

  function handleAdd() {
    let token = localStorage.getItem("jwt");
    if (token) {
      fetch(`http://localhost:5000/user_stocks`, {
        method: 'POST',
        headers: {
          token: token,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ ticker: result['stock']['ticker'] })
      }).then(res => res.json())
        .then((data) => {
          if (data['error']) {
            alert(data['error']);
          } else {

            if (data.length && data.length >= 5) {
              setReachedMaximum(true);
            }

            const prices = [];
            const tickers = [];
            data.map((item) => {
              tickers.unshift(item['ticker']);
              prices.unshift(item['history'][0]['price']);
              return null;
            });

            if(data.length && data.length === 1){

              const dates = [];
              const priceHistory = [];

              data[0]['history'].map((item)=>{
                dates.unshift(item['date']);
                priceHistory.unshift(item['price']);
                return null;
              });

              dispatch(setPriceHistory({ticker: tickers[0], dates:dates, prices:priceHistory}));
            }
            
            dispatch(setStocks(data));
            dispatch(setDoughnutData({ tickers: tickers, prices: prices }));
            setCanAdd(false);
            setErrorMessage('Stock has been added to portfolio');
          }
        });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    let token = localStorage.getItem("jwt");
    if (token) {
      setLoading(true);
      const newSearch = e.target.search.value.toUpperCase();
      fetch("http://localhost:5000/stocksearch", {
        method: "POST",
        headers: {
          token: token,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ ticker: newSearch })
      }).then(res => res.json())
        .then((data) => {
          console.log(data);
          setLoading(false);
          if (data['error'] && data['error'].includes("could not be found.")) {
            alert(data['error']);
          } else {
            if (data['error']) {
              console.log(data);
              setCanAdd(false);
              setErrorMessage(data['error']);
              const dates = [];
              const prices = [];
              data['stock']['history'].map((item) => {
                dates.unshift(item['date']);
                prices.unshift(item['price']);
                return null;
              });
              setChartData({ ticker: data['stock']['ticker'], dates, prices });
              setResult(data);
            } else {
              setCanAdd(true);
              const dates = [];
              const prices = [];
              data['stock']['history'].map((item) => {
                dates.unshift(item['date']);
                prices.unshift(item['price']);
                return null;
              });
              setChartData({ ticker: data['stock']['ticker'], dates, prices });
              setResult(data);
            }
          }
        });
    }
  }

  function handleRefresh() {
    setLoading(true);
    let token = localStorage.getItem("jwt");
    fetch(`http://localhost:5000/stockrefresh/${result['stock']['id']}`, {
      token: token,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => res.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
        const dates = [];
        const priceHistory = [];
        data['history'].map((item) => {
          dates.unshift(item['date']);
          priceHistory.unshift(item['price']);
          return null;
        });
        setChartData({ ticker: data['ticker'], dates:dates, prices:priceHistory });
        if (result['error'] && result['error'] === "Stock already in portfolio") {
          const tickers = [];
          const prices = [];
          
          user['stocks'].map((item)=>{
            tickers.unshift(item['ticker']);
            if(item['id']===data['id']){
              prices.unshift(data['history'][0]['price']);
            }else{
              prices.unshift(item['history'][0]['price']);
            }
            return null;
          });

          const updatedStocks = user['stocks'].filter((stock)=>{
            return stock.id !== result['stock']['id']
          });
          dispatch(setPriceHistory({ticker: result['stock']['ticker'], dates:dates, prices: priceHistory }));
          dispatch(setDoughnutData({tickers: tickers, prices: prices}));
          dispatch(setStocks([data, ...updatedStocks]));
        }
      })
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 3000);
  }

  

  return (<main>
    {reachedMaximum ?
      <h1 className="section-headers" style={{ color: 'red' }}>Maximum Number of Stocks Already in Portfolio - Unable to Add More</h1>
      : <h1 className="section-headers" style={{ color: 'white' }}>Search for Stock to Add</h1>}
    <div>

      <form onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          name="search"
          onChange={handleChange}
          value={search}
          placeholder="Search for a Stock by Ticker Symbol"
          maxLength={5}
          style={{
            marginTop: 15,
            marginRight: 10,
            marginBottom: 15,
            width: '65vw',
            height: '5vh',
            borderRadius: 20
          }}
        />
        {loading ?
          <button
            className="search-button"
            type="submit"
            style={{
              backgroundColor: 'gray',
              fontStyle: 'italic',
              marginTop: 15,
              marginRight: 15,
              marginBottom: 15,
              height: '5vh',
              borderRadius: 20
            }}
            disabled>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...</button> :
          <button
            className="search-button"
            type="submit"
            style={{
              marginTop: 15,
              marginRight: 15,
              marginBottom: 15,
              height: '5vh',
              borderRadius: 20
            }}
          >Search</button>}
      </form>
      <Container style={loading ? { height: '75vh', opacity: 0.5 } : { height: '75vh' }} className="stock-container">
        {result ?
          <Row style={{ padding: 20 }}>
            <Col xs={4}>
              <h2 className="section-headers">{result['stock']['name']}</h2>
              <small className="ticker" style={{ color: 'black' }}><span style={{ fontWeight: "bold" }}>Ticker Symbol: </span>{result['stock']['ticker']}</small>
              <h6 style={{ color: 'black', fontStyle: 'italic', fontWeight: 'bold' }}>Description</h6>
              <p style={{ color: 'black', height: '40vh', overflowY: 'auto' }}>{result['stock']['description']}</p>
              {canAdd ? <button onClick={handleAdd}>Add to Portolio</button> : <button style={{ backgroundColor: 'gray', fontStyle: 'italic' }} disabled>{errorMessage}</button>}
            </Col>
            <Col xs={8}>
              <StockPriceChart chartData={chartData} />
              {loading ?
                <button style={{ float: 'right' }} disabled>Refresh Data</button>
                :
                <button onClick={handleRefresh} style={{ float: 'right' }}>Refresh Data</button>}
            </Col>
          </Row> :
          <Row style={{ padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h2 style={{ padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="section-headers">Please search for a stock to display its data here.</h2>
          </Row>}
      </Container>
    </div>
  </main>);
}

export default AddStockMainContent;
