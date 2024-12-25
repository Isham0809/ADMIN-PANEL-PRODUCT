const { Router } = require("express")
const productController = require("../controllers/productController")
const { uploadImage } = require("../middlewares/uploadImage")

const productRouter = Router()

productRouter.get('/add-product',productController.addProductPage)
productRouter.post('/add-product',uploadImage,productController.addProduct)

productRouter.get('/view-product',productController.viewProductPage)

productRouter.get('/edit-product/:id',productController.editProductPage)
productRouter.post('/edit-product/:id',uploadImage,productController.editProduct)

productRouter.get('/delete-product/:id',productController.deleteProduct)

module.exports = productRouter