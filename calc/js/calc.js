
class Calc {

    #container
    #input
    #buttons

    constructor(containerID){
        
        this.#container = document.getElementById(containerID)

        if (this.#container == null) console.log('Check name')

        try {
            this.#input = this.#container.querySelector('input[type="text"]')

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


