const { default: mongoose } = require("mongoose");

const subCategorySchema = new mongoose.Schema({
    subCategoryName: {
        type: String,
        required: true
    },
    image: String,
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"categoryTbl"
    },
}, {
    timestamps: true
})

const subCategoryModel = mongoose.model("subCategoryTbl", subCategorySchema)

module.exports = subCategoryModel