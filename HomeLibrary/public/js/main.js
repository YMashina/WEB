//alert('main');
$(document).ready(function(){
  $('.delete-book').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type:'DELETE',
      url: '/books/'+id,
      success: function(response){
        alert('Deleting A Book');
        window.location.href='/';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
  $('.filter').on('click', function(e){
    /*const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      //alert("ok");
      if (this.readyState == 4 && this.status == 200){
        //callback(this.responseText);
        console.log('response:'+this.responseText)
        //alert(this.responseText);
      }
       };
      xhttp.open("POST", "/", true);
      xhttp.send(`num=$\{id}`);
    alert('aaaaaaaaaaaaaaaaaa')
    $target = $(e.target);
    $.ajax({
      type:'POST',
      url: '/',
      success: function(response){
        alert('Sort');
        window.location.href='/';
      },
      error: function(err){
        //alert(err);
        console.log('errors:'+err);
      }
    });*/
  });
});
