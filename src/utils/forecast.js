const request = require("postman-request")

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=f2edd5254dec3786b413366cb5cd31fc&query=${lat},${long}&units=f`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (body.error) {
            callback("Unable to provide weather info. Check that you've provided the correct location.")
        } else {
            const icon = body.current.weather_icons[0]
            const currentWeather = body.current
            callback(undefined, {
                description: `${currentWeather.weather_descriptions[0]}.`, currentTemp: `It is currently ${currentWeather.temperature} degrees out. It feels like ${currentWeather.feelslike} degrees out.`,
                icon
            })
        }
    })
}

module.exports = forecast