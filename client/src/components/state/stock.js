import { createSlice } from "@reduxjs/toolkit";
export const stockSlice = createSlice({
    /* need to give your slice a name so that we can reference it in store.js */
    name: "stock",
    /* same as setting initial state for useState this is just the initial state of our slice (Context) */
    initialState: {
        portfolio: [],
        priceHistory:{},
        doughnutData:{}
    },
    reducers: {
        clearStocks: (state) => {
            state.portfolio = [];
            state.priceHistory = {};
            state.doughnutData = {};
        },
        setPortfolio: (state, action) =>{
            state.portfolio = [...action.payload];
        },
        setPriceHistory: (state, action) =>{
            state.priceHistory = {...action.payload};
        },
        setDoughnutData: (state, action) =>{
            state.doughnutData = {...action.payload};
        }
    },
});

// Action creators are generated for each case reducer function
export const { clearStocks, setPortfolio, setPriceHistory, setDoughnutData } = stockSlice.actions;

export default stockSlice.reducer;

/* a slice is the same thing as a createContext

a reducer */