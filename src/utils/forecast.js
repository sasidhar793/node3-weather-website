const request = require('request')


const forecast = (latitude,langitude,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=f1a6e7b1f01c4253308d3f8cd79ea080&query="+latitude+","+langitude+"&units=f"
    request({url,json:true},(error,{body})=>{
       if(error){
       callback("Unable to connect with weather service!")
       }else if(body.error){
        callback("Unable to find Latitude, Langitude")
       }else{
           callback(undefined,body.current.weather_descriptions[0] + ". It is currently "+body.current.temperature+" degress out. It feels like "+body.current.feelslike+" degrees out")
           
       }
    })
}

module.exports = forecast