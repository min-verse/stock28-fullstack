import { createContext, useState } from "react";

export const FriendsContext = createContext({
    friends: {},
    setFriends:()=>{}
});

export const FriendsProvider = ({children})=>{
    const [friends, setFriends] = useState({});
    const value = {friends, setFriends};

    return(
        <FriendsProvider.Provider value={value}>{children}</FriendsProvider.Provider>
    );
};