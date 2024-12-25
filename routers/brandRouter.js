const { Router } = require("express")
const brandController = require("../controllers/brandController")

const { uploadImage } = require("../middlewares/uploadImage")

const brandRouter = Router()

brandRouter.get('/add-brand',brandController.addBrandPage)
brandRouter.post('/add-brand',uploadImage,brandController.addBrand)

brandRouter.get('/view-brand',brandController.viewBrandPage)

brandRouter.get('/edit-brand/:id',brandController.editBrandPage)
brandRouter.post('/edit-brand/:id',uploadImage,brandController.editBrand)

brandRouter.get('/delete-brand/:id',uploadImage,brandController.deleteBrand)

module.exports = brandRouter