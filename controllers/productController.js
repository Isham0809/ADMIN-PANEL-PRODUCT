const categoryModel = require('../models/categorySchema')
const product = require('../models/productSchema')
const fs = require('fs')
const subCategoryModel = require('../models/subCategorySchema')
const brandModel = require('../models/brandSchema')

module.exports = {
    addProductPage: async (req, res) => {
        let categorys = await categoryModel.find()
        let subCategorys = await subCategoryModel.find()
        let brands = await brandModel.find()
        return res.render('./pages/add-product',{
            categorys,subCategorys,brands
        })
    },
    addProduct: async (req, res) => {
        try {
            if (req.file) {
                req.body.image = req.file.path
            }
            await product.create(req.body)
            return res.redirect('./add-product')
        } catch (error) {
            console.log(error)
            return res.redirect('./add-product')
        }
    },
    viewProductPage: async (req, res) => {
        try {
            let data = await product.find({}).populate('categoryId').populate('subCategoryId').populate('brandId')
            console.log(data);
            return res.render('./pages/view-product', { data })
        } catch (error) {
            console.log(error)
            return res.render('./pages/view-product')
        }
    },
    editProductPage: async (req, res) => {
        try {
            const { id } = req.params
            const productData =  await product.findById(id)
            return res.render('./pages/edit-product', { product:productData })
        } catch (error) {
            console.log(error)
        }
    },
    editProduct: async (req, res) => {
        try {
            if (req.file) {
                req.body.image = req.file.path
                fs.unlinkSync(req.body.oldImage)
            }else{
                req.body.image = req.body.oldImage;
            }
            let productData = await product.findByIdAndUpdate(req.params.id, req.body)            
            return res.redirect('/product/view-product')
        }
        catch (error) {
            console.log(error)
            return res.redirect('/product/view-product')
        }
    },
    deleteProduct: async(req,res) => {
        try {
            const deleteData = await product.findByIdAndDelete(req.params.id)   
            fs.unlinkSync(deleteData.image)
            return res.redirect(req.get('Referrer') || '/')         
        } catch (error) {
            console.log(error)
            return res.redirect(req.get('Referrer') || '/')            
        }
    }
}