import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import { useDispatch } from "react-redux";
import { setFollowing } from "./state/user";


function UserListing({ id, firstName, lastName, stocks, handleClick }) {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    function handleCardClick() {
        const tickers = [];
        const prices = [];
        stocks.map((item)=>{
            tickers.unshift(item['ticker']);
            prices.unshift(item['history'][0]['price']);
            return null;
        });
        handleClick({tickers, prices});
    }

    async function deleteFollowing() {
        setLoading(true);
        let token = localStorage.getItem("jwt");
        const result = await fetch(`http://localhost:5000/friendship/${id}`,{
            method:'DELETE',
            headers:{
                token:token,
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        })
        .then(res => res.json())
        setLoading(false);
        dispatch(setFollowing(result));
    }

    return (
        <div onClick={handleCardClick} className="card" style={{display:'flex', justifyContent:'center', alignItems:'right'}}>
            <h5 style={{display:"inline", fontWeight:"bold", fontStyle:"italic", backgroundColor:"black", padding:5, borderRadius:10}}>{firstName} {lastName}</h5>
            {stocks && stocks.length && stocks.length > 0 ?
                <p style={{fontWeight:"bold"}}>Portfolio: {stocks.map((stock, index)=>{
                if(index!==stocks.length-1){
                    return (
                    <span key={stock['id']}>{stock['ticker']}, </span>
                )
                }else{
                    return (
                    <span  key={stock['id']}>{stock['ticker']}</span>
                )
                }
            })}</p>
            :
                <p  style={{fontStyle:"italic"}}>Portfolio: <span>User has not added any stocks to their portfolio yet</span></p>
            }
            
            {loading ?
                <button
                    disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Removing...</button>
                :
                <button
                    onClick={deleteFollowing}>
                    Remove Following
                </button>}
        </div>
    );
}

export default UserListing;
