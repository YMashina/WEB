var exportflag = 0;
//const fs = require('fs');
//import {Book}('../models/book');

  //document.getElementById ("filterbutton").addEventListener ("click", function(){
  //console.log('hey');
  //}, false);

  function func(books){//console.log(localStorage.getItem('array'));
  console.log('here:',books[0])}
  function cut(str, cutStart, cutEnd){
    return str.substr(0,cutStart) + str.substr(cutEnd+1);
  }
//console.log(localStorage.getItem('array'));

function load(array){
  var output="";
  var obj_array = [];
  for (var i = 0; i< array.length; i++){
    //output = '{'+array[i]+'}'
//    console.log(`at array[${i}]`);
  //  console.log(array[i]);
try{obj_array.push(JSON.parse(array[i]));}
catch(e){
  exportflag = 1;
  array[i] = array[i].replace(/[^a-zA-Z0-9-_ "',.!?/{}:]/g, '');
  var subarray = array[i].substr( 7, 24);
  array[i] = cut(array[i], 7, 30);
//var subarray='';
  //for(var r = 1;r<31;r++){


  //}
  subarray = "'"+subarray+"'";
  //subarray = subarray.replace(/_id: ([a-zA-Z0-9-_!?{}])/g,'id: "$1"');
//console.log("'"+subarray+"'");
  var position = 7;
  var output = [array[i].slice(0, position), subarray, array[i].slice(position)].join('');
//console.log("output: "+output);
  array[i]=output;
  array[i] = array[i].replace('__v: 0, ', '');


  array[i] = array[i].replace(/([a-zA-Z0-9_]+?):/g, '"$1":');
  array[i] = array[i].replace(/'/g, '"');

}
if (exportflag == 1)
    obj_array.push(JSON.parse(array[i]));
  }
  /*const fs = require('fs');
  fs.writeFileSync("books-final.json", array.toString(), function(err) {

        if(err) {
            return console.log(err);
        }

        //console.log("The file was saved!");
    });*/
//console.log('modified: '+array);


  //  console.log(`${obj_array[i]} pushed`);

  //console.log('entire array: '+array);
  //console.log(`stringify ${array[0]}: `+JSON.stringify(array[0]));

//console.log(`${obj_array} pushed`);
  //console.log('-----'+obj_array[0].title+'------');
  //window.onload = function(){
  /*  let store = document.getElementById("store");
    let store1 = store.outerHTML;
    //var store2 = store1.replace(`<div id="store">`,'');
var store2 = cut(store1,0, 34)
      store2 = store2.replace('</p>','');
      //store2 = store2.replace('_id:','');
      var json = store2;
//console.log(json);
var newJson = json.replace(/([a-zA-Z0-9_]+?):/g, '"$1":');
var newJson2 = newJson.replace(/: ([a-zA-Z0-9_]+?),/g, ': "$1",');
var newJson2 = newJson2.replace(/"duedate": ([a-zA-Z0-9_]+?) }/g, '"duedate": "$1" }');
newJson = newJson2.replace(/'/g, '"');
console.log(newJson);
var realjson = '{'+newJson+'}';
var data = JSON.parse(realjson);
*/



//  }

  let id = document.getElementById("filterbutton").id;
  //let id = document.getElementById("selection");

  //let thediv = document.getElementById("responsetest");
//thediv.innerHTML = 'tested';
//console.log();

filtering(obj_array);
  callAjaxGet(id,(response)=>{
    try{
      //alert('1')
      //thediv.innerHTML = 'tested';
      //alert();
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

function compare1(a,b){
    if (a.available == true && b.available == false){
      return -1;
    }
    if (a.available == false && b.available == true){
      return 1;
    }
    if (a.available == b.available){
      return 0;
    }
}

function compare2(a,b){
    if (a.available == true && b.available == false){
      return 1;
    }
    if (a.available == false && b.available == true){
      return -1;
    }
    if (a.available == b.available){
      return 0;
    }
}

function compare4(a,b){
  if(a.duedate == null && b.duedate != null){
    return -1;
  }
  else if(a.duedate != null && b.duedate == null){
    return 1;
  }
  else if(a.duedate == null && b.duedate == null){
    return 0;
  }
    var a_dates = a.duedate.split('/')
    console.log(a.duedate,a_dates);
    a_day = parseInt(a_dates[0]);
    a_month = parseInt(a_dates[1]);
    a_year = parseInt(a_dates[2]);
    var b_dates = b.duedate.split('/')
    b_day = parseInt(b_dates[0]);
    b_month = parseInt(b_dates[1]);
    b_year = parseInt(b_dates[2]);

    console.log(a_year,a_month,a_day);
    if(a_year==b_year){
      if(a_month==b_month){
        if(a_day<b_day){
          return -1;
        }
        if(a_day>b_day){
          return 1;
        }
        return 0;
      }
      if(a_month<b_month){
        return -1;
      }
      if(a_month>b_month){
        return 1;
      }
    }
    if(a_year<b_year){
      return -1;
    }
    return 1;
}

function compare3(a,b){
  if(a.duedate == null && b.duedate != null){
    return 1;
  }
  else if(a.duedate != null && b.duedate == null){
    return -1;
  }
  else if(a.duedate == null && b.duedate == null){
    return 0;
  }
    var a_dates = a.duedate.split('/')
    console.log(a.duedate,a_dates);
    a_day = parseInt(a_dates[0]);
    a_month = parseInt(a_dates[1]);
    a_year = parseInt(a_dates[2]);
    var b_dates = b.duedate.split('/')
    b_day = parseInt(b_dates[0]);
    b_month = parseInt(b_dates[1]);
    b_year = parseInt(b_dates[2]);

    console.log(a_year,a_month,a_day);
    if(a_year==b_year){
      if(a_month==b_month){
        if(a_day<b_day){
          return 1;
        }
        if(a_day>b_day){
          return -1;
        }
        return 0;
      }
      if(a_month<b_month){
        return 1;
      }
      if(a_month>b_month){
        return -1;
      }
    }
    if(a_year<b_year){
      return 1;
    }
    return -1;
}


function filtering(books){

  var e = document.getElementById("selection");
var option = e.options[e.selectedIndex].value;

  //import {books as books1}
    //from '../app.js';
    /*Book.find({}, function(err, docs) {
        if (!err){
            console.log(docs);
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
    });*/

  //var books_new;
  if(option == 1){
  books_new = books.sort(compare1);}
  if(option == 2){
    books_new = books.sort(compare2);}
  if(option == 3){
      books_new = books.sort(compare3);}
  if(option == 4){
        books_new = books.sort(compare4);}
  var list  = document.getElementById("filterlist");

  var eexport = "";
  list.innerHTML = eexport;
  //list.removeChild(list.firstChild);
  //while (list.firstChild) list.removeChild(list.firstChild);
  var i = 0;
  for (var book of books_new) {
    //console.log(i++);
      eexport+=`<li class="list-group-item"><a href="/books/`+`${book._id}"> ${book.title} by ${book.author}</a></li>`
  }
  list.innerHTML = eexport;
  exportflag = 0;
}


//var xhttp=new XMLHttpRequest();
//xmlhttp.onreadystatechange=handleStateChange;

function callAjaxGet(id, callback){
  var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
  //alert('here')
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            //console.log(xhr.responseText);
            filter();
        }
        else {
          //console.log(`readyState:${this.readyState} status:${this.status}`);
          //alert(`readyState:${this.readyState} status:${this.status}`);
        }
    };
    xhr.open("GET", `/s`, true);
xhr.send();

}



//require('/bower_components/jquery/dist/jquery.js);
//alert("defaultsort");
/*var servResponse = document.querySelector('#responsetest');
document.forms.filterform.onsubmit = function(e){
  e.preventDefault();

  var userinput = 'test';
  userinput = encodeURIComponent(userinput);

  var xhr = new XMLHttpRequest();

  xhr.open('POST','piece.pug');

  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && xhr.status === 200){
      console.log('trying to sort mongo db');
      var MongoClient = require('mongodb').MongoClient;
      var url = "mongodb://localhost/booksdb";
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("booksdb");
        var mysort = { available: 1 };
        dbo.collection("books").find().sort(mysort).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
        });
      });

      servResponse.textContent = xhr.responseText;
    }
  }
  xhr.send('filterform'+userinput);
}
*/

/* ////////////////////////////////////////////////////////////////
function load(button){
  let id = button.id;
  let thediv = document.getElementById("responsetest");
thediv.innerHTML = 'tested';
filtering();
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
  var books_new = books;
  books_new = books_new.sort(compare);
  var list  = document.getElementById("filterlist");
  var eexport = "";
  for (var book of books_new) {
      eexport+=`<li><a href="/books/"+${book._id}>${book.title} by ${book.author}</a></li>`
  }
  list.innerHTML = eexport;

}

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

}*/ //////////////////////////////////////////////////////////

/*var handleResponse = function (status, response) {
   alert(response)
}

var handleStateChange = function () {
   switch (xhttp.readyState) {
      case 0 : console.log('0');// UNINITIALIZED
      case 1 : console.log('1');// LOADING
      case 2 : console.log('2');// LOADED
      case 3 : console.log('3');// INTERACTIVE
      break;
      case 4 :
      //console.log('4');
      //xhttp.open("GET", `/s`, true);
      //alert('opened');
      //xhttp.send();
      //alert('sent');// COMPLETED
      //handleResponse(xhttp.status, xhttp.responseText);
      break;
      default: alert("error");
   }
}*/
//var xhttp=new XMLHttpRequest();
//xmlhttp.onreadystatechange=handleStateChange;

function filter(){}

/*$(document).ready(function(){
  $('.filter').on('click', function(e){
    console.log('check');
    $target = $(e.target);
    $.ajax({
      type:'POST',
      url: '/',
      success: function(response){
        alert('Sort');
        window.location.href='/';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});
*/

/*function ssssort(){
  alert("sort")
  $.ajax({
    url: '/',
    contentType: 'application/javascript',
    dataType: 'javascript',
    type: 'POST'
    success:((res)=>{
      var MongoClient = require('mongodb').MongoClient;
      var url = "mongodb://localhost/booksdb";
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("booksdb");
        var mysort = { available: 1 };
        dbo.collection("books").find().sort(mysort).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
        });
      });
      $( "#list" ).load( "../views/index.pug", function() {
  alert( "Load was performed." );
});
    });
    error: ((error)=>{
      alert('Error:', err)
      console.log(error);
    })
  });

}
function sort_unavailability(){
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost/booksdb";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("booksdb");
    var mysort = { available: -1 };
    dbo.collection("books").find().sort(mysort).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });
}
*/
