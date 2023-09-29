const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Review=require('../models/review')


router.post('/product/:productid/review', async(req, res)=> { //go through text.txt
    
    // Submit form --> productid,review(rating,comments)

    const {productid} = req.params;
    const {rating ,comment}=req.body

    // find a product with given product id 

    const product= await Product.findById(productid)

    // create a actual review in a reiview collection

    const review=await Review.create({rating,comment})

    // console.log(review)

    // push the review into product.reiview array
    product.reviews.push(review)

    await product.save() //USE OF "POPULATE" IN PRODUCTROUTES -> SHOW ROUTE 

    res.redirect(`/product/${productid}`) 
}    )

module.exports = router;