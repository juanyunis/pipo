'use strict';
// routes/chat.js

module.exports = function(app, pipo) {
  var logger = require('../../config/logger');
  var clientConfig = require('../../config/pipo')();

  /*
   * Serve up the client code
   * This shouldn't need auth as anyone should be able to pull this page
   * This should be rate limited however
   */
  app.get('/', function(req, res) {
    logger.debug("[ROUTE] '/'");
    var username = 'default';

    res.render('preDeps', { depRoot: '' }, function(err, preDeps) {
      if (err) { return console.log("Failed to render preDeps: " + err); }

      var preDeps = preDeps;

      res.render('postDeps', { depRoot: '' }, function(err, postDeps) {
        if (err) { return console.log("Failed to render postDeps: " + err); }

        var postDeps = postDeps;

        var locals = {
          username : username,
          preDeps: preDeps,
          postDeps: postDeps,
          config: clientConfig
        };

        console.log('Rendering client.pug now');

        res.render('client', locals);
      });
    });
  });

  // Send the client code to the user
  // is this used?
  /*
  app.get('/:username', function(req, res) {
    logger.debug("[ROUTE] '/'");
    var username = req.param('username');

    console.log("THIS IS USED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

    res.render('preDeps.pug', { depRoot: '' }, function(err, preDeps) {
      if (err) { return console.log("Failed to render preDeps: " + err); }

      res.render('postDeps.pug', { depRoot: '' }, function(err, postDeps) {
        if (err) { return console.log("Failed to render postDeps: " + err); }

        res.render('client.pug', {
          username : username,
          preDeps: preDeps,
          postDeps: postDeps
        });
      });
    });
  })
  */

};
