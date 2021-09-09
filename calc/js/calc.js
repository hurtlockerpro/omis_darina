
class Calc {

    #container
    #input
    #buttons

    allowedKeys = [8, 13, 111, 106, 107, 109, 46, 37, 38, 39, 40]

    constructor(containerID){
        
        document.getElementById('google').addEventListener('click', event => {
            event.preventDefault()
            alert('google will be open ')
        })

        this.#container = document.getElementById(containerID)

        if (this.#container == null) console.log('Check name')

        try {
            this.#input = this.#container.querySelector('input[type="text"]')
            this.attachEventToInput()

            this.#buttons = this.#container.querySelectorAll('.btn')
            this.attachEventToButtons()
        } 
        catch (info)
        {
            console.log(info.message) 
        }
    }

    attachEventToButtons(){

        if (typeof this.#buttons == 'object' && this.#buttons.length > 0)
        {
            this.#buttons.forEach(button => {

                button.addEventListener('click', event => {
                    // console.log(event.target.innerText)
                    let btnName = event.target.innerText
                    if (btnName == '=')
                    {
                        this.showResult()
                    } 
                    else if (btnName == 'CE')
                    {
                        this.zeroForumla()
                    } 
                    else 
                    {

                        if (this.clearFormula(btnName) == true)
                        {
                            this.#input.value += btnName
                        }
                        
                    }
                    
                })

            })
        }
    }

    attachEventToInput(){
        this.#input.addEventListener('keydown', event => {
            
            console.log(event.keyCode)
            if (
                (event.keyCode >= 48 && event.keyCode <= 57) 
                || 
                (event.keyCode >= 96 && event.keyCode <= 105)
            ){
                console.log(event.keyCode)
            } 
            else if (this.allowedKeys.includes(event.keyCode))
            {
                console.log(event.keyCode)
                if (event.keyCode == 13) this.showResult()

            }
            else {
                event.preventDefault() // 
            }

            /*if (event.ctrlKey == true && event.key == 'a')
            {
                console.log(event)
            }*/
        })
        /*
        this.#input.addEventListener('keyup', event => {
            console.log('keyup')
        })
        this.#input.addEventListener('keypress', event => {
            console.log('keypress')
        })*/
    }

    showResult(){
        this.#input.value = eval(this.#input.value)
    }

    zeroForumla(){
        this.#input.value = 0
    }

    clearFormula(currentSymbol){
        // doubles
        let inputText = this.#input.value.toString().trim()
        let lastSymbol = inputText.substr(inputText.length-1, 1)

        if (lastSymbol != currentSymbol && isNaN(currentSymbol) && isNaN(lastSymbol))
        {
            this.#input.value = inputText.substr(0, inputText.length-1) + currentSymbol
        } 
        else if ((lastSymbol != currentSymbol && isNaN(currentSymbol)) || !isNaN(currentSymbol))
        {
            return true
        } 

        return false
    }

}

let a = new Calc('calc')
let a1 = new Calc('calc')
let a2 = new Calc('calc2')


