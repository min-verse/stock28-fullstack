import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AutoGraphIcon from '@mui/icons-material/AutoGraph'; import Typography from '@mui/material/Typography';
import { setUser, setStocks, setPriceHistory, setDoughnutData, clearUser, clearStocksData, setFollowing } from "./state/user";
import { useSelector, useDispatch } from 'react-redux';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignInBox({ handleClick }) {

    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const goToStockHome = () => {
        navigate('/home');
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const loginInfo = {
            email: data.get('email'),
            password: data.get('password')
        };
        setLoading(true);
        await fetch(`http://localhost:5000/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        }).then(res => res.json())
            .then((data) => {
                if (data['error']) {
                    setLoading(false);
                    setError(data['error']);
                    return;
                } else {
                    localStorage.setItem("jwt", data['token']);
                    console.log(data);
                    dispatch(setUser(data['user']));
                    setLoading(false);
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

                        dispatch(setFollowing(data['followings']));
                        dispatch(setStocks(data['stocks']));
                        dispatch(setPriceHistory({ ticker: tickers[0], dates: dates, prices: priceHistory }));
                        dispatch(setDoughnutData({ tickers: tickers, prices: prices }));
                        goToStockHome();
                    } else {
                        dispatch(clearStocksData());
                        goToStockHome();
                    }
                }
            });
    };

    return (
        <>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Stock28
                </Typography>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <AutoGraphIcon />
                </Avatar>
                {loading ?
                    <Typography component="h1" variant="h5">
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Logging in...
                    </Typography>
                    :
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                }
                {error.length && error.length >= 0 ?
                    <p style={{ color: 'red' }}>{error}</p>
                    : null}
                <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                    </Grid>
                    {loading ?
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled>
                            Logging in...
                        </Button>
                        :
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>}
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link onClick={handleClick} href="#" variant="body2">
                                Don't have an account? Sign up today
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
}
