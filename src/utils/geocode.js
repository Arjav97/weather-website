const request= require('request')

const geocode = (address,callback) =>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=2&access_token=pk.eyJ1IjoiYXJqYXY5NyIsImEiOiJja2E0djl3cWswYmkwM2xxdmZibGl3N2c0In0.EydGbTCFP6cKK0nkCqPIug'
    request( {url:url, json:true },(error,response)=>{
        if(error)
            callback('Unable to connect to weather services',undefined)
        else if(response.body.features.length === 0)
            callback('unable to find location',undefined)
        else 
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude: response.body.features[0].center[0]
            })
    })
}

module.exports=geocode