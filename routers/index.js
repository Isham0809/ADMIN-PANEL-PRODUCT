const { Router } = require("express")

const productRouter = require('./productRouter')
const categoryRouter = require("./categoryRouter")
const subCategoryRouter = require("./subCategoryRouter")
const brandRouter = require("./brandRouter")
const userRouter = require("./userRouter")
const adminPanelRouter = require("./adminPanelRouter")

const router = Router()

router.use('/',adminPanelRouter)
router.use('/user', userRouter)
router.use('/category',categoryRouter)
router.use('/subCategory',subCategoryRouter)
router.use('/brand',brandRouter)
router.use('/product',productRouter)

module.exports = router