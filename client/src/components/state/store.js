import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user.js';
import stockReducer from './stock.js';


/* this exports store */
export default configureStore({
  reducer: {
    /* the format of these key:value attributes 
    'name_we_gave_slice: nameReducer' 
    you can have multiple key:value pairs here that represent many different slices (Contexts) */

    user:userReducer,
    stock:stockReducer

  },
})

/* first have a store folder that will store your state library
store.js and a file representing a slice (same thing as Context) is the library of states*/

/* import this into child Components via useSelector for when you actually want to access these states in the slices

import { useSelector } from "react-redux";
const user = useSelector((state) => state.user);*/

/* import this into child Components via useDispatch for when you wan to SET the state associated with the slice that is associated with the reducer

import { useDispatch } from "react-redux";
import { setUser } from "../state/user.js";
const dispatch = useDispatch();
dispatch(setUser(data.user)); */
