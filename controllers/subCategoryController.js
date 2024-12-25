const subCategoryModel = require("../models/subCategorySchema")
const categoryModel = require('../models/categorySchema')

const fs = require('fs')

module.exports = {
    addSubCategoryPage: async (req, res) => {
        let categorys = await categoryModel.find()
        return res.render('./pages/add-subCategory',{
            categorys
        })
    },
    addSubCategory: async (req, res) => {
        try {
            if (req.file) {
                req.body.image = req.file.path
            }
            await subCategoryModel.create(req.body)            
            return res.redirect('./add-subCategory')
        } catch (error) {
            console.log(error)
            return res.redirect('./add-subCategory')
        }
    },
    viewSubCategoryPage: async (req, res) => {
        try {
            let subCategory = await subCategoryModel.find({}).populate('categoryId')
            return res.render('./pages/view-subCategory', { subCategory })
        } catch (error) {
            console.log(error)
            return res.render('./pages/view-subCategory')
        }
    },
    editSubCategoryPage: async (req, res) => {
        try {
            const { id } = req.params
            const subCategoryData =  await subCategoryModel.findById(id)
            return res.render('./pages/edit-subCategory', { subCategory:subCategoryData })
        } catch (error) {
            console.log(error)
        }
    },
    editSubCategory: async (req, res) => {
        try {
            if (req.file) {
                req.body.image = req.file.path
                fs.unlinkSync(req.body.oldImage)
            }else{
                req.body.image = req.body.oldImage;
            }
            let subCategoryData = await subCategoryModel.findByIdAndUpdate(req.params.id, req.body)            
            return res.redirect('/subCategory/view-subCategory')
        }
        catch (error) {
            console.log(error)
            return res.redirect('/subCategory/view-subCategory')
        }
    },
    deleteSubCategory: async(req,res) => {
        try {
            const deleteData = await subCategoryModel.findByIdAndDelete(req.params.id)   
            fs.unlinkSync(deleteData.image)
            return res.redirect(req.get('Referrer') || '/')         
        } catch (error) {
            console.log(error)
            return res.redirect(req.get('Referrer') || '/')            
        }
    }
}