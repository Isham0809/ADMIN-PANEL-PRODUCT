const { Router } = require("express")
const subCategoryController = require("../controllers/subCategoryController")

const { uploadImage } = require("../middlewares/uploadImage")

const subCategoryRouter = Router()

subCategoryRouter.get('/add-subCategory',subCategoryController.addSubCategoryPage)
subCategoryRouter.post('/add-subCategory',uploadImage,subCategoryController.addSubCategory)

subCategoryRouter.get('/view-subCategory',subCategoryController.viewSubCategoryPage)

subCategoryRouter.get('/edit-subCategory/:id',subCategoryController.editSubCategoryPage)
subCategoryRouter.post('/edit-subCategory/:id',uploadImage,subCategoryController.editSubCategory)

subCategoryRouter.get('/delete-subCategory/:id',subCategoryController.deleteSubCategory)

module.exports = subCategoryRouter