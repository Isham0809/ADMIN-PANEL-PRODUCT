const { Router } = require("express")
const categoryController = require("../controllers/categoryController")

const { uploadImage } = require("../middlewares/uploadImage")

const categoryRouter = Router()

categoryRouter.get('/add-category',categoryController.addCategoryPage)
categoryRouter.post('/add-category',uploadImage,categoryController.addCategory)

categoryRouter.get('/view-category',categoryController.viewCategoryPage)

categoryRouter.get('/edit-category/:id',categoryController.editCategoryPage)
categoryRouter.post('/edit-category/:id',uploadImage,categoryController.editCategory)

categoryRouter.get('/delete-category/:id',categoryController.deleteCategory)


module.exports = categoryRouter