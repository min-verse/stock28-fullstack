import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setStocks, setPriceHistory, setDoughnutData, clearUser, clearStocksData, setFollowing } from "./state/user";


function UserListing({ id, firstName, lastName, stocks }) {

    const [loading, setLoading] = useState(false);
    const [canFollow, setCanFollow] = useState(true);
    const user = useSelector((state)=> state.user);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(user['following'].length && user['following'].length > 0){
            const bool = user['following'].some(person => person.id === id)
            console.log(bool);
            setCanFollow(!bool);
        }
    },[]);

    function handleAdd() {
        setLoading(true);
        let token = localStorage.getItem("jwt");
        if (token) {
            fetch(`http://localhost:5000/friendships`, {
                method: 'POST',
                headers: {
                    token: token,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ following_id: id })
            }).then(res => res.json())
                .then((data) => {
                    setLoading(false);
                    if (data['error']) {
                        alert(data['error']);
                    } else {
                        setCanFollow(false);
                        dispatch(setFollowing(data));
                    }
                });
        }
        setLoading(false);
    }

    return (
        <div className="card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'right' }}>
            <h5 style={{ display: "inline", fontWeight: "bold", fontStyle: "italic", backgroundColor: "black", padding: 5, borderRadius: 10 }}>{firstName} {lastName}</h5>
            {stocks && stocks.length && stocks.length > 0 ?
                <p style={{ fontWeight: "bold" }}>Portfolio: {stocks.map((stock, index) => {
                    if (index !== stocks.length - 1) {
                        return (
                            <span key={stock['id']}>{stock['ticker']}, </span>
                        )
                    } else {
                        return (
                            <span key={stock['id']}>{stock['ticker']}</span>
                        )
                    }
                })}</p>
                :
                <p style={{ fontStyle: "italic" }}>Portfolio: <span>User has not added any stocks to their portfolio yet</span></p>
            }

            {loading ?
                <button
                    disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Following...</button>
                :
                canFollow ? 
                <button onClick={handleAdd} style={{ width: "10vw", float: "right" }}>Follow User</button>:
                <button style={{ width: "10vw", float: "right" }} disabled>Already Following</button>
                }

            {/* {loading || refreshLoading ?
                <button
                    disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Updating...</button>
                :
                <button
                    onClick={deleteStock}>
                    Remove Tracking
                </button>} */}
        </div>
    );
}

export default UserListing;
