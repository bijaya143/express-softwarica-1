const product = require('../models/productModels')

const createProduct = async (req, res) => {
    const {title, description, price, category} = req.body // Destructuring
    if(!title || !description || !price || !category  || !req.files?.['image']) { // Validation
        return res.status(400).json({success: false,
            message: 'Please enter required fields'
            });
        }
    try {
        // Existing product
        const duplicateProduct = await getProduct(title);
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
const getProduct = async (title) => {
    return await product.findOne({title: title});
}

module.exports = {createProduct};
