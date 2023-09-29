const express = require ('express')
const app=express()
const path=require('path')
const ejsmate=require('ejs-mate')
const mongoose=require('mongoose')
//using session and making flash messages VERSION3  

const session=require('express-session')
const flash=require('connect-flash')


const sessionConfig = {
    secret: 'weneedabettersecret',
    resave: false,
    saveUninitialized: true,
  }
  
  app.use(session(sessionConfig));
  app.use(flash());
  
  app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
  });




//using method override for PATCH(modified) AND DELETE routes
const methodOverride = require('method-override');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

//ATTACHING VIEWS USING ejs 
app.engine('ejs',ejsmate)

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

//ATTACHING DATABASE
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