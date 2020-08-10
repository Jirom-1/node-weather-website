const path = require('path')
const express = require('express')
const hbs = require('hbs')


const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '/templates/views')
const partialsPath = path.join(__dirname, '/templates/partials')

//Define handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index',{
        name: 'Ajiromola Kola-Olawuyi',
        title: 'Weather'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me J',
        name: 'The name G'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helpText: 'Help me the J',
        title: 'Help title',
        name: 'Dr. J'
    })
})

app.get('/weather', (req,response) => {
    if(!req.query.address){
        return response.send({
            errorMessage: 'You MUST enter an address!'
        })
    }
    geocode(req.query.address, (err,{longitude, latitude, location} = {})=>{
        if(err){
          return  response.send(err)
        }
        else{

            forecast(longitude, latitude, (err, res)=>{
                if(err){
                    return response.send(err)
                }

                else{
                    response.send({
                        forecast: res,
                        location: location,
                        address: req.query.address
                    })
                }
                
            })
        }
    })

})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must enter a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('notfound', {
        title: 'Not found',
        name: 'The J',
        message: ' Help Not Found'
    })
})

app.get('*', (req,res)=>{
    res.render('notfound', {
        title: 'Not found',
        name: 'The J',
        message: ' Generic Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is started on port 3000')
})