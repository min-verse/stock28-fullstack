import React from "react";
import FollowedListing from "./FollowedListing";

function FollowedList({ following, handleClick }) {
  return (
    <div style={{ height: '80vh', overflowY: 'auto' }}>
      <ul>
        {following.map((user) => {
          return (<FollowedListing
            key={user.id}
            id={user.id}
            firstName={user['first_name']}
            lastName={user['last_name']}
            stocks={user['stocks']}
            handleClick={handleClick}
          />);
        })}
      </ul>
    </div>
  );
}

export default FollowedList;
