const request = require('request')


// With call back GeoCoding
const geoCode =  (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZmFyYXphbGkiLCJhIjoiY2t6eW1qazZwMDFxeDNrcXh6endmbGl0dSJ9.KFpQJoS99UCZQoL0Ivpibg&limit=1'
    
    request({ url, json: true}, (error, { body}= {}) => {
        if (error){
            callback('Unable to connect with Location services. PLease check Internet Connection!' , undefined )
        }
        else if(body.features.length === 0){
            callback('Unable to find Location. Search for another location' , undefined )
        }
        else{
            callback(undefined, {
               lattitude: body.features[0].center[1],
               longitude: body.features[0].center[0],
               location: body.features[0].place_name
            })
        }

    })
}

module.exports = geoCode