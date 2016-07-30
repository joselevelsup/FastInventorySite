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
  $("#addItem").click(function(){
    $.ajax({
      type: 'POST',
      data:JSON.stringify({
        itemname: $("input[name=itemName]").val(),
        itemtype: $("#itemtype option:selected").text(),
        buidling: $("input[name=building]").val(),
        room: $("input[name=room]").val(),
        os: $("input[name=os]").val()
      }),
      contentType:"application/json",
      url:"http://fastinventory.herokuapp.com/newitem",
      success: function(data){
        console.log("Added Item");
        window.location = data.redirect;
      }
    });
  });
})
