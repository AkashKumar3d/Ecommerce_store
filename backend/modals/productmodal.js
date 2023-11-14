const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required:[true, "please enter product name"],
        trim: true,
    },
    description:{
        type: String,
        required:[true, "please enter product description"]
    },
    price:{
        type: Number,
        required:[true, "please enter product price"],
        maxLength:[8, "price cannot exceed 8 character "]
    }, 
    ratings:{
            type: Number,
            default:0
        
    },
    images:[{
        public_id:{
            type: String,
            required: false,
        },
        url:{
            type: String,
            required: true,
        }
    }
],
category:{
    type: String,
    required: [true, "please enter product category"],
},
Stock:{
    type:Number,
    required:[true, "please enter product stock"],
    maxLength:[8, "stock cannot exceed 8 characters"],
    default:1
},
noofreviews:{
    type:Number,
    default:0
},
reviews:[
    {
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"user",
            required:true,
        },
        name:{
            type: String,
            required:true,
            default:"0"
        },
        rating:{
            type: Number,
            required:true, 
            default:1
            
        },
        comment:{
            type: String,
            required:true,
            default:"0"

        }
    }
],
user:{
    type:mongoose.Schema.ObjectId,
    ref:"user",
    required:true,
},
createdAt:{
    type: Date,
    default:Date.now
}
})

module.exports =mongoose.model("Product", productSchema)