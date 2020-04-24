const request = require('request')

const geocode = (address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+ ".json?access_token=pk.eyJ1Ijoic2FzaWRoYXI3OTMiLCJhIjoiY2s5YmFmaG9iMGhiaTNzdDYwMGsweGo5diJ9.Vha0mOJc99_kNnMQfDTuOQ&limit=1";
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect with mapabox service!')
        }else if(body.features.length === 0){
            callback('Unable to locate address. Please try different one!')
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                langitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports = geocode