const request = require('request')

const forecast = (lat,long,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=cdc8c89b94a832b4a88aa11066932783&query='+encodeURIComponent(lat)+',' + encodeURIComponent(long)
    
    request( { url:url , json:true},(err,res)=>{
        if(err){
            callback('Unable to connect to weather service!',undefined)
        }else if(res.body.error){
            callback('unable to find location!',undefined)
        }else{
            callback(undefined,res.body.current.temperature)
        }
    })
}

module.exports=forecast