import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please Enter Your Name"],
        trim:true
    },
    description:{
        type: String,
        required:[true,"Please Enter Product Description"]
    },
    price:{
        type: Number,
        required:[true,"Please Enter Product Price"],
        maxLength:[8,"Price can't exceed 8 character"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            },

        }
    ],
    category:{
        type:String,
        required:[true,"Please Enter Product Category"]
    },
    stock:{
        type:Number,
        required:[true,"Please Enter Product Stock"],
        maxLength:[4,"Stock can't exceed 4 character"],
        default:1
    },
    numOfReviews:{
        type:String,
        default:0
    },
    reviews:[
        {
            userId: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

const Product = mongoose.model("product",productSchema)

export default Product