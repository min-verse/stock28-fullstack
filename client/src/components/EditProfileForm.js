import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from './state/user';

function EditProfileForm({ handleShow, showDelete }) {

    const [form, setForm] = useState({});
    const [error, setError] = useState('');
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function goToStockHome() {
        navigate("/home");
    }

    useEffect(() => {
        console.log("FIRST NAME", user['profile']['first_name'])
        setForm({
            first_name: user['profile']['first_name'],
            last_name: user['profile']['last_name']
        });
        document.getElementById('edit-first-name').value = user['profile']['first_name'];
        document.getElementById('edit-last-name').value = user['profile']['last_name'];
    }, [user]);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(form);
        let token = localStorage.getItem("jwt");
        if (token) {
            fetch(`http://localhost:5000/users/${user['profile']['id']}`, {
                method: 'PATCH',
                headers: {
                    token: token,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            }).then(res => res.json())
                .then((data) => {
                    console.log(data)
                    if (data['error']) {
                        setError(data['error']);
                    } else if (data['errors']) {
                        setError(data['errors'][0]);
                    } else {
                        document.getElementById('edit-form').reset();
                        document.getElementById('edit-first-name').value = data['first_name'];
                        document.getElementById('edit-last-name').value = data['last_name'];
                        dispatch(setUser(data));
                        goToStockHome();
                    }
                });
        } else {
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
        <>
            {error.length && error.length > 0 ? <p style={{ color: 'red' }}>{error}</p> : null}
            <form id="edit-form" onSubmit={handleSubmit} value={form}>
                <input
                    id="edit-first-name"
                    className="search-input"
                    type="text"
                    name="first_name"
                    onChange={handleFormChange}
                    placeholder="Edit your first name here"
                    style={{
                        marginTop: 15,
                        marginRight: 10,
                        marginBottom: 15,
                        borderRadius: 20
                    }}
                />
                <input
                    id="edit-last-name"
                    className="search-input"
                    type="text"
                    name="last_name"
                    onChange={handleFormChange}
                    placeholder="Edit your last name here"
                    style={{
                        marginTop: 15,
                        marginRight: 10,
                        marginBottom: 15,
                        borderRadius: 20
                    }}
                />
                <input
                    id="edit-email"
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
                    placeholder="Password"
                    style={{
                        marginTop: 15,
                        marginRight: 10,
                        marginBottom: 15,
                        borderRadius: 20
                    }}
                />
                <div>
                    <button type="submit">Submit Edits</button>
                    {showDelete ?
                        <button onClick={handleShow} type="button" className="delete-button" disabled>Delete Profile</button>
                        :
                        <button onClick={handleShow} type="button" className="delete-button">Delete Profile</button>}
                </div>

            </form>
        </>
    )
}

export default EditProfileForm;