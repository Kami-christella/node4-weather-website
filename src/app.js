const forecast=require('../src/utils/forecast')
const geocode=require('../src/utils/geocode')

const express=require('express')
const path=require('path')
const hbs=require('hbs')
// const { error } = require('console')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app=express()

const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

   app.use(express.static(publicDirectoryPath))

   app.get('',(req,res)=>{
       res.render('index',{
           title:'Weather App',
           name:'Kami christella'
       })
   })
   app.get('/about',(req,res)=>{
       res.render('about',{
           title:'About me',
           name:'Kami christella'
       })
   })

   app.get('/help',(req,res)=>{
    res.render('help',{
        title:'The help page',
        name:'Kami christella'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
    return res.send({
           error:'Please provide the address'
       })
    }
    geocode(req.query.address,(error,{latitude,longitude,Location}={})=>{
        if(error){
        return  res.send({error:'Unable to connect to location service'})
        }
       forecast(latitude,longitude,(error,forecastData)=>{
           if(error){
               return res.send({error})
           }
           console.log(Location)
           res.send({
               forecast:forecastData,
               location:Location,
               address:req.query.address
           })
       })
    })
  
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
   return   res.send({
          error:'please provide search'
      })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{ 
    res.render('404',{
        title:'Error',
        error:'The help article not found'
    })
})
app.get('*',(req,res)=>{
   res.render('404',{
       title:'Error',
       error:'My 404 page'
   })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})
