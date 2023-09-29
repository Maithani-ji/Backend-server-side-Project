const express = require ('express')
const app=express()
const path=require('path')
const ejsmate=require('ejs-mate')
const mongoose=require('mongoose')

const productRoutes=require('./routes/productroutes')
const methodOverride = require('method-override');


app.engine('ejs',ejsmate)

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://127.0.0.1/ecommerce')// using ip address instead of localhost:27017 / "movieDB " is a database

.then(()=>console.log('db connected'))
.catch(err=>console.log(err))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))


app.use(productRoutes)
// app.get('/products',(req,res)=>{
//     res.render('products/index')
// })


app.listen(3000,()=>{
    console.log('server is running')
})