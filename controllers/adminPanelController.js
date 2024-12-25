const product = require("../models/productSchema")
const categoryModel = require("../models/categorySchema")
const subCategoryModel = require("../models/subCategorySchema")
const brandModel = require("../models/brandSchema")

module.exports.indexPage=async (req, res) => {
    try {
        const categories = await categoryModel.find()
        const subCategories = await subCategoryModel.find()
        const brands = await brandModel.find()
        const products = await product.find().populate("categoryId").populate("subCategoryId").populate("brandId")

        const categoryCount = categories.length
        const subCategoryCount = subCategories.length
        const brandCount = brands.length
        const productCount = products.length

        return res.render("index", { categories, subCategories, brands, products, categoryCount,subCategoryCount,brandCount,productCount })
    } catch (error) {
        return res.status(500).send("Error fetching products")
    }
}