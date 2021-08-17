const request=require('request')

const forecast=(longitude,latitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=7b0baf37188a8abe30c69fb64952d134&query='+latitude+','+longitude+'&units=f'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        }else if(body.error){
          callback('some information not included in url',undefined)
        }
        else{
            callback(undefined,` ${body.current.weather_descriptions[0]}.It is ${body.current.temperature} and feels like ${body.current.feelslike}`)
            // callback(undefined,{
            //     Description:body.current.weather_descriptions[0],
            //     Temperature:body.current.temperature,
            //     feelslike:body.current.feelslike
            // })
        }
    })
}

//37.8267,-122.4233
module.exports=forecast