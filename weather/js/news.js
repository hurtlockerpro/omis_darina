
class News extends Url {

    constructor(settings){
        super()
        this.parseSettings(settings)
    }
}

// https://newsapi.org/v2/everything?q=tesla &from=2021-08-21&sortBy=publishedAt & 
// apiKey=4a5de1e54b304bf2909af12bf979c242

let settings = {
    url: 'https://newsapi.org/v2/everything',
    q:'tesla',
    apiKey: '4a5de1e54b304bf2909af12bf979c242',
    from: '2021-08-21'
}
let news = new News(settings)
console.log(news.generateApiUrl())