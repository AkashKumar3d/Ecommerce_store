import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all users 
export const GetAllUser = createAsyncThunk("GetAllUser", async (args, { rejectWithValue }) => {
    try {
        const config = {
            method: "get",
            withCredentials: true,
            url: `http://localhost:4500/api/v1/admin/users`,
        }

        const result = await axios(config)
        console.log(result, "getalluser result")
        return result
    } catch (error) {
        rejectWithValue(error)
    }
})


// delete user
export const DeleteUser = createAsyncThunk("DeleteUser", async (args, { rejectWithValue }) => {
    try {
        const config = {
            method: "delete",
            withCredentials: true,
            url: `http://localhost:4500/api/v1/admin/user/${args}`
        }

        const result = await axios(config)
        console.log(result, "delete result ")
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

//update user 
export const UpadateUser = createAsyncThunk("UpadateUser", async (args, { rejectWithValue }) => {
    try {
        const config = {
            method: "put",
            withCredentials: true,
            url: `http://localhost:4500/api/v1/admin/user/${args.id}`,
            data: ``
        }

        const result = await axios(config)
        console.log(result, "result")
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

// get a singeuser

export const GetSingleUser = createAsyncThunk("GetSingleUser", async (args, { rejectWithValue }) => {
    try {
        const config = {
            method: "get",
            withCredentials: true,
            url: `http://localhost:4500/api/v1/admin/user/${args}`
        }

        const result = await axios(config)
        console.log(result, "result")
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

const AllUserDetails = createSlice({
    name: "AllUserDetails",
    initialState: {
        loading: false,
        error: null,
        GetAllUserData: [],
        GetSingleUserData: {},
        DeleteUserData: null,
        UpdateUserData: null
    },

    extraReducers: {
        [GetAllUser.pending]: (state) => {
            state.loading = true
        },
        [GetAllUser.fulfilled]: (state, action) => {
            state.loading = true;
            state.GetAllUserData=action.payload;
        },
        [GetAllUser.rejected]: (state, action) => {
            state.loading = true;
            state.error= action.payload
        },

        // get single user
        [GetSingleUser.pending]: (state) => {
            state.loading = true
        },
        [GetSingleUser.fulfilled]: (state, action) => {
            state.loading = true;
            state.GetSingleUserData=action.payload;
        },
        [GetSingleUser.rejected]: (state, action) => {
            state.loading = true;
            state.error= action.payload
        },
        
        //  update user
        [UpadateUser.pending]: (state) => {
            state.loading = true
        },
        [UpadateUser.fulfilled]: (state, action) => {
            state.loading = true;
            state.UpdateUserData=action.payload;
        },
        [UpadateUser.rejected]: (state, action) => {
            state.loading = true;
            state.error= action.payload
        },

        // delete user 
        [DeleteUser.pending]: (state) => {
            state.loading = true
        },
        [DeleteUser.fulfilled]: (state, action) => {
            state.loading = true;
            state.DeleteUserData=action.payload;
        },
        [DeleteUser.rejected]: (state, action) => {
            state.loading = true;
            state.error= action.payload
        },
    }
})

export default AllUserDetails.reducer