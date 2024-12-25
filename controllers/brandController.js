const brandModel = require("../models/brandSchema")
const subCategoryModel = require("../models/subCategorySchema")
const categoryModel = require('../models/categorySchema')

const fs = require('fs')

module.exports = {
    addBrandPage: async (req, res) => {
        let categorys = await categoryModel.find()
        let subCategorys = await subCategoryModel.find()
        return res.render('./pages/add-brand',{
            categorys,subCategorys
        })
    },
    addBrand: async (req, res) => {
        try {
            if (req.file) {
                req.body.image = req.file.path
            }
            await brandModel.create(req.body)            
            return res.redirect('./add-brand')
        } catch (error) {
            console.log(error)
            return res.redirect('./add-brand')
        }
    },
    viewBrandPage: async (req, res) => {
        try {
            let Brand = await brandModel.find({}).populate('categoryId')
            return res.render('./pages/view-brand', { Brand })
        } catch (error) {
            console.log(error)
            return res.render('./pages/view-brand')
        }
    },
    editBrandPage: async (req, res) => {
        try {
            const { id } = req.params
            const brandData =  await brandModel.findById(id)
            return res.render('./pages/edit-brand', { brand:brandData })
        } catch (error) {
            console.log(error)
        }
    },
    editBrand: async (req, res) => {
        try {
            if (req.file) {
                req.body.image = req.file.path
                fs.unlinkSync(req.body.oldImage)
            }else{
                req.body.image = req.body.oldImage;
            }
            let brandData = await brandModel.findByIdAndUpdate(req.params.id, req.body)            
            return res.redirect('/brand/view-brand')
        }
        catch (error) {
            console.log(error)
            return res.redirect('/brand/view-brand')
        }
    },
    deleteBrand: async(req,res) => {
        try {
            const deleteData = await brandModel.findByIdAndDelete(req.params.id)   
            fs.unlinkSync(deleteData.image)
            return res.redirect(req.get('Referrer') || '/')         
        } catch (error) {
            console.log(error)
            return res.redirect(req.get('Referrer') || '/')            
        }
    }
}