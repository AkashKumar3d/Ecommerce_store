import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

// login here 


export const getuser = createAsyncThunk("getuser", async (args, { rejectWithValue }) => {
    const email = args.loginEmail;
    const password = args.loginPassword;
    console.log(email, password, "emailidpassword")
    try {
        const config = {
            // mode: "cors",
            method: "post",
            withCredentials: true,
            url: "http://localhost:4500/api/v1/login",
            headers: {
                "Content-Type": "application/json",
            },
            data: { email, password }
        }

        const result = await axios(config)
        alert("login Sucessfully ")
        return result.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

// loaduser 
export const loadUser = createAsyncThunk("loadUser", async (args, { rejectWithValue }) => {
    try {
        const config = {
            method: "get",
            withCredentials: true,
            url: "http://localhost:4500/api/v1/me"
        }
        const result = await axios(config)
        console.log(result, "loaduser")
        return result
    } catch (error) {
        rejectWithValue(error)
    }
})

// logout user here
export const logout = createAsyncThunk("logout", async (args, { rejectWithValue }) => {
    try {
        const config = {
            method: 'get',
            url: "http://localhost:4500/api/v1/logout",
            withCredentials: true,
        }
        const result = await axios(config)
        console.log(result, "logout result")
        return result
    } catch (error) {
     return rejectWithValue(error)
    }
})

// register here  
export const registeruser = createAsyncThunk("registeruser", async (args, { rejectWithValue }) => {
    try {
        const config = {
            method: "post",
            url: 'http://localhost:4500/api/v1/register',
            data: args
        }
        console.log(args, "args")
        const re = await axios(config)
        alert("submitted successfully")
        return re
    } catch (error) {
        return rejectWithValue(error)
    }
})

// update profile
export const Updateprofile = createAsyncThunk("Updateprofile", async (args, { rejectWithValue }) => {
   console.log(args.id, "userslice")
    try {
        const id=args.id ? args.id : ""
        const data=args.obj ? args.obj :""
        const config = {
            method: "put",
            url: `:http://localhost:4500/api/v1/me/update`,
            headers: {
                "Content-Type": "application/json"
            },
            data:data
        }

        const result = await axios(config)
        console.log(result, "updtaed profile")
        return result
    } catch (error) {
        console.error(error)
        return rejectWithValue(error)
    }
})
const Userdetails = createSlice({
    name: 'userdetails',
    initialState: {
        loginuser: [],
        // userinfo:[],
        loading: false,
        isAuthenticated: false,
        isupdated: false,
        error: null,

    },

    extraReducers: {
        // login user 
        [getuser.pending]: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        [getuser.fulfilled]: (state, action) => {
            state.loading = false,
                state.isAuthenticated = true;
            state.loginuser = action.payload;


        },
        // register user
        [getuser.rejected]: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },
        [registeruser.pending]: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        [registeruser.fulfilled]: (state, action) => {
            state.loading = false,
                state.isAuthenticated = true;
            console.log(action.payload, "all action")

        },
        [registeruser.rejected]: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },

        // loaduser 
        [loadUser.pending]: (state) => {
            state.loading = true
            state.isAuthenticated = false
        },
        [loadUser.fulfilled]: (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.loginuser = action.payload
            console.log(action.payload, "load userdata")

        },
        [loadUser.rejected]: (state, action) => {
            state.loading = false,
                state.isAuthenticated = false,
                state.loginuser = null,
                state.error = action.payload
        },

        [logout.pending]: (state) => {
            state.loading = true
        },
        [logout.fulfilled]: (state, action) => {
            state.loading = false,
                state.isAuthenticated = false,
                state.loginuser = action.payload
        },
        [logout.rejected]: (state, action) => {
            state.loading = false,
                state.error = action.payload
        },
        // updated user 
        [Updateprofile.pending]:(state)=>{
            state.loading =false
        },
        [Updateprofile.fulfilled]:(state, action)=>{
            state.loading =false
            state.isupdated= true
           
        },
        [Updateprofile.rejected]:(state)=>{
            state.loading =false,
            state.isupdated= true
        }

    }
})

export default Userdetails.reducer;