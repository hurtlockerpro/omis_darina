
let myModal = document.querySelector('#myModal')
let myModalTitle = myModal.querySelector('#myModalLabel')
let myModalBody = myModal.getElementsByClassName('modal-body')[0]

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
    })

}

getData()