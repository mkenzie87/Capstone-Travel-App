const app = require('./app');

// designates what port the app will listen to for incoming requests
app.listen(8080, function() {
  console.log('Travel app listening on port 8080!')
})
