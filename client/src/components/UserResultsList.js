import React from "react";
import UserListing from "./UserListing";

function UserResultsList({results, loading}) {
  return (
    <>
    <ul>
      {results.map((user) => {
        return (<UserListing
        key={user.id}
        id={user.id}
        firstName={user['first_name']}
        lastName={user['last_name']}
        stocks={user['stocks']}
        />);
      })}
      </ul>
    </>
  );
}

export default UserResultsList;
