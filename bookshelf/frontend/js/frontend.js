
let myModal = document.querySelector('#myModal')
let myModalTitle = myModal.querySelector('#myModalLabel')
let myModalBody = myModal.getElementsByClassName('modal-body')[0]

let cardTitle = 'book'
let cardText = 'book description'
let btnEditTitle = 'Edit'
let btnDeleteTitle = 'Delete'


function getFormHTML(){

    fetch('../frontend/form.html')
    .then(response => response.text())
    .then(data => {
        myModalBody.innerHTML =  data
    })
 
}

myModal.addEventListener('show.bs.modal', function () {
  myModalTitle.innerText = 'Hello modal!'
  getFormHTML()
  console.log('show')
})

myModal.addEventListener('shown.bs.modal', function () {
    console.log('shown')
})


let getData = () => {

    fetch('http://localhost:3000/books')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let result = document.getElementById('result')
        result.innerHTML = ''

        data.forEach(item => {
            cardTitle = item.title + ' [' + item.isbn + ']'
            cardText = item.description + '<br>' 
            + item.author + '<br>' 
            + item.year
            bookIsbn = item.isbn
            result.innerHTML += generateCard()
        })

        
        addEventListenerToDelete()

    })
}

getData()


function generateCard(){
    return `<div class="card m-2" style="width: 18rem;float:left;">
    <div class="card-body">
        <h5 class="card-title">${ cardTitle }</h5>
        <p class="card-text">${ cardText }</p>
        <a href="#" class="btn btn-primary" data-isbn="${ bookIsbn }">${ btnEditTitle }</a>
        <a href="#" class="btn btn-danger" data-isbn="${ bookIsbn }">${ btnDeleteTitle }</a>
    </div>
    </div>`
}

function addEventListenerToDelete(){

    Array.from(document.getElementsByClassName('btn-danger'))
    .forEach(btn => {
        btn.addEventListener('click', event => {

            let isbn = event.target.dataset.isbn
            console.log(isbn)

            fetch('http://localhost:3000/books/delete/' + isbn , {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {

                if (data.status == 201){
                    getData()
                }
                console.log(data.message)
            })
        })
    })
}
