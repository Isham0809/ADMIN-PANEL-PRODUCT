const categoryModel = require('../models/categorySchema')
const fs = require('fs')

module.exports = {
    addCategoryPage: (req, res) => {
        return res.render('./pages/add-category')
    },
    addCategory: async (req, res) => {
        try {
            if (req.file) {
                req.body.image = req.file.path
            }
            await categoryModel.create(req.body)
            return res.redirect('./add-category')
        } catch (error) {
            console.log(error)
            return res.redirect('./add-category')
        }
    },
    viewCategoryPage: async (req, res) => {
        try {
            let categorys = await categoryModel.find({})
            return res.render('./pages/view-category', { categorys })
        } catch (error) {
            console.log(error)
            return res.render('./pages/view-category')
        }
    },
    editCategoryPage: async (req, res) => {
        try {
            const { id } = req.params
            const categoryData =  await categoryModel.findById(id)
            return res.render('./pages/edit-category', { category:categoryData })
        } catch (error) {
            console.log(error)
        }
    },
    editCategory: async (req, res) => {
        try {
            if (req.file) {
                req.body.image = req.file.path
                fs.unlinkSync(req.body.oldImage)
            }else{
                req.body.image = req.body.oldImage;
            }
            let categoryData = await categoryModel.findByIdAndUpdate(req.params.id, req.body)            
            return res.redirect('/category/view-category')
        }
        catch (error) {
            console.log(error)
            return res.redirect('/category/view-category')
        }
    },
    deleteCategory: async(req,res) => {
        try {
            const deleteData = await categoryModel.findByIdAndDelete(req.params.id)   
            fs.unlinkSync(deleteData.image)
            return res.redirect(req.get('Referrer') || '/')         
        } catch (error) {
            console.log(error)
            return res.redirect(req.get('Referrer') || '/')            
        }
    }
}