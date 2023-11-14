import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";


export const Myorder = createAsyncThunk("Myorder", async (args, { rejectWithValue }) => {
    try {
        const config = {
            method: "get",
            withCredentials: true,
            url: "http://localhost:4500/api/v1/orders/me"
        }
        
        const data= await axios(config)
        // console.log(data,"orderslice")
        return data?.data?.orders
    } catch (error) {
         return rejectWithValue(error)
    }
    
})

export const getorderdetails= createAsyncThunk("getorderdetails", async(args, {rejectWithValue})=>{
    try {
        const config1={
            method:"get",
            withCredentials:true,
            url : `http://localhost:4500/api/v1/order/${args}`
        }
        const result = await axios(config1)
        console.log(result , "slicce result ")
        return result
    } catch (error) {
      return  rejectWithValue(error)
    }
})


const getOrderDetails = createSlice({
    name: "getorderdetails",
    initialState: {
        loading: false,
        myorder: [],
        getmyorder:{},
        error: null
    },

    extraReducers: {
        [Myorder.pending]: (state) => {
           state.loading=true;
        },
        [Myorder.fulfilled]: (state, action) => {
            state.loading=false;
            state.myorder=action.payload;
         },
         [Myorder.rejected]: (state, action) => {
            state.loading=false;
            state.error=action.payload;
         },
         [getorderdetails.pending]: (state) => {
            state.loading=true;
         },
         [getorderdetails.fulfilled]: (state, action) => {
             state.loading=false;
             state.getmyorder=action.payload;
          },
          [getorderdetails.rejected]: (state, action) => {
             state.loading=false;
             state.error=action.payload;
          }
 

    }

})


export default getOrderDetails.reducer