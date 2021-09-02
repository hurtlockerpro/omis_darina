
let rows = 10
let cols = 15

function multiply(x, y){
    return x * y
}
/*
{
    class:[],
    style:{
        border: 1,
        ...
    }
}
*/
function generateTable(value, options){
    
    let opt = ''
    if (typeof options == 'object'){
        if (Object.keys(options).includes('class') == true){
            if (typeof options.class == 'object'){
                opt += `class="${options.class.join(' ')}"` 
            }
        }
    }
    return `<table ${opt}>${value}</table>`
}
function generateTr(value){
    return `<tr>${value}</tr>`
}
function generateTd(value){
    return `<td>${value}</td>` //return '<td>' + value + '</td>'
}

function generateTh(value, options){
    let opt = ''
    if (typeof options == 'object'){
        if (Object.keys(options).includes('scope') == true){
            if (typeof options.scope == 'object'){
                opt += `scope="${options.scope.join(' ')}"` 
            }
        }
    }
    return `<th ${opt}>${value}</th>`
}

let td = ''
let tr = ''
for (let rowIndex = 1; rowIndex <= rows; rowIndex++) 
{
    td = ''
    for (let colIndex = 1; colIndex <= cols; colIndex++) 
    {
        //console.log('rowIndex: ', multiply(rowIndex, colIndex))
        switch (rowIndex) {
            case 1:
                td += generateTh(multiply(rowIndex, colIndex), {scope:['col']})
                break;
            default:
                if (colIndex == 1)
                {
                    td += generateTh(multiply(rowIndex, colIndex), {scope:['row']})
                } else {
                    td += generateTd(multiply(rowIndex, colIndex))
                }
                break;
        }
    }
    tr += generateTr(td)
    //console.log(tr)
}

document.getElementById('result').innerHTML = generateTable(tr, 
    {class:['table', 'table-striped', 'table-hover']})
//console.log(generateTable(tr))