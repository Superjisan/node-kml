$(function(){

  //on queens click
  $("#queens").on("click", function(e){
    e.preventDefault();

    $.ajax({
      context: $("#map-canvas"),
      type: 'GET',
      data: JSON.stringify(data),

    })
  })


}
