import React from 'react';
import { useEffect } from 'react';
import Logo from './logo.svg';
import HomePage from './components/pages/HomePage';
import PortfolioPage from './components/pages/PortfolioPage';
import AddStockPage from './components/pages/AddStockPage';
import LoginPage from './components/pages/LoginPage';
import EditProfilePage from './components/pages/EditProfilePage';
import FollowingsPage from './components/pages/FollowingsPage';
import SearchUsersPage from './components/pages/SearchUsersPage';
import './App.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, setStocks, setPriceHistory, setDoughnutData, clearUser, clearStocksData, setFollowing } from "./components/state/user";

function App() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function goToLogin() {
    navigate('/login');
  }

  useEffect(() => {
    let token = localStorage.getItem("jwt");
    console.log(token);
    if (token) {
      fetch(`http://localhost:5000/profile`, {
        headers: {
          token: token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then((data) => {
          console.log("HERE",data);
          if (data['error']) {
            alert(data['error']);
            goToLogin();
          } else {
            dispatch(setUser(data.user));
            
            if (data['stocks'].length) {
              const tickers = [];
              const dates = [];
              const prices = [];
              const priceHistory = [];

              data['stocks'].map((item) => {
                tickers.unshift(item['ticker']);
                prices.unshift(item['history'][0]['price']);
                return null;
              });

              data['stocks'][0]['history'].map((item) => {
                dates.unshift(item['date']);
                priceHistory.unshift(item['price']);
                return null;
              });

              dispatch(setStocks(data['stocks']));
              dispatch(setFollowing(data['followings']));
              dispatch(setPriceHistory({ ticker: tickers[0], dates: dates, prices: priceHistory }));
              dispatch(setDoughnutData({ tickers: tickers, prices: prices }));
            } else {
              dispatch(clearStocksData());
              dispatch(setFollowing([]));
            }
          }
        });
    } else {
      dispatch(clearUser());
      goToLogin();
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/edit-profile" element={<EditProfilePage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/followings" element={<FollowingsPage />}/>
      <Route path="/search-users" element={<SearchUsersPage />} />
      <Route path="/add-stock" element={<AddStockPage />} />
    </Routes>

  );
}

export default App;
