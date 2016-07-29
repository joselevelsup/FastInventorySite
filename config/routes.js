var mysql = require("mysql");
var db = mysql.createPool({
  host     : 'us-cdbr-iron-east-04.cleardb.net',
  user     : 'b5d127ddf8a0e1',
  password : 'fef737ec',
  database : 'heroku_e330f5bdc6c95f4'
});

module.exports = function(app, passport){

  function sessionCheck(request, respond, next){
    if(request.user == "error"){
      respond.redirect("/retry");
    } else {
      next();
    }
  };

  app.get("/", sessionCheck, function(request, respond){
    respond.render("index.ejs",{
      title: "Home"
    });
  });

  app.get("/inventory", sessionCheck, function(request, respond){
    db.query("select * from inventory", function(err, rows, fields){
      if(err){
        console.log(err);
      }else{
        respond.render("inventory.ejs",{
          title: "Inventory",
          inventory: rows
        });
      }
    });
  });

  app.get("/login", function(request, respond){
    respond.render("login.ejs",{
      title: "Login"
    });
  });

  app.get("/retry", function(request, respond){
    respond.render("retry.ejs", {
      title: "Retry Login"
    });
  });

  app.get("/additem", function(request, respond){
    respond.render("additem.ejs", {
      title: "Add Item",
    })
  });


  app.post('/login', passport.authenticate('local-login', {
    successRedirect: "/inventory",
    failureRedirect: "/retry"}),
    function(request, respond){
  });

  app.post("/filter", function(request, respond, next){
    var itemData = request.body.itemtype;
    var buildData = request.body.buidling;
    var roomData = request.body.room;
    app.set('item', itemData);
    app.set('build', buildData);
    app.set('room', roomData);
    respond.send({redirect: '/result'});
    next();
  });

  app.get('/result', sessionCheck, function(request, respond){
    var itemdata = app.get("item");
    var builddata = app.get("build");
    var roomdata = app.get("room");
    db.query("select * from inventory where ItemType='"+itemdata+"' and RoomNumber='"+roomdata+"'", function(err, rows, fields){
      if(err){
        console.log(err);
      } else{
        respond.render("filter.ejs", {
          title: "Results",
          inventory: rows
        });
      }
    });
  });

  app.post("/newitem", function(request, respond, next){
    var itemName = request.body.itemname;
    var itemData = request.body.itemtype;
    var roomData = request.body.room;
    var osVersion = request.body.os;

    db.query("insert into inventory(itemType, OSVersion, itemName, RoomNumber, Quantity, StockDate) values('"+itemData+"', '"+osVersion+"', '"+itemName+"', (select RoomNumber from building where RoomNumber = '"+roomData+"'), 0, curdate())", function(err, result){
      if(err){
        console.log(err);
      }
      else{
        respond.send({redirect: '/inventory'});
      }
    })
  });

  app.post('/api/ionpost', function(request, respond){
    var quantity = request.body.quantity;
    var itemName = request.body.itemModel;
    var roomNumber = request.body.roomNumber;

    db.query("update inventory set Quantity = "+quantity+", StockDate = curdate() where itemName = '"+itemName+"' and RoomNumber = '"+roomNumber+"'", function(err, result){
      if(err){
        console.log(err);
      }
      else{
      db.query("select Quantity, itemName, RoomNumber from inventory where itemName = '"+itemName+"'", function(err, rows){
        if(err){
          console.log(err);
        }
        else{
          respond.send(rows);
        }
      });
      }
    });
  });

  app.post('/api/ionlogin', function(request, respond){
    var username = request.body.email;
    var password = request.body.password;
    db.query("select * from useraccount where username = '"+username+"' and passwd = '"+password+"'", function(err, rows, fields){
      if(err){
        console.log(err);
      }
      else{
        if(rows.length < 1){
          respond.send("fail");
        }
        else{
          respond.send("pass");
        }
      }
    });
  })

}
