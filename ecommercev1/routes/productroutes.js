const express=require('express')

const router=express.Router()

const Product=require('../models/product')

//SHOWING ALL THE PRODUCTS

router.get('/products',async(req,res)=>{
    const products=await Product.find({})
    res.render('products/index',{products})
})

//SHOWING NEW PRODUCT FORM

router.get('/product/new',(req,res)=>{
    res.render('products/new')
})

//ADDING A NEW PRODUCT
router.post('/products',async(req,res)=>{
    const {name,price,desc,img}= req.body
    await Product.create({name,price,desc,img})
    res.redirect('/products')
})

//SHOWING THE SPECIFICPRODUCT

router.get('/product/:productid',async(req,res)=>{
    const {productid}=req.params
    const product=await Product.findById(productid)
    res.render('products/show',{product})
})

//GET THE EDIT FORM

router.get('/products/:productid/edit',async(req,res)=>{
    const {productid}=req.params
    const product=await Product.findById(productid)
    res.render('products/edit',{product})
})                                           

//UPDATING A PRODUCT
router.patch('/product/:productid', async (req, res) => {
    const { productid } = req.params;
    const { name, price, desc, img } = req.body;
    await Product.findByIdAndUpdate(productid, { name, price, desc, img });
    res.redirect(`/product/${productid}`);
});

//DELETING A PRODUCT

router.delete('/products/:productid',async(req,res)=>{
    const {productid}=req.params
    await Product.findByIdAndDelete(productid)
    res.redirect('/products')
})
module.exports=router;