const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
//define paths for Express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directoy to serve
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
res.render('index',{
    title:'Weather',
    name:'Sasi',
})
})

app.get('/about',(req,res)=>{
res.render('about',{
    title:'About',
    name:'Sasi'
})
})

app.get('/help',(req,res)=>{
res.render('help',{
    title:'Help',
    description:'This is a Help Document for App',
    name:'Sasi'
})
})
app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'Please provide address to search'
        })
    }
    geocode(req.query.address,(error,{latitude,langitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,langitude,(error,forecast)=>{
            if(error){
                return res.send({error})
            }
            //console.log(location)
            //console.log(forecast)
            res.send({location,forecast})
        })
    })

    // res.send({
    //     forcast:'partly cloudy',                          // can send JSON objects, array of objects
    //     location:'Hyderabad',
    //     address:req.query.address
    // })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',                                      //handling wild card routes 
        name:'Sasi',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
res.render('404',{
    title:'404',                                         //handling generic 404 page
    name:'Sasi',
    errorMessage:'Page not found'
})
})

app.listen('2020',()=>{
    console.log("You are listioning to http://localhost:2020 server");
    
})
