import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
    /* need to give your slice a name so that we can reference it in store.js */
    name: "user",
    /* same as setting initial state for useState this is just the initial state of our slice (Context) */
    initialState: {
        profile: {},
        isAuthenticated: false,
        stocks:[],
        following:[],
        priceHistory:{},
        doughnutData:{}
    },
    reducers: {
        setUser: (state, action) => {
            state.profile = { ...action.payload };
            state.isAuthenticated = true;
        },
        clearUser: (state) => {
            state.profile = {};
            state.isAuthenticated = false;
            state.stocks=[];
            state.priceHistory={};
            state.doughnutData={};
        },
        setStocks: (state, action) =>{
            state.stocks = [...action.payload];
        },
        setFollowing: (state, action) =>{
            state.following = [...action.payload];
        },
        setPriceHistory: (state, action) =>{
            state.priceHistory = {...action.payload};
        },
        setDoughnutData: (state, action) =>{
            state.doughnutData = {...action.payload};
        },
        clearStocksData: (state) =>{
            state.stocks=[];
            state.priceHistory={};
            state.doughnutData={};
        }
    },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser, setStocks, setPriceHistory, setDoughnutData, clearStocksData, setFollowing } = userSlice.actions;

export default userSlice.reducer;

/* a slice is the same thing as a createContext

a reducer */