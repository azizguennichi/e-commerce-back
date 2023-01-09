const express = require('express')
const productRoute = require('./routers/product.route')
const homeRoute = require('./routers/home.route')
const userRoute = require('./routers/user.route')
const path = require('path')


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,'assets')))
app.set('view engine','ejs')
app.set('views','views')

app.use('/',homeRoute)

app.use('/',productRoute)
app.get('/admin',(req,res)=>{
    res.render('admin')
})
app.use('/',userRoute)






app.listen(3000,()=>console.log('sever is ready'))