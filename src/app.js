const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express()

//Define paths for express config
const dirpath = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialspath)

//Setup a static directory
app.use(express.static(dirpath))

app.get('', (req,res) => {
    res.render('index',{
        title:'Weather app',
        name:'Arjav'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        name:'arjav'
    })
})

app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        return res.send({
            error:'Address required'
        })
    }

    geocode(req.query.address,(err,{latitude,longitude}={})=>{
        if(err){
            return res.send({
                error:err
            })
        }

        forecast(latitude,longitude,(err,forecastdata)=>{ 
            if(err){
                return res.send({
                    error:err
                })
            }
            
            res.send({
                temperature:forecastdata,
                address:req.query.address
            })

        })
    })

})

app.get('/products',(req,res)=>{
    res.send({
        products:[]
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'arjav'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404.hbs',{
        title:'404',
        errormessage:'Help article not found',
        name:'Arjav'
    })
})

app.get('*',(req,res)=>{
    res.render('404.hbs',{
        title:'404',
        errormessage:'404 page not found',
        name:'Arjav'
    })
})

app.listen(3000,()=>{
    console.log('Server is on port 3000')
})