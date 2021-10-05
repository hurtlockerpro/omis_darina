"use strict";

var myModal = document.querySelector('#myModal');
var myModalTitle = myModal.querySelector('#myModalLabel');
var myModalBody = myModal.getElementsByClassName('modal-body')[0];
var cardTitle = 'book';
var cardText = 'book description';
var btnEditTitle = 'Edit';
var btnDeleteTitle = 'Delete';

function getFormHTML() {
  fetch('../frontend/form.html').then(function (response) {
    return response.text();
  }).then(function (data) {
    myModalBody.innerHTML = data;
  });
}

myModal.addEventListener('show.bs.modal', function () {
  myModalTitle.innerText = 'Hello modal!';
  getFormHTML();
  console.log('show');
});
myModal.addEventListener('shown.bs.modal', function () {
  console.log('shown');
});

var getData = function getData() {
  fetch('http://localhost:3000/books').then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data);
    var result = document.getElementById('result');
    result.innerHTML = '';
    data.forEach(function (item) {
      cardTitle = item.title + ' [' + item.isbn + ']';
      cardText = item.description + '<br>' + item.author + '<br>' + item.year;
      bookIsbn = item.isbn;
      result.innerHTML += generateCard();
    });
    addEventListenerToDelete();
  });
};

getData();

function generateCard() {
  return "<div class=\"card m-2\" style=\"width: 18rem;float:left;\">\n    <div class=\"card-body\">\n        <h5 class=\"card-title\">".concat(cardTitle, "</h5>\n        <p class=\"card-text\">").concat(cardText, "</p>\n        <a href=\"#\" class=\"btn btn-primary\" data-isbn=\"").concat(bookIsbn, "\">").concat(btnEditTitle, "</a>\n        <a href=\"#\" class=\"btn btn-danger\" data-isbn=\"").concat(bookIsbn, "\">").concat(btnDeleteTitle, "</a>\n    </div>\n    </div>");
}

function addEventListenerToDelete() {
  Array.from(document.getElementsByClassName('btn-danger')).forEach(function (btn) {
    btn.addEventListener('click', function (event) {
      var isbn = event.target.dataset.isbn;
      console.log(isbn);
      fetch('http://localhost:3000/books/delete/' + isbn, {
        method: 'DELETE'
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.status == 201) {
          getData();
        }

        console.log(data.message);
      });
    });
  });
}

document.getElementById('btnAddNew').addEventListener('click', function (event) {
  getFormHTML();
  var myModal2 = new bootstrap.Modal(myModal);
  myModal2.show();
});
document.getElementById('btnSaveChanges').addEventListener('click', function (event) {
  console.log('btnSaveChanges');
  var frm = document.getElementById('frmBook');
  var formData = new FormData(frm);
  console.log(Array.from(formData));
});