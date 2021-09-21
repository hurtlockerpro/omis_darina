
class Url {

    settings = {}

    parseSettings(settings){

        if (typeof settings == 'object')
        {
            let obj = new Object()
            Object.entries(settings).forEach(item => {
                obj[item[0]] = item[1]
            })
            this.settings = obj
        }
    }

    generateApiUrl(){

        //console.log(Object.entries(this.settings))
        let urlItems = []
        Object.entries(this.settings).forEach(item => {
            if (item[0] != 'url') urlItems.push(item[0] + '=' + item[1])
        })

        return this.settings.url + '?' + urlItems.join('&')
    }

}