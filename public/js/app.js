const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')
const weatherIcon = document.querySelector('#weatherIcon')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value
    
    weatherIcon.src = ''
    weatherIcon.alt = ''
    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''
    search.value = ''
    
    fetch(`/weather?city=${location}`).then((response) => {
        response.json().then(data => {
            if (data.error) {
                weatherIcon.src = ''
                weatherIcon.alt = ''
                messageOne.textContent = ''
                messageTwo.textContent = data.error
            
            } else {
                messageTwo.textContent = `${data.forecast.description} ${data.forecast.currentTemp}`
                weatherIcon.src = data.forecast.icon
                weatherIcon.alt = data.forecast.description
                messageOne.textContent = data.location
            }
        })
    })
})