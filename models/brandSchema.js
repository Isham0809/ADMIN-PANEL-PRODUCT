const { default: mongoose } = require("mongoose");

const brandSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true
    },
    image: String,
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"categoryTbl"
    },
    subCategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"subCategoryTbl"
    }
}, {
    timestamps: true
})

const brandModel = mongoose.model("brandTbl", brandSchema)

module.exports = brandModel