const Promise            = require('bluebird');
const colors             = require('colors');
const figlet             = Promise.promisify(require('figlet'));
const morgan             = require('morgan');
const express            = require("express");
const passport           = require('passport');
const authHelpers        = require('./auth/_helpers')
const authRoutes         = require('./auth/routes')
const db                 = require('../../models');//Bootstraps the entire database.
const bodyParser         = require('body-parser');
const app                = express();
const path               = require('path');
const serveStatic        = express.static;
const PORT               = 8080;
const middlwareError     = 'Unable to find route.';
const IS_PRODUCTION      = false;
const introAscii         = '   POWr';
const introAscii2        = 'Comments';
const asciiFont          = 'Isometric2';
const models = require('../../models/index')

figlet(introAscii,{font:asciiFont})
.then(introMessage => {
  console.log(introMessage.green);
  return figlet(introAscii2,{font:asciiFont})
})
.then(introMessage => {
  console.log(introMessage.green);
})
.then(nothing =>{
  db.sequelize
    .sync()
    .then(()=>{

      if (!IS_PRODUCTION) require('./bundler.js')(app); //Webpack

      app.set('models',db.sequelize.models);

      app.use(bodyParser.json({
        extended:true //see:https://www.npmjs.com/package/body-parser
      }));

      app.post('/register', (req, res, next)  => {
        return authHelpers.createUser(req, res)
        .then((response) => {
            handleResponse(res, 201, 'success', response);
          })
        .catch((err) => { console.log(err); handleResponse(res, 500, 'error'); });
      });

      app.post('/login', (req, res, next) => {
        models.User.find({ where: { email: req.body.Email } })
        .then((user) => {
          if (!user) handleResponse(res, 404, 'User not found');
          if (!authHelpers.comparePass(req.body.Password, user.password)) {
            handleResponse(res, 404, 'Wrong credentials');
          } else {
            return handleResponse(res, 200, 'success', user);
          }
        })
        .catch((err) => { handleResponse(res, 500, err.message) });
      });

      app.get('/logout', (req, res, next) => {
        req.logout();
        handleResponse(res, 200, 'success');
      });

      app.post('/api/posts', (req, res, next) => {
        console.log(req.body)
        models.Post.create({
          user_id: req.body.user_id,
          user_name: req.body.user_name,
          body: req.body.body
        }).then((post) => {
            return handleResponse(res, 201, 'success', post);
        })
        .catch((err) => { handleResponse(res, 500, err.message) });
      });

      function handleResponse(res, code, statusMsg) {
        res.status(code).json({message: statusMsg});
      }

      app.get('/api/posts', (req, res, next) => {
        models.Post.all()
        .then((posts) => {
            return handleResponse(res, 200, 'success', posts);
        })
        .catch((err) => { handleResponse(res, 500, err.message) });
      });

      app.use(function(req, res) {
        res.sendFile(path.join(__dirname,"../../dist/index.html"));
      });

      app.use(serveStatic(path.join(__dirname,"../../dist")));

      function handleResponse(res, code, statusMsg, data) {
        res.status(code).json({message: statusMsg, data: data});
      }

      app.listen(PORT, function () {
        console.log('Server running on port ' + PORT);
      });
    }
  );
})
