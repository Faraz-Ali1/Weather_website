const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geoCoding')
const weatherCheck =require('./utils/weather')




// console.log(__dirname)
// console.log(path.join(__dirname, '../public/help.html'))

const app = express()
//Paths
const pathOfPublicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialPath = path.join(__dirname, '../template/partials')

// setup handle bars locations and views
app.set('view engine','hbs')
app.set('views',  viewsPath)
hbs.registerPartials(partialPath)

// set up static web page
app.use(express.static(pathOfPublicDirectory))

//routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'mulu'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About ME'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        help: 'Hey there i am ypu helper'
    })
})

app.get('/weather' ,(req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })

    }

    geoCode(req.query.address , (error, data) => {
        if(error){
            return res.send({error: error})
        }

        weatherCheck(data.longitude, data.latitude, (error, weatherData)=>{
            if(error){
                return res.send({error: error})
            }
                
            res.send(Weather= {
                
                location: data.location ,
                forcast: weatherData.Weather,
                address: req.query.address
            })

        })

    })
            
    
})



app.get('*', (req, res) => {
    res.render('404')

})

app.listen(3000, () => {
    console.log('server is up')
})

