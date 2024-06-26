const product = require('../models/productModels');
const { removeFile } = require('./uploadControllers');
const path = require("path");
const rootDir = process.cwd();

const createProduct = async (req, res) => {
    const {title, description, price, category} = req.body // Destructuring
    if(!title || !description || !price || !category  || !req.files?.['image']) { // Validation
        return res.status(400).json({success: false,
            message: 'Please enter required fields'
            });
        }
    try {
        // Existing product
        const duplicateProduct = await validateProduct(title);
        if(duplicateProduct) {
            return res.json({
            success: false,
            message: `Product with title: ${title} already exists.`
        });
        }
        // Product store
        await product.create({image: req.files.image.path, ...req.body});
        return res.json({
            success: true,
            message: 'Product has been created.'
        })
    } catch (error) {
        console.log('err', error)
      return res.json({
            success: false,
            message: 'Internal server error'
        });
    }
}

/**
 * 
 * @param {*} title 
 * @returns product
 */
const validateProduct = async (title) => {
    return await product.findOne({title: title});
}

const getProducts = async (req,res) => {
    const products = await product.find();
    res.status(200).json({
        success: true,
        data: products
    })
}


const getProduct = async (req, res) => {
    const product1 = await product.findOne({_id: req.params.id})
    if(!product1){
        return res.status(404).json({
            success: false,
            message: 'Product does not exist.'
        })
    }
    return res.status(200).json({
        success: true,
        data: product1,
        message: 'Product fetched successfully'
    })
}

const deleteProduct = async (req, res) => {
    const existingProduct = await product.findById(req.params.id)
    if(!existingProduct) {
        return res.json({
            success: false,
            message: 'Product does not exist.'
        })
    }
    if(existingProduct.image){
        const filePath = path.join(rootDir, existingProduct.image);
        removeFile(filePath) 
    }
    try {
        await product.findOneAndDelete(req.params.id)
        return res.status(201).json({
        success: true,
        message: 'Product has been deleted.'
    })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:'Internal Server Error'
        })  
    }
}

const updateProduct = async (req, res) => {
    let updateParams = {
        ...req.body
    }
    const existingProduct = await product.findById(req.params.id)
    if(!existingProduct) {
        return res.json({
            success: false,
            message: 'Product does not exist.'
        })
    }
    if(req.files && req.files.image){
        const filePath = path.join(rootDir, existingProduct.image);
        removeFile(filePath) 
        updateParams = {...updateParams, image: req.files.image.path}
    }
    try {
    await product.updateOne({_id: req.params.id, ...updateParams});
        return res.status(201).json({
            success: true,
            message: 'Product has been updated.'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

module.exports = {createProduct, getProducts, getProduct, deleteProduct,updateProduct};
