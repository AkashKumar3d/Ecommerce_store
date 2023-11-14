import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { json } from "body-parser";


// add to card api 
export const addtocart = createAsyncThunk("addtocart", async (args, { rejectWithValue }) => {
    const {id, newqty}=args
    console.log(args.id, args.newqty, "args")
    const config = {
        method: 'get',
        url: `http://localhost:4500/api/v1//product/${args}`
    }

    try {
        const result = await axios(config)
        console.log(result, "cart result ")
        localStorage.setItem('cartItems', JSON.stringify(result));
        return result
    } catch (error) {
        return rejectWithValue(error)
    }

})

export const ShippingInfo = createAsyncThunk("ShippingInfo" , async(args, )=>{
    localStorage.setItem("shippingInfo",JSON.stringify(args))
})

const cartdetails = createSlice({
    name: "cartdetails",
    initialState: {
        carts:  localStorage.getItem("cartItems")? [JSON.parse(localStorage.getItem("cartItems"))] :[] ,
        shippinginfo:localStorage.getItem("shippingInfo")? [JSON.parse(localStorage.getItem("shippingInfo"))]:{},
        loading: false,
        error: null
    },



    extraReducers: {
        [addtocart.pending]: (state) => {
            state.loading = true
        },
        [addtocart.fulfilled]: (state, action) => {
            state.loading = false;
            state.carts = action.payload
                // console.log(carts, "cartsts")
        },
        [addtocart.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },

        [ShippingInfo.pending]: (state) => {
            state.loading = true
        },
        [ShippingInfo.fulfilled]: (state, action) => {
            state.loading = false;
            state.shippinginfo = action.payload
                // console.log(carts, "cartsts")
        },
        [ShippingInfo.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }

})


export default cartdetails.reducer



