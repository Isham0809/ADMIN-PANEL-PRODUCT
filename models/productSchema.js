const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    name:String,
    price:Number,
    description:String,
    image:String,
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"categoryTbl"
    },
    subCategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"subCategoryTbl"
    },
    brandId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"brandTbl"
    }
},{
    timestamps:true
})

const product = mongoose.model("productTbl",productSchema)

module.exports = product