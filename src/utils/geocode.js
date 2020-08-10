const request = require("request")

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoiamlyb20iLCJhIjoiY2tkaDAwMDZ4MmFpeDJ0dDk0MmcxZTRzdyJ9.Iyq2KAbn4H_KARRFH5knpg&limit=1'


    request ({url, json: true}, (error, res) => {
        if(error){
            console.log(error+" geocode")
            return callback('Unable to connect to location services', undefined)
        }
        else if (res.body.features.length === 0){
            return callback('Unable to find location, try another search', undefined)
        }
        else{
            const latitude = res.body.features[0].center[1]
            const longitude = res.body.features[0].center[0]
            const location = res.body.features[0].place_name
            callback(undefined, {latitude, longitude, location})
        }
    })
}

module.exports = geocode