const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');
const config = require('../config/database');

// Book Model for mongoose
let Book = require('../models/book');
// User Model
let User = require('../models/user');

// Add Route
router.get('/add', ensureAuthenticated, function(req, res){
  res.render('add_book', {
    title:'Add A Book'
  });
});

// Add Submit POST Route
router.post('/add', function(req, res){
  req.checkBody('title','Title is required').notEmpty();
  //req.checkBody('author','Author is required').notEmpty();
  req.checkBody('author','Author is required').notEmpty();
  req.checkBody('description','Description is required').notEmpty();

  // Get Errors
  let errors = req.validationErrors();

  if(errors){
    res.render('add_book', {
      title:'Add A Book',
      errors:errors
    });
  } else {
    let book = new Book();
    book.title = req.body.title;
    book.author = req.body.author;
    //var o_id = new mongo.ObjectID(req.user._);
    book.submitter = req.user.username;
    book.description = req.body.description;
    //console.log(req.body.availability);
    if (req.body.availability=='on')
      book.available = req.body.availability;
    else{
      book.available = false;
    }

    book.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success','Book Added');
        res.redirect('/');
      }
    });
  }
});

// Load Edit Form
router.get('/edit/:id', ensureAuthenticated, function(req, res){
  Book.findById(req.params.id, function(err, book){
    if(book.submitter != req.user._id && (req.user._id != '5d8925e591f2a1400cef6b6d')){
      req.flash('danger', 'Not Authorized');
      res.redirect('/');
    }
    res.render('edit_book', {
      title:'Edit Book',
      book:book
    });
  });
});

// Update Submit POST Route
router.post('/edit/:id', function(req, res){
  let book = {};
  book.title = req.body.title;
  book.author = req.body.author;
  book.description = req.body.description;
  //console.log(req.body.availability_edit.toString())
  if (req.body.availability_edit=='on')
    book.available = true;
  else{
    book.available = false;
  }

  let query = {_id:req.params.id}

  Book.update(query, book, function(err){
    if(err){
      console.log(err);
      return;
    } else {
      req.flash('success', 'Book Updated');
      //console.log(req.params.id);
      res.redirect(`/books/${req.params.id}`);
    }
  });
});

// Borrow a book
router.post('/borrow', function(req, res){
//console.log("________________________________________________________________");

var string=req.headers.referer;
string = string.substr(28,51);
//console.log(string);
Book.findById(string, function(err, book){
  if(err){
    console.log(err);
    throw err;
  }
  //console.log(book);
  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}



var date = new Date();
console.log( date);
date.setDate(date.getDate() + parseInt(req.body.days,10));

console.log( date);
var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var y = date.getFullYear();

    var someFormattedDate = dd + '/' + mm + '/' + y;

book.available = false;
book.borrower = req.user.username;
book.duedate = someFormattedDate;
//console.log('here:'+book+'end of book');
  let query = {_id:string}

  Book.update(query, book, function(err){
    if(err){
      console.log(err);
      return;
    } else {
      req.flash('success', 'Book borrowed');
      res.redirect(`/books/${string}`);
    }
  });
});
});
var toprint;

const fs = require('fs');




// Return a book
router.post('/return', function(req, res){
//console.log("________________________________________________________________");

var string=req.headers.referer;
string = string.substr(28,51);
//console.log(string);
Book.findById(string, function(err, book){
  if(err){
    console.log(err);
    throw err;
  }
  //console.log(book);
book.available = true;
book.borrower = null;
book.duedate = null;
//console.log('here:'+book+'end of book');
  let query = {_id:string}

  Book.update(query, book, function(err){
    if(err){
      console.log(err);
      return;
    } else {
      req.flash('success', 'Book returned');
      res.redirect(`/books/${string}`);
    }
  });
});
});

router.get('/sort', function(req, res){
  //alert();
  $( "#list" ).load( "../views/index.pug", function() {
alert( "Load was performed." );
});
  console.log(req,res)
  //res.render('index');
});


// Delete Book
router.delete('/:id', function(req, res){
  if( !req.user._id){
    res.status(500).send();
  }

  let query = {_id:req.params.id}

  Book.findById(req.params.id, function(err, book){
    if(book.submitter != req.user.username && req.user.username!='admin'){
      res.status(500).send();
    } else {
      Book.remove(query, function(err){
        if(err){
          console.log(err);
        }
        res.send('Success');
      });
    }
  });
});

// Get Single Book
router.get('/:id', function(req, res){
  Book.findById(req.params.id, function(err, book){
    //console.log(req.params.id);
    //User.findById(book.author, function(err, user){
      res.render('book', {
        book:book,
        //submitter: user.name
      });
    //});
  });
});

// Access Control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/users/login');
  }
}

module.exports = router;


function load( ){
  let id = document.getElementById("filterbutton").id;
  let thediv = document.getElementById("responsetest");
  let thediv = document.getElementById("books");
thediv.innerHTML = 'tested';
//filtering();
  callAjaxGet(thediv.id,(response)=>{
    try{
      alert('1')
      thediv.innerHTML = 'tested';
      alert();
      //$( "#responsetest" ).load( "../views/index.pug", function() {
      //  alert( "Load was performed." );
      //});
    }
    catch (e){
      thediv.innerHTML = 'error';
      console.log('error', e);
    }
  });
}

function compare(a,b){
    if (a.available == true && b.available == false){
      return 1;
    }
    if (a.available == false && b.available == true){
      return -1;
    }
    return 0;
}


function filtering(){
  //import {books as books1}
    //from '../app.js';
    Book.find({}, function(err, docs) {
        if (!err){
            console.log(docs);
            books_new = docs.sort(compare);
            var list  = document.getElementById("filterlist");
            var eexport = "";
            for (var book of books_new) {
                eexport+=`<li><a href="/books/"+${book._id}>${book.title} by ${book.author}</a></li>`
            }
            list.innerHTML = eexport;
            toprint = docs; var f = 0;
          if(f===0)  fs.writeFileSync("books.json", docs.toString(), function(err) {
    f = 1;
                if(err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            });
            process.exit();
        } else {throw err;}
    });
  //var books_new = localStorage.getItem("books");;


}


//var xhttp=new XMLHttpRequest();
//xmlhttp.onreadystatechange=handleStateChange;

function callAjaxGet(id, callback){
  var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
  //alert('here')
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            //console.log(xhr.responseText);
        }
        else {
          //console.log(`readyState:${this.readyState} status:${this.status}`);
          //alert(`readyState:${this.readyState} status:${this.status}`);
        }
    };
    xhr.open("GET", `/s`, true);
xhr.send();

}
