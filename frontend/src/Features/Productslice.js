import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



// get all products
export const getallproducts = createAsyncThunk("getallproducts", async (args, { rejectWithValue }) => {
    console.log(args, "args")
    // const keyword = args?.keyword != undefined ? args?.keyword :""
    // serch 
    // filter 
    // category
    try {
        let link = `http://localhost:4500/api/v1/products?page=${args?.currentPage}`
        const config = {
            mode: "cors",
            method: "get",
            url: link,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "cache-control": "no-cache",
            }
        }

        const response = await axios(config);
        // console.log(response, "my respose is find")
        return response;
    } catch (error) {
        // console.log("error")
        return rejectWithValue(error)
    }
})



// get all product details function
export const Get_All_Product_Detail = createAsyncThunk("Get_All_Product_Details", async (_id, { rejectWithValue }) => {
    console.log(_id, "id")
    try {
        const config = {
            mode: "cors",
            method: "get",
            url: `http://localhost:4500/api/v1/product/${_id}`,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "cache-control": "no-cache",
            },
        }
        const response = await axios(config);
        console.log(response, "final reponse")
        return response.data.product;
    } catch (error) {
        // console.log("error")
        return rejectWithValue(error)
    }
})

export const newReview = createAsyncThunk("newReview", async (args, { rejectWithValue }) => {
    try {
        console.log(args, "review args")
        const config = {
            method: "put",
            withCredentials: true,
            url: "http://localhost:4500/api/v1/review",
            headers: {
                "Content-Type": "application/json"
            },
            data: args

        }
        const result = await axios(config)
        console.log(result, "review result")
        return review
    } catch (error) {

    }
})

//  get all products for only admin access
export const getAdminProducts = createAsyncThunk("getAdminProducts", async (args, { rejectWithValue }) => {
    try {
        const config = {
            method: "get",
            withCredentials: true,
            url: "http://localhost:4500/api/v1/admin/products"
        }

        const result = await axios(config)
        console.log(result, "admin all products ")
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

// create new product 
export const CreateNewProduct = createAsyncThunk("CreateNewProduct", async (args, { rejectWithValue }) => {

    const config = {
        method: "POST",
        withCredentials: true,
        url: "http://localhost:4500/api/v1/admin/product/new",
        headers: {
            "Content-Type": "application/json"
        },
        data: args
    }

    const result = await axios(config)
    return result
})

export const UpdateProduct1 = createAsyncThunk("updateProduct", async (args, { rejectWithValue }) => {
    console.log(args, "args id" )
    try{
        const config = {
            method: "put",
            withCredentials: true,
            url: `http://localhost:4500/api/v1/admin/products/${args.productId}`,
            headers: {
                "Content-Type": "application/json"
            },
            data: args.obj
        }
    
        const result = await axios(config)
        return result
    }catch (error){
   return rejectWithValue(error)
    }
    
})

export const deleteProduct = createAsyncThunk("deleteProduct", async (args, { rejectWithValue }) => {
    console.log(args, "args")
    try {
        const config = {
            method: "delete",
            withCredentials: true,
            url: `http://localhost:4500/api/v1/admin/products/${args}` 
        }
        const result = await axios(config)
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})
const productdetails = createSlice({
    name: 'productdetails',
    initialState: {
        products: [],
        loading: false,
        error: null,
        adminproduct: [],
        newreview: [],
        newproduct: false,
        product: {},
        isdeleted: null,
        updateProduct:null

    },

    // initalize the extrareducer 
    extraReducers: {

        [getallproducts.pending]: (state) => {
            state.loading = true;
        },
        [getallproducts.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload;
            // console.log(action.payload, "data successful")
        },
        [getallproducts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
            // console.log(action.payload, "data")
        },

        // get all product details 
        [Get_All_Product_Detail.pending]: (state) => {
            state.loading = true,
                { ...state }
        },
        [Get_All_Product_Detail.fulfilled]: (state, action) => {
            state.loading = false;
            state.product = action.payload

        },
        [Get_All_Product_Detail.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
            console.log(action.payload, "data")
        },

        // get all reviews 
        [newReview.pending]: (state) => {
            state.loading = true,
                { ...state }
        },
        [newReview.fulfilled]: (state, action) => {
            state.loading = false;
            state.newreview = action.payload

        },
        [newReview.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
            console.log(action.payload, "data")
        }
        ,

        // get all product for admin
        [getAdminProducts.pending]: (state) => {
            state.loading = true

        },
        [getAdminProducts.fulfilled]: (state, action) => {
            state.loading = false;
            state.adminproduct = action.payload

        },
        [getAdminProducts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },

        // create new product 
        [CreateNewProduct.pending]: (state) => {
            state.loading = true;
        },
        [CreateNewProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.newproduct = true;
        },
        [CreateNewProduct.rejected]: (state, action) => {
            state.loading = false;
            state.newproduct = false;
            state.error = action.payload;

        },

        // update product 
        [UpdateProduct1.pending]: (state) => {
            state.loading = true;
        },
        [UpdateProduct1.fulfilled]: (state, action) => {
            state.loading = false;
            state.updateProduct = action.payload;
        },
        [UpdateProduct1.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // delete product 
        [deleteProduct.pending]: (state) => {
            state.loading = true;
        },
        [deleteProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.isdeleted = action.payload;
        },
        [deleteProduct.rejected]: (state, action) => {
            state.loading = false;
            state.error=action.payload
            isdeleted=false

        },
    }
})

export default productdetails.reducer;