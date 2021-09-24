const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup static deirectory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Terra Roush"
    })
})
app.get('/about', (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Terra Roush"
    })
})
app.get('/help', (req, res) => {
    res.render("help", {
        title: "Help",
        helpText: "This is helpful text!",
        name: "Terra Roush"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.city) {
        return res.send({
            error: 'You must provide a city to get the weather'
        })
    }
    geocode(req.query.city, (error, { lat, long, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                city: req.query.city.toUpperCase()
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Help article not found.",
        name: "Terra Roush"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Page not found.",
        name: "Terra Roush"
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})

