
let loops = document.getElementById('loopsTotal')
let btn = document.querySelector('button[type="button"]')
let result = document.getElementById('result')

btn.addEventListener('click', event => {
    result.innerHTML = ''
    if (loops.value > 0) loop(0, loops.value)
})

function loop(start, end){

    if (start >= end)
    {
        console.log('loop end')
        return;
    } else {
        console.log('start: ', start)

        let div = createDiv()
        div.style.backgroundColor = 'red'
        div.style.margin = '5px'
        div.classList.add('box')
        result.innerHTML += div.outerHTML 

        loop(++start, end)
        // --index
        // index--
    }
}

function createDiv(){
    return document.createElement('div')
}

//loop(0)