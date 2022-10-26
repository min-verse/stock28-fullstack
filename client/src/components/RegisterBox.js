import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { setUser, clearStocksData } from "./state/user";

function RegisterBox({ handleClick }) {
    let navigate = useNavigate();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const goToStockHome = () => {
        navigate('/home');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const data = new FormData(event.currentTarget);
        const newUser = {
            email: data.get('email'),
            password: data.get('password'),
            confirmPassword: data.get('confirmPassword'),
            firstName: data.get('firstName'),
            lastName: data.get('lastName')
        };
        await fetch(`http://localhost:5000/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newUser)
        }).then(res => res.json())
            .then((data) => {
                if (data['errors']) {
                    setLoading(false);
                    setErrors(data['errors']);
                } else {
                    localStorage.setItem("jwt", data['token']);
                    dispatch(setUser(data['user']));
                    dispatch(clearStocksData());
                    setLoading(false);
                    goToStockHome();
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
                    <DataSaverOnIcon />
                </Avatar>
                {loading ?
                    <Typography component="h1" variant="h5">
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Registering...
                    </Typography>
                    :
                    <Typography component="h1" variant="h5">
                        Sign Up Today
                    </Typography>
                }
                {errors.length && errors.length >= 0 ? errors.map((item) => {
                    return (
                        <p style={{ color: 'red' }}>{item}</p>
                    );
                }) : null}
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                            />
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
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                autoComplete="new-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link onClick={handleClick} href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
}

export default RegisterBox;