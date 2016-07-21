var LocalStrategy = require("passport-local").Strategy;
var mysql = require('mysql');
var db = mysql.createPool({
  host     : '',
  user     : '',
  password : '',
  database : 'heroku_e330f5bdc6c95f4'
});

module.exports = function(passport){
  passport.serializeUser(function(user, done){
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
    done(null, id);
  });

  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : true
  },
  function(request, username, password, done){
    db.query("select * from useraccount where username = '"+username+"' and passwd = '"+password+"'", function(err, rows, fields){
      if(err){
        console.log(err);
      }
      else{
        if(rows.length < 1){
          console.log("Failed Auth");
          return done(null, "error");
        }
        else{
          return done(null, rows);
        }
      }
    });
  }))
}
