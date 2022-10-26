import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../logo.svg';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RegisterBox from '../RegisterBox';
import SignInBox from '../SignInBox';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Stock28
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

function LoginPage() {
    const [showRegister, setShowRegister] = useState(true);

    const navigate = useNavigate();

  // function goToHome(){
  //   navigate('/home');
  // }
  // /* add authenctication later */
  // useEffect(()=>{
  //   let token = localStorage.getItem("jwt");
  //   if (token) {
  //     fetch(`http://localhost:5000/profile`,{
  //       headers:{
  //         token:token,
  //         'Accept':'application/json',
  //         'Content-Type':'application/json'
  //       }
  //     })
  //     .then(res=>res.json())
  //     .then((data)=>{
  //       console.log(data);
  //       console.log(data['first_name']);
  //       setUser(data);
  //       setAuth(true);
  //       goToHome();
  //     })
  //   }
  // },[]);

    const handleClick = () => {
        setShowRegister(!showRegister);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs"  sx={{
            // backgroundImage: 'url(https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#EEF1FF',
            backgroundSize: 'cover',
            borderRadius:20,
            padding:20,
            backgroundPosition: 'center',
          }}>
                <CssBaseline />
                {showRegister ? <RegisterBox handleClick={handleClick} /> :
                    <SignInBox handleClick={handleClick} />}
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}

export default LoginPage;