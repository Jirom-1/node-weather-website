const request = require('request')

const forecast = (longitude, latitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=82947c4b79c36cabb55c7fa43ddf1268&query=' + latitude + ',' + longitude

    request({url, json: true}, (error, res) => {
        if(error){
            callback('Unable to connect to weather service', undefined)
        }
        else if (res.body.error){
            callback('Unable to find location', undefined)
        }
        else{
            callback(undefined,res.body.current.weather_descriptions[0]+". It is currently "+ res.body.current.temperature + " degrees outside. It feels like " + res.body.current.feelslike)
        }
    })

}


module.exports = forecast