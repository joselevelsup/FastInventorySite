$(document).ready(function(){
  console.log("jquery ready");
  $("#filter").click(function(){
    $.ajax({
      type: 'POST',
      data:JSON.stringify({
        itemtype: $("#itemtype option:selected").text(),
        buidling: $("input[name=building]").val(),
        room: $("input[name=room]").val()
      }),
      contentType:"application/json",
      url:"http://fastinventory.herokuapp.com/filter",
      success: function(data){
        console.log("Success");
        window.location = data.redirect;
      }
    });
  });
})
