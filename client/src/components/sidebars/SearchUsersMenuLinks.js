import React from "react";
import { Link } from "react-router-dom";

function SearchUsersMenuLinks() {
    return (
        <div className="side-menu">
            <ul>
                <Link className="menu-link" to="/">
                    <li>
                        <span role="img" aria-label="home">
                            🏚
                        </span>
                        Home
                    </li>
                </Link>
                <Link className="menu-link" to="/portfolio">
                    <li >
                        <span role="img" aria-label="heart">
                            🗀
                        </span>
                        My Portfolio
                    </li>
                </Link>
                <Link className="menu-link" to="/followings">
                    <li>
                        <span role="img" aria-label="plus">
                            🔗
                        </span>
                        Followed Users
                    </li>
                </Link>
                <Link className="menu-link" to="/search-users">
                    <li className="active">
                        <span role="img" aria-label="plus">
                            🖧
                        </span>
                        Search Users
                    </li>
                </Link>
                <Link className="menu-link" to="/add-stock">
                    <li>
                        <span role="img" aria-label="plus">
                            ➕
                        </span>
                        Add Stocks
                    </li>
                </Link>
            </ul>
        </div>
    );
}

export default SearchUsersMenuLinks;
