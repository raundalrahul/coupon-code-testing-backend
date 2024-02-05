const express = require('express')
const mongoose = require('mongoose')

const app = express()
mongoose.connect('mongodb://127.0.0.1:27017/test1')
.then(()=>{
    console.log('MongoDB connected!!')
})
.catch((err)=>{
    console.log('error', err)
})

const schema = new mongoose.Schema({
    Title:{
        type:String,
        require:true
    },
    Description:{
        type:String,
        require:true
    },
    Code:{
        type:String,
        require:true
    }
})
const coupon =  mongoose.model('data', schema)

//Middleware
app.use(express.urlencoded({ extended:false }))

//POST request
app.post('/add', async(req, res)=>{
    const { body } = req
    const result = await coupon.create({
        Title:body.title,
        Description:body.description,
        Code:body.code
    })
    console.log(result)
    return res.status(201).json(result)
})

app.get('/add',async(req, res)=>{
    const allCoupon = await coupon.find({})
    return res.json(allCoupon)
})

app.listen(3000,()=> console.log('App is listening...'))