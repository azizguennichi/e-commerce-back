const route = require('express').Router()
const userModel = require('../models/user.model')

route.get('/register',(req,res,next)=>{
    res.render('register')
})

route.post('/register',(req,res)=>{
    userModel.register(req.body.email,req.body.userName,req.body.password)
    .then(()=>res.redirect('/login'))
    .catch((err)=>res.send(err))
})

route.get('/login',(req,res)=>{
    res.render('login')
})

route.post('/login',(req,res)=>{
    userModel.login(req.body.email,req.body.password)
    .then(()=>res.redirect('/'))
    .catch(()=>res.redirect('/login'))
})


module.exports = route

