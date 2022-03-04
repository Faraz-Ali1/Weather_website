const request = require('request')


// weather check call back api
const weatherCheck = (longitude, latitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=893b4e37d1d063418c28919acc96325c&query='+encodeURIComponent( longitude)+','+encodeURIComponent( latitude)+'&units=m'
    request({  url, json: true},(error, {body }) =>{
        if (error){
            callback('Unable to connect with weather services. Please check you internet connection!', undefined)
        }
        else if (body.error){
            callback('Unable to find location. Search for another one' , undefined)
        }
        else{
            callback(undefined, {
                Weather: body.current.weather_descriptions[0] +
                ' It is currently '+ body.current.temperature +
                ' degrees. But feels like ' + body.current.feelslike + ' degrees'})
        }
            
    } )
}

module.exports = weatherCheck