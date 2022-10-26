import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserResultsList from "../UserResultsList";
import { useDispatch } from "react-redux";
import { setStocks, setDoughnutData, clearUser } from "../state/user";
import StockPriceChart from "../StockPriceChart";


function SearchUsersMainContent() {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setresults] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const [canAdd, setCanAdd] = useState(true);
    const [chartData, setChartData] = useState({});

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


    function handleSubmit(e) {
        e.preventDefault();
        let token = localStorage.getItem("jwt");
        if (token) {
            setLoading(true);
            const newSearch = e.target.search.value.toLowerCase();
            fetch("http://localhost:5000/usersearch", {
                method: "POST",
                headers: {
                    token: token,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ friend_search: newSearch })
            }).then(res => res.json())
                .then((data) => {
                    console.log(data);
                    setLoading(false);
                    if (data['error'] && data['error'].includes("No user found")) {
                        alert(data['error']);
                    } else {
                        if (data['error']) {
                            console.log(data);
                            // setCanAdd(false);
                            // setErrorMessage(data['error']);
                            // const dates = [];
                            // const prices = [];
                            // data['stock']['history'].map((item) => {
                            //     dates.unshift(item['date']);
                            //     prices.unshift(item['price']);
                            //     return null;
                            // });
                            // setChartData({ ticker: data['stock']['ticker'], dates, prices });
                            setresults(data);
                        } else {
                            // setCanAdd(true);
                            // const dates = [];
                            // const prices = [];
                            // data['stock']['history'].map((item) => {
                            //     dates.unshift(item['date']);
                            //     prices.unshift(item['price']);
                            //     return null;
                            // });
                            // setChartData({ ticker: data['stock']['ticker'], dates, prices });
                            setresults(data);
                        }
                    }
                });
        }
    }

    return (<main>
        <h1 className="section-headers" style={{ color: 'white' }}>Search for Users to Follow</h1>
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    className="search-input"
                    type="text"
                    name="search"
                    onChange={handleChange}
                    value={search}
                    placeholder="Search for Stock28 Users"
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
            <Container style={loading ? { height: '75vh', opacity: 0.5 } : { height: '75vh', borderRadius:10, overflowY:'auto' }} className="stock-container">
            <Row>
                {results && results.length && results.length > 0 ? 
                    <UserResultsList results={results} />
                :
                <h2 style={{ padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="section-headers">Please search for users to follow.</h2>
                }
            </Row>
                {/* {results ?
                    <Row style={{ padding: 20 }}>
                        <Col xs={4}>
                            <h2 className="section-headers">{results['stock']['name']}</h2>
                            <small className="ticker" style={{ color: 'black' }}><span style={{ fontWeight: "bold" }}>Ticker Symbol: </span>{results['stock']['ticker']}</small>
                            <h6 style={{ color: 'black', fontStyle: 'italic', fontWeight: 'bold' }}>Description</h6>
                            <p style={{ color: 'black', height: '40vh', overflowY: 'scroll' }}>{results['stock']['description']}</p>
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
                        <h2 style={{ padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="section-headers">Please search for users to follow.</h2>
                    </Row>} */}
            </Container>
        </div>
    </main>);
}

export default SearchUsersMainContent;
