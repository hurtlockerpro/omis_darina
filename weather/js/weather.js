// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// METHOD -> GET
// 1. http
// 2. url
// 3. ?
// 4. x=v1&y=v2&z=v3 ...

// e94a06c22c14c9ab3059f89372eb2541

class Weather {
     
    settings = {
        url: 'https://api.openweathermap.org/data/2.5/weather',
        q:'Tallinn',
        appid: 'e94a06c22c14c9ab3059f89372eb2541',
        units: Weather.units.imperial
    }

    static units = {
        standard: 'standard',
        metric: 'metric',
        imperial: 'imperial'
    }

    constructor(settings = {empty:true}){

        if (typeof settings == 'object' && settings.empty == false)
        {
            if(settings.hasOwnProperty('url') == true) this.settings.url = settings.url
            if(settings.hasOwnProperty('q')) this.settings.q = settings.q
            if(settings.hasOwnProperty('appid')) this.settings.appid = settings.appid
        }

        this.checkDayPart()

        this.getData()

        console.log('---end of class ---')
    }

    generateApiUrl(){

        //console.log(Object.entries(this.settings))
        let urlItems = []
        Object.entries(this.settings).forEach(item => {
            if (item[0] != 'url') urlItems.push(item[0] + '=' + item[1])
        })

        return this.settings.url + '?' + urlItems.join('&')
    }

    getData(){

        fetch(this.generateApiUrl())
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let temp = this.DivTemp
            temp.innerHTML = data.main.temp

            let city = this.DivCity
            city.innerHTML = data.name

            let description = this.getDivDescription()
            description.innerHTML = data.weather[0].description
        })
    }

    checkDayPart(){
        let date = new Date()

        let hour = date.getHours()
        if ((hour >= 0 && hour < 6) || (hour >= 18 && hour <= 23))
        {
            document.body.classList.remove('day')
            document.body.classList.add('night')
        } else if (hour >= 6 && hour < 18){
            document.body.classList.remove('night')
            document.body.classList.add('day')
        }
         
    }

    get DivTemp(){
        return document.getElementById('temp')
    }
    get DivCity(){
        return document.getElementById('city')
    }
    getDivIcon(){
        return document.getElementById('icon')
    }
    getDivDescription(){
        return document.getElementById('description')
    }
}

let settings = {
    units: Weather.units.imperial
}
let w = new Weather(settings)
console.log(w.generateApiUrl())
w.getData()



/* jQuery */ 

// document.querySelector()
console.log($('#weather').html())
console.log($('input[type="checkbox"]').val())

let state = 'on'

$('input[type="checkbox"]').on('change', (event) => {
    //console.log(event)
    
    /*
    if (state == 'off') {
        $('#temp').fadeIn(2000, () => {
            console.log('off: effect is ended')
        })
        state = 'on'
    } else {
        $('#temp').fadeOut(2000, () => {
            console.log('on: effect is ended')
        })
        state = 'off'
    }
    */
    if (state == 'off') {
        w.settings.units = Weather.units.imperial
        w.getData()

        state = 'on'
    } else {
        w.settings.units = Weather.units.metric
        w.getData()

        state = 'off'
    }

})