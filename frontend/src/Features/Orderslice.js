import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "dotenv";

export const CreateOrder = createAsyncThunk("CreateOrder", async (args, { rejectWithValue }) => {
    console.log(args, "createfinalorder")
    const config = {
        method: "post",
        withCredentials: true,
        url: "http://localhost:4500/api/v1/order/new",
        header: {
            "Content-Type": "application/json"
        },
        data: args
    }

    await axios(config).then((res) => {
        console.log(response)
        return response
    }).catch((err) => {
        return rejectWithValue(err)
    })
})

// admin route 
export const GetOrder = createAsyncThunk("GetOrder", async (args, { rejectWithValue }) => {
    try {
        const config = {
            method: "get",
            withCredentials: true,
            url: `http://localhost:4500/api/v1/admin/orders`,

        }
        const result = await axios(config)
        console.log(result, "Getorder")
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

// update order
export const UpdateOrder = createAsyncThunk("UpdateOrder", async (args, { rejectWithValue }) => {
    console.log(args.id , args.obj, "all upadte")
    try {
        const config = {
            method: "put",
            withCredentials: true,
            url: `http://localhost:4500/api/v1/admin/order/${args.id}`,
            headers: {
                "Content-Type": "application/json"
            },
            data: args.obj

        }
        const result = await axios(config)
        console.log(result, "updateorder")
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})


// delete order
export const DeleteOrder = createAsyncThunk("DeleteOrder", async (args, { rejectWithValue }) => {
    try {
        const config = {
            method: "delete",
            withCredentials: true,
            url: `http://localhost:4500/api/v1/admin/order/${args}`


        }
        const result = await axios(config)
        console.log(result, "deleteorder")
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})


const orderDetails = createSlice({
    name: "orderDetails",
    initialState: {
        loading: false,
        order: [],
        error: null,
        getOrder: [],
        updateorder: null,
        deleteorder: null,

    },

    extraReducers: {
        [CreateOrder.pending]: (state) => {
            state.loading = true;
        },
        [CreateOrder.fulfilled]: (state, action) => {
            state.loading = false;
            state.order = action.payload
        },
        [CreateOrder.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },

        // get all order
        [GetOrder.pending]: (state) => {
            state.loading = true
        },
        [GetOrder.fulfilled]: (state, action) => {
            state.loading = false,
                state.getOrder = action.payload
        },
        [GetOrder.rejected]: (state, action) => {
            state.loading = true,
                state.error = action.payload
        },

        // update order
        [UpdateOrder.pending]: (state) => {
            state.loading = true
        },
        [UpdateOrder.fulfilled]: (state, action) => {
            state.loading = false,
                state.updateorder = action.payload
        },
        [UpdateOrder.rejected]: (state, action) => {
            state.loading = true,
                state.error = action.payload
        },

        // update order
        [DeleteOrder.pending]: (state) => {
            state.loading = true
        },
        [DeleteOrder.fulfilled]: (state, action) => {
            state.loading = false,
                state.deleteorder = action.payload
        },
        [DeleteOrder.rejected]: (state, action) => {
            state.loading = true,
                state.error = action.payload
        },

    }
})

export default orderDetails.reducer