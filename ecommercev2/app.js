const express = require ('express')
const app=express()
const path=require('path')
const ejsmate=require('ejs-mate')
const mongoose=require('mongoose')

const methodOverride = require('method-override');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))


app.engine('ejs',ejsmate)

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://127.0.0.1/ecommerce')// using ip address instead of localhost:27017 / "movieDB " is a database

.then(()=>console.log('db connected'))
.catch(err=>console.log(err))

//ROUTES

const productRoutes=require('./routes/productroutes')
const reviewRoutes = require('./routes/reviewRoutes');



app.use(productRoutes)
app.use(reviewRoutes)
// app.get('/products',(req,res)=>{
//     res.render('products/index')
// })


app.listen(3000,()=>{
    console.log('server is running')
})