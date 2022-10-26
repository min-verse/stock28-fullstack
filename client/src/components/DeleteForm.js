import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {clearUser} from "./state/user";

function DeleteForm({ handleShow }) {

    const [form, setForm] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state)=>state.user);

    function goToLogin(){
        navigate("/login");
    }

    function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        console.log(form);
        let token = localStorage.getItem("jwt");
        if (token) {
            fetch(`http://localhost:5000/deleteuser/${user['profile']['id']}`, {
                method: 'POST',
                headers: {
                    token: token,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            }).then(res => res.json())
                .then((data) => {
                    setLoading(false);
                    if(data['error']){
                        setError(data['error']);
                    }else{
                        localStorage.removeItem("jwt");
                        dispatch(clearUser());
                        goToLogin();
                    }
                });
        }else{
            alert('User is not logged in. Please log in to continue');
        }
    }

    function handleFormChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        console.log(form);
        console.log(name, value);
        setForm((prevForm) => {
            return {
                ...prevForm,
                [name]: value
            }
        });
    }

    return (
        <div>
        {error.length ? <p style={{color:'red'}}>{error}</p>: null}
            <form onSubmit={handleSubmit}>
                <input
                    className="search-input"
                    type="text"
                    name="email"
                    onChange={handleFormChange}
                    placeholder="Enter your email"
                    style={{
                        marginTop: 15,
                        marginRight: 10,
                        marginBottom: 15,
                        borderRadius: 20
                    }}
                />
                <input
                    className="search-input"
                    type="password"
                    name="password"
                    onChange={handleFormChange}
                    placeholder="New Password"
                    style={{
                        marginTop: 15,
                        marginRight: 10,
                        marginBottom: 15,
                        borderRadius: 20
                    }}
                />
                <input
                    className="search-input"
                    type="password"
                    name="confirmPassword"
                    onChange={handleFormChange}
                    placeholder="Enter your password to confirm changes"
                    style={{
                        marginTop: 15,
                        marginRight: 10,
                        marginBottom: 15,
                        borderRadius: 20
                    }}
                />
                <div>
                    {loading ? 
                    <button type="submit" className="delete-button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Deleting...</button>
                    : 
                    <button type="submit" className="delete-button">Delete Profile</button>}
                    <button type="button" onClick={handleShow}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default DeleteForm;