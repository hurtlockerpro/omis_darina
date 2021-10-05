
let myModal = document.querySelector('#myModal')
let myModalTitle = myModal.querySelector('#myModalLabel')
let myModalBody = myModal.getElementsByClassName('modal-body')[0]

let cardTitle = 'book'
let cardText = 'book description'
let btnEditTitle = 'Edit'
let btnDeleteTitle = 'Delete'

let whatBtnClicked = '' // edit , new

function getFormHTML(){

    fetch('../frontend/form.html')
    .then(response => response.text())
    .then(data => {
        myModalBody.innerHTML =  data
    })
}

myModal.addEventListener('show.bs.modal', function () {

    let btnSaveChanges = document.getElementById('btnSaveChanges')
    if (whatBtnClicked == 'new')
    {
        btnSaveChanges.innerHTML = 'Add new Book'
    } 
    else if (whatBtnClicked == 'edit')
    {
        btnSaveChanges.innerHTML = 'Edit Book'
    }

    myModalTitle.innerText = 'Hello modal!'
    getFormHTML()
    console.log('show')
})

myModal.addEventListener('shown.bs.modal', function () {
    console.log('shown')

    if (whatBtnClicked == 'new')
    {
    } 
    else if (whatBtnClicked == 'edit')
    {
        document.getElementById('bookIsbn').setAttribute('disabled', 'disabled')
    }
    
})

myModal.addEventListener('hide.bs.modal', function () {
    console.log('hide')
    getData()
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
        addEventListenerToEdit()

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

                if (data.status == 200){
                    getData()
                }
                console.log(data.message)
            })
        })
    })
}

function addEventListenerToEdit(){

    Array.from(document.getElementsByClassName('btn-primary'))
    .forEach(btn => {
        btn.addEventListener('click', event => {
            whatBtnClicked = 'edit'

            // new bootstrap.Modal(myModal).show()

        })
    })
}


document.getElementById('btnAddNew').addEventListener('click', event  => {
    
    whatBtnClicked = 'new'

    getFormHTML()   
    let myModal2 = new bootstrap.Modal(myModal)
    myModal2.show()
})


document.getElementById('btnSaveChanges').addEventListener('click', event  => {
    console.log('btnSaveChanges')

    let frm = document.getElementById('frmBook')
    let formData = new FormData(frm);

    console.log(Array.from(formData))
    let myData = []
    Array.from(formData).forEach(item => {
        myData[item[0]] = item[1];
    })
    let data = Object.assign({}, myData)
    console.log(data)


    fetch('http://localhost:3000/books/new', {
        method: 'POST',
        body: 'formData=' + JSON.stringify(data),
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        
    })

    var modal = bootstrap.Modal.getOrCreateInstance(myModal)
    modal.hide()
})
