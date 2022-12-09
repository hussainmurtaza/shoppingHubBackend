const Product = require('../Models/product')

exports.getAllProduct = async (req, res, next) => {
    try {
        
        const productList = await Product.find()
        res.status(200).json({status: true, data: productList})
    } catch (error) {
        
    }
}
exports.addProduct = async (req, res, next) => {
    try {
        const addProduct = new Product(req.body)
        const result = await addProduct.save()
        res.status(200).json({status: true, data: result})
    } catch (error) {
        
    }
}
exports.getProductById = async (req, res, next) => {
    try {
        const getProduct = await Product.findById({_id: req.params.id})
        res.status(200).json({status: true, data: getProduct})
    } catch (error) {
        
    }
}
exports.updateProduct = async (req, res, next) => {
    try {
        const updateProduct = await Product.updateOne({_id: req.params.id},{$set: req.body})
        res.status(200).json({status: true, data: updateProduct})
    } catch (error) {
        
    }
}
exports.deleteProduct = async (req, res, next) => {
    try {
        const deleteProduct = await Product.deleteOne({_id: req.params.id})
        if(deleteProduct.deletedCount > 0){
            res.status(200).json({status: true, message: "Deleted Successfully"})
        }
        else{
            res.status(404).json({status: false, message: "Item not found"})
        }
    } catch (error) {
        
    }
}
